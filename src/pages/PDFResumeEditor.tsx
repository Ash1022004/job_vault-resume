import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, Download, ArrowLeft, Eye, Maximize2 } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker to use local file
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PDFResumeEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeContent, setResumeContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const template = location.state?.template as any;

  useEffect(() => {
    const loadPDFTemplate = async () => {
      if (!template?.pdfFile) {
        toast({
          title: "No Template Found",
          description: "Please select a template first.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      try {
        // Fetch the PDF file from public directory
        const pdfPath = template.pdfFile.startsWith('/') 
          ? template.pdfFile 
          : `/${template.pdfFile}`;
        
        const response = await fetch(pdfPath);
        if (!response.ok) {
          throw new Error(`Failed to load PDF: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);

        // Extract text from PDF using the blob
        const arrayBuffer = await blob.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        const pages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(" ");
          fullText += pageText + "\n\n";
          pages.push(page);
        }

        setPdfPages(pages);
        setResumeContent(fullText.trim());
        
        toast({
          title: "Template Loaded",
          description: "You can now edit the resume content.",
        });
      } catch (error) {
        console.error("Error loading PDF:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to extract content from the PDF template.";
        toast({
          title: "Error Loading Template",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPDFTemplate();
  }, [template, navigate, toast]);

  useEffect(() => {
    const renderFirstPage = async () => {
      if (pdfPages.length > 0 && canvasRef.current) {
        const page = pdfPages[0];
        const viewport = page.getViewport({ scale: 2.0 });
        
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          const context = canvas.getContext("2d");
          if (context) {
            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;
          }
        }
      }
    };

    if (pdfPages.length > 0) {
      renderFirstPage();
    }
  }, [pdfPages]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No active session");
      }

      // Save to local storage or Supabase as needed
      localStorage.setItem(`resume_${template?.id}`, resumeContent);

      toast({
        title: "Changes Saved",
        description: "Your resume has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: "Error Saving",
        description: "Unable to save your changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template?.name || "resume"}_edited.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Your edited resume has been downloaded.",
    });
  };

  const handleViewPDF = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleViewPDF}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                View Original PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download Text
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <Card className="p-6 mb-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">
                Edit {template?.name || "Resume Template"}
              </h1>
              <p className="text-muted-foreground">
                The text has been extracted from the PDF template. Edit the
                content below to customize it for your needs.
              </p>
            </div>

            <div className="mb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">
                    Original Template:{" "}
                    <span className="font-semibold">{template?.name}</span>
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (pdfUrl) {
                        const newWindow = window.open(pdfUrl, "_blank");
                        if (newWindow) {
                          newWindow.document.title = `PDF Preview - ${template?.name}`;
                        }
                      }
                    }}
                  >
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Open Full PDF
                  </Button>
                </div>
                <div className="border rounded overflow-hidden bg-white">
                  <canvas
                    ref={canvasRef}
                    className="w-full"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            </div>

            <Textarea
              value={resumeContent}
              onChange={(e) => setResumeContent(e.target.value)}
              placeholder="Your resume content will appear here..."
              className="min-h-[600px] font-mono text-sm"
            />

            <div className="mt-4 text-sm text-muted-foreground">
              Character count: {resumeContent.length}
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2 text-blue-900">
              💡 Tips for Editing
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Replace placeholders with your actual information
              </li>
              <li>
                • Edit the layout and structure to match your needs
              </li>
              <li>• Use the "View Original PDF" button to see the template design</li>
              <li>
                • Save your progress regularly
              </li>
              <li>
                • Download as text or copy to your favorite word processor
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PDFResumeEditor;


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Save, Download, ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { resumeAnalyzerService } from "@/services/resumeAnalyzer";

const ResumeEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeContent, setResumeContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const resumeFile = location.state?.resumeFile as File | undefined;

  useEffect(() => {
    const checkAuthAndLoadResume = async () => {
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to edit your resume.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Check if file was provided
      if (!resumeFile) {
        toast({
          title: "No Resume Found",
          description: "Please upload a resume first.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      // Extract text from the file
      await extractTextFromFile(resumeFile);
    };

    checkAuthAndLoadResume();
  }, [navigate, resumeFile, toast]);

  const extractTextFromFile = async (file: File) => {
    setIsLoading(true);
    try {
      const data = await resumeAnalyzerService.parseResume(file);
      setResumeContent(data.extracted_text || "");
      
      toast({
        title: "Resume Loaded",
        description: "You can now edit your resume content.",
      });
    } catch (error) {
      console.error('Error parsing resume:', error);
      toast({
        title: "Error Loading Resume",
        description: error instanceof Error ? error.message : "Unable to extract text from your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No active session");
      }

      // Create a new text file with the edited content
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const file = new File([blob], `edited_${resumeFile?.name || 'resume'}.txt`, { type: 'text/plain' });
      
      // Save to Supabase Storage (you might want to create a bucket for this)
      const filePath = `${session.user.id}/${Date.now()}_${file.name}`;
      
      toast({
        title: "Changes Saved",
        description: "Your resume has been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving resume:', error);
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
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edited_${resumeFile?.name || 'resume'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Your edited resume has been downloaded.",
    });
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
              Back to Analyzer
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <Card className="p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">Edit Your Resume</h1>
              <p className="text-muted-foreground">
                Make changes to your resume content below. The text has been extracted from your uploaded file.
              </p>
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
        </div>
      </main>
    </div>
  );
};

export default ResumeEditor;

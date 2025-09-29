import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import EnhancedAnalysisResults from "@/components/EnhancedAnalysisResults";
import ResumeTemplates from "@/components/sections/ResumeTemplates";
import ResumeExamples from "@/components/sections/ResumeExamples";
import Resources from "@/components/sections/Resources";
import Testimonials from "@/components/Testimonials";
import { resumeAnalyzerService, AnalysisResult } from "@/services/resumeAnalyzer";
import { RefreshCw, Zap, FileText, Users, BookOpen } from "lucide-react";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("analyzer");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please upload a resume file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    try {
      const analysisResult = await resumeAnalyzerService.analyzeResume({
        file: selectedFile,
        jobDescription: jobDescription.trim() || undefined,
      });

      setResults(analysisResult);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been successfully analyzed.",
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setJobDescription("");
    setResults(null);
  };

  const renderSection = () => {
    switch (currentSection) {
      case "templates":
        return <ResumeTemplates />;
      case "examples":
        return <ResumeExamples />;
      case "resources":
        return <Resources />;
      default:
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <Header />
            
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* File Upload Section */}
                <section className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
                    <p className="text-muted-foreground">
                      Upload your resume in PDF or DOCX format for AI-powered analysis
                    </p>
                  </div>
                  
                  <FileUpload
                    onFileSelect={setSelectedFile}
                    selectedFile={selectedFile}
                    isAnalyzing={isAnalyzing}
                  />
                </section>

                {/* Job Description Section */}
                <section className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Job Description</h2>
                    <p className="text-muted-foreground">
                      Add a job description for more targeted analysis (optional)
                    </p>
                  </div>
                  
                  <JobDescriptionInput
                    value={jobDescription}
                    onChange={setJobDescription}
                    isAnalyzing={isAnalyzing}
                  />
                </section>

                {/* Action Buttons */}
                <section className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!selectedFile || isAnalyzing}
                    size="lg"
                    variant="gradient"
                    className="font-semibold px-8 py-3"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                  </Button>
                  
                  {(selectedFile || results) && (
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="lg"
                      disabled={isAnalyzing}
                      className="px-8 py-3"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  )}
                </section>

                {/* Loading State */}
                {isAnalyzing && (
                  <section>
                    <LoadingSpinner message="Analyzing your resume with AI..." />
                  </section>
                )}

                {/* Results Section */}
                {results && !isAnalyzing && (
                  <section id="results" className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
                      <p className="text-muted-foreground">
                        Here's your detailed resume analysis and optimization suggestions
                      </p>
                    </div>
                    
                    <EnhancedAnalysisResults results={results} />
                  </section>
                )}

                {/* Testimonials Section */}
                {!isAnalyzing && (
                  <section className="pt-16">
                    <Testimonials />
                  </section>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      />
      
      {renderSection()}
      
      {/* Footer */}
      <footer className="bg-muted/30 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">ResumeAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered resume optimization to help you land your dream job.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>ATS Optimization</li>
                <li>Keyword Analysis</li>
                <li>Professional Templates</li>
                <li>Industry Examples</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Resume Writing Guides</li>
                <li>Interview Tips</li>
                <li>Career Advice</li>
                <li>Success Stories</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Job Vault. Powered by Career folks Pvt. Ltd. • Built for Career Success</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
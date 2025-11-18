import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  FileText, 
  TrendingUp,
  CheckCircle,
  XCircle,
  BarChart3,
  Eye,
  Award,
  Clock,
  Edit
} from "lucide-react";

interface EnhancedAnalysisResultsProps {
  results: {
    score: string;
    missing_keywords: string[];
    suggestions: string[];
    parsed?: {
      extracted_text_length: number;
    };
  };
  onEditResume: () => void;
}

const EnhancedAnalysisResults = ({ results, onEditResume }: EnhancedAnalysisResultsProps) => {
  const scoreValue = parseInt(results.score.replace('%', ''));
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  // Mock additional analysis data (in real app, this would come from backend)
  const detailedAnalysis = {
    formatting: {
      score: Math.min(85, scoreValue + 10),
      issues: [
        "Consider using bullet points for achievements",
        "Add more white space for better readability",
        "Use consistent date formatting"
      ]
    },
    content: {
      score: Math.max(scoreValue - 5, 50),
      strengths: [
        "Clear professional summary",
        "Quantified achievements",
        "Relevant work experience"
      ],
      improvements: [
        "Add more action verbs",
        "Include industry-specific keywords",
        "Highlight leadership experience"
      ]
    },
    ats: {
      score: scoreValue,
      compatibility: scoreValue >= 80 ? "Excellent" : scoreValue >= 60 ? "Good" : "Needs Work"
    },
    skills: {
      identified: ["JavaScript", "React", "Project Management", "Communication"],
      missing: results.missing_keywords.slice(0, 8),
      trending: ["AI/ML", "Cloud Computing", "DevOps", "Data Analysis"]
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Overall Score Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Resume Analysis Complete</h3>
            <p className="text-muted-foreground">
              Your resume has been analyzed across multiple dimensions
            </p>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-bold ${getScoreColor(scoreValue)} mb-2`}>
              {results.score}
            </div>
            <Badge variant={scoreValue >= 80 ? "default" : scoreValue >= 60 ? "secondary" : "destructive"}>
              {scoreValue >= 80 ? "Excellent" : scoreValue >= 60 ? "Good" : "Needs Work"}
            </Badge>
          </div>
        </div>
        
         <div className="flex justify-center mb-6">
          <Button onClick={onEditResume} variant="gradient" size="lg" className="gap-2">
            <Edit className="w-5 h-5" />
            Edit Your Resume
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{detailedAnalysis.content.score}%</div>
            <p className="text-sm text-muted-foreground">Content Quality</p>
          </div>
          
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Eye className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary">{detailedAnalysis.formatting.score}%</div>
            <p className="text-sm text-muted-foreground">Formatting</p>
          </div>
          
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">{scoreValue}%</div>
            <p className="text-sm text-muted-foreground">ATS Score</p>
          </div>
        </div>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="formatting">Format</TabsTrigger>
            <TabsTrigger value="suggestions">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card className="p-4 border-success/20 bg-success/5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <h4 className="font-semibold">Strengths</h4>
                </div>
                <ul className="space-y-2">
                  {detailedAnalysis.content.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Award className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Areas for Improvement */}
              <Card className="p-4 border-warning/20 bg-warning/5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-warning" />
                  <h4 className="font-semibold">Areas for Improvement</h4>
                </div>
                <ul className="space-y-2">
                  {detailedAnalysis.content.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Clock className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Skills Analysis */}
            <Card className="p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Skills Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-success mb-2">Identified Skills</h5>
                  <div className="flex flex-wrap gap-1">
                    {detailedAnalysis.skills.identified.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-warning mb-2">Missing Skills</h5>
                  <div className="flex flex-wrap gap-1">
                    {detailedAnalysis.skills.missing.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-warning/30 text-warning">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-primary mb-2">Trending Skills</h5>
                  <div className="flex flex-wrap gap-1">
                    {detailedAnalysis.skills.trending.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-4">
            {results.missing_keywords.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <h4 className="text-lg font-semibold">Missing Keywords</h4>
                  <Badge variant="outline">{results.missing_keywords.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  These keywords are commonly found in similar roles and could improve your ATS ranking:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {results.missing_keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                      <XCircle className="w-4 h-4 text-warning flex-shrink-0" />
                      <span className="text-sm">{keyword}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="formatting" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-secondary" />
                <h4 className="text-lg font-semibold">Formatting Analysis</h4>
                <div className="ml-auto">
                  <Progress value={detailedAnalysis.formatting.score} className="w-24" />
                  <span className="text-sm text-muted-foreground ml-2">
                    {detailedAnalysis.formatting.score}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {detailedAnalysis.formatting.issues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{issue}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h4 className="text-lg font-semibold">Actionable Suggestions</h4>
                <Badge variant="outline">{results.suggestions.length}</Badge>
              </div>
              
              <div className="space-y-4">
                {results.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">{suggestion}</p>
                      <Badge variant="outline" className="text-xs">
                        High Impact
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Analysis Stats */}
      {results.parsed && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-accent" />
            <h4 className="text-lg font-semibold">Analysis Statistics</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="font-semibold">{results.parsed.extracted_text_length}</div>
              <div className="text-muted-foreground">Characters</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="font-semibold">{Math.floor(results.parsed.extracted_text_length / 5)}</div>
              <div className="text-muted-foreground">Words</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="font-semibold">{results.missing_keywords.length}</div>
              <div className="text-muted-foreground">Missing Keywords</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="font-semibold text-success">Complete</div>
              <div className="text-muted-foreground">Analysis Status</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EnhancedAnalysisResults;
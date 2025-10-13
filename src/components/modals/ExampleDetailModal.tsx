import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, X, FileText, TrendingUp, Award, Eye } from "lucide-react";

interface ExampleDetailModalProps {
  example: any;
  isOpen: boolean;
  onClose: () => void;
}

const ExampleDetailModal = ({ example, isOpen, onClose }: ExampleDetailModalProps) => {
  if (!example) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{example.title}</DialogTitle>
          <DialogDescription>
            {example.industry} • {example.experience}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Before & After Comparison */}
          {example.scoreBefore && example.scoreAfter && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-destructive" />
                  <h3 className="font-semibold text-lg">Before Optimization</h3>
                </div>
                <div className="aspect-[3/4] bg-muted/30 rounded-lg border-2 border-destructive/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-5xl font-bold text-destructive mb-4">{example.scoreBefore}</div>
                    <p className="text-sm text-muted-foreground">ATS Score</p>
                    <div className="mt-6 space-y-2 text-left w-full">
                      <p className="text-xs text-muted-foreground">Common Issues:</p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Generic descriptions</li>
                        <li>• Missing keywords</li>
                        <li>• Poor formatting</li>
                        <li>• No quantification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-success" />
                  <h3 className="font-semibold text-lg">After Optimization</h3>
                </div>
                <div className="aspect-[3/4] bg-muted/30 rounded-lg border-2 border-success/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-5xl font-bold text-success mb-4">{example.scoreAfter}</div>
                    <p className="text-sm text-muted-foreground">ATS Score</p>
                    <div className="mt-6 space-y-2 text-left w-full">
                      <p className="text-xs text-muted-foreground">Improvements:</p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        {example.improvements?.slice(0, 4).map((imp: string, i: number) => (
                          <li key={i}>• {imp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Performer Details */}
          {example.score && !example.scoreBefore && (
            <div className="bg-muted/30 p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Why This Resume Stands Out</h3>
                <div className="text-3xl font-bold text-primary">{example.score}</div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-success" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {example.keyStrengths?.map((strength: string, i: number) => (
                      <li key={i}>• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Top Achievements
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {example.achievements?.map((achievement: string, i: number) => (
                      <li key={i}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Success Highlights */}
          {example.highlights && (
            <div className="space-y-3">
              <h3 className="font-semibold">Success Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {example.highlights.map((highlight: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Analysis */}
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h3 className="font-semibold mb-3">Key Takeaways</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Focus on quantifiable achievements rather than responsibilities</li>
              <li>• Use industry-specific keywords to pass ATS screening</li>
              <li>• Maintain consistent formatting throughout the document</li>
              <li>• Include relevant technical skills and certifications</li>
              <li>• Tailor your resume for each job application</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="gradient" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Use This Template
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground text-center pt-4 border-t">
            This is a demonstration example. Actual resumes have been anonymized for privacy.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExampleDetailModal;

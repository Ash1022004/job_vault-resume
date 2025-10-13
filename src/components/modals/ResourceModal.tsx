import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Video, BookOpen, X, ExternalLink } from "lucide-react";

interface ResourceModalProps {
  resource: any;
  isOpen: boolean;
  onClose: () => void;
}

const ResourceModal = ({ resource, isOpen, onClose }: ResourceModalProps) => {
  if (!resource) return null;

  const getIcon = () => {
    if (resource.type === "Video") return <Video className="w-6 h-6" />;
    if (resource.type === "Tool" || resource.type === "Templates") return <Download className="w-6 h-6" />;
    return <BookOpen className="w-6 h-6" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {getIcon()}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{resource.title}</DialogTitle>
              <DialogDescription className="mt-1">{resource.duration}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resource Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">{resource.type}</Badge>
            {resource.tags?.map((tag: string, index: number) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
          </div>

          {/* Resource Description */}
          <div>
            <h3 className="font-semibold mb-3">About this resource</h3>
            <p className="text-muted-foreground">{resource.description}</p>
          </div>

          {/* Resource Content Preview */}
          {resource.type === "Video" && (
            <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border">
              <div className="text-center space-y-3">
                <Video className="w-16 h-16 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Video player would load here</p>
              </div>
            </div>
          )}

          {resource.type === "Guide" && (
            <div className="bg-muted/30 p-6 rounded-lg border">
              <h4 className="font-semibold mb-3">What you'll learn:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Understanding ATS systems and how they work</li>
                <li>• Key formatting rules for maximum compatibility</li>
                <li>• Essential keywords and phrases for your industry</li>
                <li>• Common mistakes that cause rejections</li>
                <li>• Step-by-step optimization checklist</li>
              </ul>
            </div>
          )}

          {(resource.type === "Tool" || resource.type === "Templates") && (
            <div className="bg-muted/30 p-6 rounded-lg border">
              <h4 className="font-semibold mb-3">What's included:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Professional templates in multiple formats</li>
                <li>• Customizable sections and layouts</li>
                <li>• ATS-optimization built-in</li>
                <li>• Industry-specific examples</li>
                <li>• Lifetime access and updates</li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {resource.type === "Video" && (
              <Button variant="gradient" className="flex-1">
                <Video className="w-4 h-4 mr-2" />
                Watch Video
              </Button>
            )}
            {resource.type === "Guide" && (
              <Button variant="gradient" className="flex-1">
                <BookOpen className="w-4 h-4 mr-2" />
                Read Guide
              </Button>
            )}
            {(resource.type === "Tool" || resource.type === "Templates") && (
              <Button variant="gradient" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground text-center pt-4 border-t">
            This is a demo resource. In production, actual content would be displayed here.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceModal;
 
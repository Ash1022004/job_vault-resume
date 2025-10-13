import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, X, FileText } from "lucide-react";

interface TemplatePreviewModalProps {
  template: any;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: any) => void;
}

const TemplatePreviewModal = ({ template, isOpen, onClose, onUseTemplate }: TemplatePreviewModalProps) => {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{template.name}</DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Preview */}
          <div className="aspect-[3/4] relative overflow-hidden rounded-lg border">
            <img 
              src={template.preview} 
              alt={template.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">{template.category}</Badge>
            </div>
          </div>

          {/* Template Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Features:</h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Best for:</h3>
              <p className="text-sm text-muted-foreground">
                This template is optimized for {template.category} professionals and has been downloaded 
                {template.downloads.toLocaleString()} times by job seekers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What's included:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ATS-optimized formatting</li>
                <li>• Professional layout and design</li>
                <li>• Easy-to-customize sections</li>
                <li>• Industry-specific keywords</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="gradient" 
              className="flex-1"
              onClick={() => {
                onUseTemplate(template);
                onClose();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Use This Template
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;

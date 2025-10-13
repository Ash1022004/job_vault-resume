import { useState, useRef, DragEvent } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  isAnalyzing: boolean;
}

const FileUpload = ({ onFileSelect, selectedFile, isAnalyzing }: FileUploadProps) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="p-8">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-primary/5 shadow-glow' 
            : selectedFile 
              ? 'border-success bg-success/5' 
              : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
          disabled={isAnalyzing}
        />
        
        {selectedFile ? (
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-success mb-2">File Selected</h3>
            <p className="text-sm text-muted-foreground mb-2">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
            >
              Change File
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <Upload className={`w-12 h-12 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="mb-4"
            >
              Choose File
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <AlertCircle size={14} />
              <span>Supports PDF and DOCX files up to 10MB</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FileUpload;
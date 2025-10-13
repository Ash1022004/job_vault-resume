// src/pages/BuildResume.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8">
      <Button onClick={() => navigate('/')}>← Back to Home</Button>
      <h1 className="text-4xl font-bold mt-8">Build Your Resume</h1>
      {/* Add your resume builder content here */}
    </div>
  );
};

export default Templates;

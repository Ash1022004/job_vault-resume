import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const EditResume = () => {
  const location = useLocation();
  const { originalResume, enhancedResume } = location.state || {};
  const [rightResume, setRightResume] = useState(enhancedResume || "");

  if (!originalResume || !enhancedResume) {
    return <div className="text-red-600 text-center mt-8">Resume data missing. Go back and upload your resume first!</div>;
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(rightResume, 10, 10);
    doc.save("EnhancedResume.pdf");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-8 border-r">
        <h2 className="text-xl font-bold mb-4">Original Resume</h2>
        <div className="whitespace-pre-line overflow-auto h-[80vh] p-2 rounded bg-white border">{originalResume}</div>
      </div>
      <div className="w-1/2 p-8">
        <h2 className="text-xl font-bold mb-4">Enhanced AI Resume (Editable)</h2>
        <textarea
          className="w-full h-[80vh] p-3 border rounded bg-white"
          value={rightResume}
          onChange={e => setRightResume(e.target.value)}
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleDownloadPDF}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default EditResume;

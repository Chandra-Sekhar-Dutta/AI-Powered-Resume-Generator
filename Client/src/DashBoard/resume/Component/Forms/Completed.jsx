import React, { useContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'


const Completed = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  
  
  const handleDownload = async () => {
  const resumeElement = document.getElementById("resume-preview");

  if (!resumeElement) {
    alert("Resume preview not found!");
    return;
  }

  // Capture the full styled HTML
  const htmlContent = resumeElement.outerHTML;

  const response = await fetch("http://localhost:5001/pdf/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html: htmlContent })
  });

  if (!response.ok) {
    alert("Failed to generate PDF");
    return;
  }

  // Download the PDF
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "resume.pdf";
  link.click();
};



  // As soon as Completed is mounted, disable Next
  useEffect(() => {
    enableNext(false)
  }, [enableNext])

  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-sm text-center">
      <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        All Done 🎉
      </h2>
      <p className="text-gray-600 mb-6">
        You've successfully completed all the sections of your resume builder.
      </p>
      <Button onClick={handleDownload }>
        Download Resume
      </Button>
    </div>
  )
}

export default Completed

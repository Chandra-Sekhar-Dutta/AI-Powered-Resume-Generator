// src/components/Completed.jsx
import React, { useContext, useState, useEffect } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { CheckCircle, LoaderCircle, Share2 } from "lucide-react";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import ResumePDFDocument from "../PDF/ResumePDFDocument";

const Completed = ({ enableNext }) => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    enableNext(false);
  }, [enableNext]);

  const handleShare = async () => {
    setLoading(true);
    try {
      // Generate PDF blob
      const blob = await pdf(<ResumePDFDocument resumeInfo={resumeInfo} />).toBlob();
      const file = new File(
        [blob],
        `${resumeInfo?.firstName || "resume"}_${resumeInfo?.lastName || ""}.pdf`,
        { type: "application/pdf" }
      );

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "My Resume",
          text: "Check out my resume!",
          files: [file],
        });
      } else {
        // Fallback: Copy a generated object URL
        const url = URL.createObjectURL(blob);
        await navigator.clipboard.writeText(url);
        alert("Sharing not supported. Resume link copied to clipboard.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-sm text-center">
      <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">All Done 🎉</h2>
      <p className="text-gray-600 mb-6">
        You've successfully completed all the sections of your resume builder.
      </p>

      <div className="flex flex-col items-center gap-4">
        <PDFDownloadLink
          document={<ResumePDFDocument resumeInfo={resumeInfo} />}
          fileName={`${resumeInfo?.firstName || "resume"}_${resumeInfo?.lastName || ""}.pdf`}
        >
          {({ loading: pdfLoading }) => (
            <Button disabled={pdfLoading}>
              {pdfLoading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" size={20} />
                  Generating PDF...
                </>
              ) : (
                "Download Resume"
              )}
            </Button>
          )}
        </PDFDownloadLink>

        <Button
          variant="outline"
          onClick={handleShare}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" size={20} /> Sharing...
            </>
          ) : (
            <>
              <Share2 size={18} /> Share Resume
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Completed;

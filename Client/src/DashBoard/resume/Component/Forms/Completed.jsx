import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'

const Completed = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    const resumeElement = document.getElementById("resume-preview")
    if (!resumeElement) {
      alert("Resume preview not found!")
      return
    }

    setLoading(true)

    try {
      // Get the computed styles to preserve colors and formatting
      const htmlContent = resumeElement.outerHTML

      console.log("Sending HTML to backend, length:", htmlContent.length)
      console.log(htmlContent)

      const response = await fetch("http://localhost:5001/pdf/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: htmlContent })
        
      })


      if (!response.ok) {
        const errorData = await response.json()
        console.error("Server error:", errorData)
        alert(`Failed to generate PDF: ${errorData.details || 'Unknown error'}`)
        return
      }

      // Download the PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${resumeInfo?.firstName || 'resume'}_${resumeInfo?.lastName || ''}.pdf`.trim()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      console.log("PDF downloaded successfully")
    } catch (err) {
      console.error("PDF generation failed:", err)
      alert("Something went wrong while generating the PDF. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

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
      <Button onClick={handleDownload} disabled={loading}>
        {loading ? (
          <LoaderCircle className="animate-spin mr-2" size={20} />
        ) : null}
        {loading ? "Generating PDF..." : "Download Resume"}
      </Button>
    </div>
  )
}

export default Completed
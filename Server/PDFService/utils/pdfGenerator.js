// utils/pdfGenerator.js
import PDFDocument from "pdfkit"
import getStream from "get-stream"

export const createResumePDF = async (resumeInfo) => {
  const doc = new PDFDocument()
  const stream = doc.pipe(getStream.buffer())

  // Header
  doc.fontSize(18).text(`${resumeInfo.firstName} ${resumeInfo.lastName}`, { align: "center" })
  doc.fontSize(12).text(resumeInfo.jobTitle, { align: "center" })
  doc.moveDown()

  // Contact
  doc.text(`Email: ${resumeInfo.email}`)
  doc.text(`Phone: ${resumeInfo.phone}`)
  doc.text(`Address: ${resumeInfo.address}`)
  doc.moveDown()

  // Summary
  doc.fontSize(14).text("Summary", { underline: true })
  doc.fontSize(12).text(resumeInfo.summery || "")
  doc.moveDown()

  // Experience
  doc.fontSize(14).text("Experience", { underline: true })
  resumeInfo.experience?.forEach(exp => {
    doc.fontSize(12).text(`${exp.title} at ${exp.companyName} (${exp.startDate} - ${exp.currentlyWorking ? "Present" : exp.endDate})`)
    doc.text(`${exp.city}, ${exp.state}`)
    doc.text(exp.workSummery || "")
    doc.moveDown()
  })

  // Education
  doc.fontSize(14).text("Education", { underline: true })
  resumeInfo.education?.forEach(edu => {
    doc.fontSize(12).text(`${edu.degree} in ${edu.major} - ${edu.universityName}`)
    doc.text(`${edu.startDate} - ${edu.endDate}`)
    doc.text(edu.description || "")
    doc.moveDown()
  })

  // Skills
  doc.fontSize(14).text("Skills", { underline: true })
  resumeInfo.skills?.forEach(cat => {
    doc.fontSize(12).text(`${cat.category}: ${cat.items.join(", ")}`)
  })

  doc.end()
  return stream
}

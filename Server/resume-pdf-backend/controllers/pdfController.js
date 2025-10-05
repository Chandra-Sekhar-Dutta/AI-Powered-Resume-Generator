const pdfService = require('../services/pdfService');

exports.generatePDF = async (req, res, next) => {
  try {
    const { html } = req.body;

    if (!html || typeof html !== 'string') {

      return res.status(400).json({
        error: 'Invalid request',
        details: 'HTML content is required and must be a string'
      });
    }
    console.log("Request:",req.body)

    console.log('Received HTML content, length:', html.length);

    // Generate PDF using the service
    const pdfBuffer = await pdfService.generatePDFFromHTML(html);

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send the PDF buffer
    res.send(pdfBuffer);

    console.log('PDF generated successfully, size:', pdfBuffer.length, 'bytes');
  } catch (error) {
    console.error('Error in generatePDF controller:', error);
    next(error);
  }
};
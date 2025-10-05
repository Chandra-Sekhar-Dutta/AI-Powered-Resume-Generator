const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

// POST /pdf/generate - Generate PDF from HTML
router.post('/generate', pdfController.generatePDF);

module.exports = router;
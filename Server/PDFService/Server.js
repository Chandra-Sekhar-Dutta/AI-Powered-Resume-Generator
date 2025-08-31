import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pdfRoutes from "./routes/pdf.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/pdf", pdfRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`PDFService running at http://localhost:${PORT}`);
});

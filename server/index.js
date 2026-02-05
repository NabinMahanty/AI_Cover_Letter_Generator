// ============================================
// AI COVER LETTER GENERATOR - BACKEND SERVER
// Supports Google Gemini API and OpenAI API
// ============================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const aiService = require("./services/aiService");
const pdfService = require("./services/pdfService");

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Allow frontend to connect
app.use(
  cors({
    origin: "*", // In production, specify your frontend URL
    methods: ["GET", "POST"],
  }),
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// File upload configuration
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// ============================================
// ROUTES
// ============================================

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Cover Letter Generator API is running",
    aiService: process.env.AI_SERVICE || "gemini",
  });
});

// Advanced generation with PDF resume
app.post(
  "/api/generate-advanced",
  upload.single("resume"),
  async (req, res) => {
    try {
      const { name, role, company, skills, jobDescription } = req.body;

      // Validate input
      if (!name || !role || !company || !skills) {
        return res.status(400).json({
          error: "Missing required fields: name, role, company, skills",
        });
      }

      let resumeText = "";

      // Extract text from PDF if uploaded
      if (req.file) {
        try {
          resumeText = await pdfService.extractTextFromPDF(req.file.path);

          // Clean up uploaded file
          fs.unlinkSync(req.file.path);
        } catch (pdfError) {
          console.error("PDF parsing error:", pdfError);
          // Continue without resume text
          resumeText = "";
        }
      }

      // Generate advanced cover letter
      const coverLetter = await aiService.generateAdvancedCoverLetter({
        name,
        role,
        company,
        skills,
        jobDescription,
        resumeText,
      });

      res.json({ coverLetter });
    } catch (error) {
      console.error("Error generating advanced cover letter:", error);

      // Clean up file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        error: "Failed to generate cover letter",
        details: error.message,
      });
    }
  },
);

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    details: err.message,
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`\n🚀 AI Cover Letter Generator Server`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🤖 AI Service: ${process.env.AI_SERVICE || "gemini"}`);
  console.log(`\n✅ API Endpoint:`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/generate-advanced`);
  console.log(`\n💡 Make sure your .env file is configured with API keys!\n`);
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

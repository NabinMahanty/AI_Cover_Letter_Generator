require("dotenv").config();

const AI_SERVICE = process.env.AI_SERVICE || "gemini";

let aiClient;

// ============================================
// CLIENT INITIALIZATION
// ============================================

if (AI_SERVICE === "gemini") {
  const { GoogleGenAI } = require("@google/genai");

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY missing in .env");
  } else {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
      });

      console.log("✅ Gemini client initialized");
    } catch (err) {
      console.error("❌ Gemini initialization failed:", err.message);
    }
  }
}



// ============================================
// ADVANCED COVER LETTER GENERATION
// ============================================

async function generateAdvancedCoverLetter({
  name,
  role,
  company,
  skills,
  jobDescription,
  resumeText,
}) {
  let prompt = `Write a highly personalized, professional cover letter for ${name} applying for the ${role} position at ${company}.

CANDIDATE INFORMATION:
Name: ${name}
Target Role: ${role}
Target Company: ${company}
Key Skills: ${skills}
`;

  if (resumeText && resumeText.length > 50) {
    prompt += `\nRESUME CONTENT:\n${resumeText.substring(0, 2000)}\n`;
  }

  if (jobDescription && jobDescription.length > 10) {
    prompt += `\nJOB DESCRIPTION:\n${jobDescription}\n`;
  }

  prompt += `\nREQUIREMENTS:
- Personalize using resume achievements
- Match qualifications to job requirements
- Professional confident tone
- 3–5 structured paragraphs
- Include concrete examples
- No placeholder text
- Proper formatting

Write the complete personalized cover letter now:`;

  return runGeneration(prompt);
}

// ============================================
// ROUTER
// ============================================

async function runGeneration(prompt) {
  try {
    if (AI_SERVICE === "gemini") {
      return await generateWithGemini(prompt);
    }

    if (AI_SERVICE === "openai") {
      return await generateWithOpenAI(prompt);
    }

    throw new Error("Invalid AI_SERVICE configured");
  } catch (err) {
    console.error("AI generation error:", err);
    throw new Error(`AI service error: ${err.message}`);
  }
}

// ============================================
// GEMINI IMPLEMENTATION (NEW SDK)
// ============================================

async function generateWithGemini(prompt) {
  if (!aiClient) {
    throw new Error("Gemini client not initialized");
  }

  const configuredModels = process.env.GEMINI_MODEL
    ? process.env.GEMINI_MODEL.split(",").map((m) => m.trim())
    : [];

  const fallbackModels = [
    "gemini-3-flash-preview",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
  ];

  const modelsToTry = configuredModels.length
    ? configuredModels
    : fallbackModels;

  let lastError;

  for (const modelName of modelsToTry) {
    try {
      const response = await aiClient.models.generateContent({
        model: modelName,
        contents: prompt,
      });

      return formatCoverLetter(response.text);
    } catch (err) {
      lastError = err;

      const msg = String(err.message || "");
      const retryable =
        msg.includes("not found") ||
        msg.includes("unsupported") ||
        msg.includes("permission");

      if (!retryable) {
        throw err;
      }
    }
  }

  throw lastError || new Error("All Gemini models failed");
}

// ============================================
// OPTIONAL OPENAI IMPLEMENTATION
// ============================================

async function generateWithOpenAI(prompt) {
  const completion = await aiClient.chat.completions.create({
    model: "gpt-4.1",
    messages: [{ role: "user", content: prompt }],
  });

  return formatCoverLetter(completion.choices[0].message.content);
}

// ============================================
// FORMATTER
// ============================================

function formatCoverLetter(text) {
  let formatted = text.replace(/\*\*/g, "");
  formatted = formatted.replace(/\*/g, "");
  formatted = formatted.replace(/\n{3,}/g, "\n\n");
  return formatted.trim();
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  generateAdvancedCoverLetter,
};

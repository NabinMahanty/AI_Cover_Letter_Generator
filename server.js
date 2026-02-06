import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

if (!GEMINI_API_KEY) {
	console.error("Missing GEMINI_API_KEY in .env");
}

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.post("/api/generate", async (req, res) => {
	try {
		const { name, role, company, skills, jobDescription } = req.body || {};

		if (!name || !role || !company || !skills || !jobDescription) {
			return res.status(400).json({ error: "All fields are required." });
		}

		if (!GEMINI_API_KEY) {
			return res.status(500).json({ error: "Server missing API key." });
		}

		const prompt = `Write a professional cover letter for ${name} applying to the ${role} role at ${company}.\n\nUse the following inputs:\n- Key skills: ${skills}\n- Job description: ${jobDescription}\n\nRequirements:\n- 3 short paragraphs plus a closing line\n- Friendly, confident tone\n- No placeholders, no bullet lists\n- Between 170 and 210 words (do not go below 170 words)\n- Use complete sentences and end with a strong closing line`;

		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-goog-api-key": GEMINI_API_KEY,
				},
				body: JSON.stringify({
					contents: [{ parts: [{ text: prompt }] }],
					generationConfig: {
						temperature: 0.6,
					},
				}),
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			return res
				.status(500)
				.json({ error: "Gemini API error", details: errorText });
		}

		const data = await response.json();
		const parts = data?.candidates?.[0]?.content?.parts || [];
		const text =
			parts
				.map((part) => (typeof part?.text === "string" ? part.text : ""))
				.join("")
				.trim() || "Sorry, I couldn't generate a letter right now.";

		return res.json({ letter: text });
	} catch (error) {
		return res
			.status(500)
			.json({ error: "Server error", details: String(error) });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

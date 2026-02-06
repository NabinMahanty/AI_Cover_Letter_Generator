## AI Cover Letter Generator

Generate professional cover letters with Gemini from a simple web form.

### Features

- Clean UI for entering candidate and role details
- Express API that calls Gemini and returns a formatted letter
- Copy-to-clipboard output with loading states

### Tech Stack

- Node.js + Express
- Gemini API
- Vanilla HTML/CSS/JS

### Getting Started

1. Install dependencies:
   - `pnpm i`
2. Create a `.env` file in the project root:
   - `GEMINI_API_KEY=your_key_here`
   - `GEMINI_MODEL=gemini-2.5-flash` (optional)
   - `PORT=3000` (optional)
3. Run the server:
   - `pnpm dev`
4. Open the app:
   - `http://localhost:3000`

### API

`POST /api/generate`

Request body:

```json
{
  "name": "Alex Johnson",
  "role": "Product Designer",
  "company": "Northwind",
  "skills": "User research, Figma, Design systems",
  "jobDescription": "..."
}
```

Response:

```json
{
  "letter": "..."
}
```

### Project Structure

- `server.js` - Express API and Gemini request
- `public/index.html` - UI layout
- `public/styles.css` - Styling
- `public/app.js` - Client-side logic

### Notes

- The server requires `GEMINI_API_KEY` to generate letters.
- The prompt targets 170 to 210 words across 3 short paragraphs plus a closing line.

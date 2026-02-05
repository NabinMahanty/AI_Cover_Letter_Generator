# 🤖 AI Cover Letter Generator

A professional AI-powered tool that generates personalized cover letters in seconds. Built with three progressive difficulty levels to demonstrate AI integration, API security, and advanced features.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 📝 Level 1: Mock AI (Beginner)

- Professional form interface with validation
- Template-based cover letter generation
- Copy to clipboard functionality
- Download as TXT file
- No API required - works offline!

### 🚀 Level 2: Real AI Integration (Intermediate)

- Google Gemini API integration
- Secure API key management with `.env`
- Dynamic prompt engineering
- Loading animations
- Error handling and retry logic

### 🎯 Level 3: Advanced (SaaS-Level)

- PDF resume parsing and text extraction
- Job description analysis
- Highly personalized cover letters
- Quality-checked AI responses
- Professional formatting

## 🎨 Design Features

- **Modern UI**: Vibrant gradients, glassmorphism effects
- **Smooth Animations**: Micro-interactions and transitions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Premium Aesthetics**: Professional color palette and typography
- **Dark Theme Ready**: Beautiful contrast and readability

## 📁 Project Structure

```
AI_Cover_Letter_Generator/
├── client/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── script.js          # JavaScript logic (all 3 levels)
│   └── style.css          # Premium styling
├── server/                # Backend (Levels 2 & 3)
│   ├── index.js          # Express server
│   └── services/
│       ├── aiService.js  # AI integration (Gemini/OpenAI)
│       └── pdfService.js # PDF parsing
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies
└── README.md           # This file
```

## 🚀 Quick Start

### Level 1: Mock AI (No Setup Required)

1. **Open the frontend directly**:

   ```bash
   # Simply open in browser
   cd client
   # Open index.html in your browser
   ```

2. **Select "Level 1: Mock AI"** in the mode selector

3. **Fill in the form** and click "Generate Cover Letter"

That's it! No installation, no API keys needed.

### Level 2 & 3: Real AI Integration

#### Prerequisites

- Node.js (v14 or higher)
- Google Gemini API key (free tier available)

#### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment variables**:

   ```bash
   # Copy the example file
   copy .env.example .env

   # Edit .env and add your API key
   # Get your key from: https://makersuite.google.com/app/apikey
   ```

3. **Add your API key to `.env`**:

   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   AI_SERVICE=gemini
   PORT=3000
   ```

4. **Start the backend server**:

   ```bash
   npm start
   ```

5. **Open the frontend**:
   - Open `client/index.html` in your browser
   - Select "Level 2: Real AI" or "Level 3: Advanced"

## 🔑 Getting API Keys

### Google Gemini API (Recommended - Free Tier)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

### OpenAI API (Alternative)

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Update `.env` with `AI_SERVICE=openai`

## 🔒 Security Best Practices

✅ **DO:**

- Store API keys in `.env` file
- Add `.env` to `.gitignore`
- Use `.env.example` as a template
- Never commit API keys to Git

❌ **DON'T:**

- Hardcode API keys in source code
- Share your `.env` file
- Commit `.env` to version control
- Expose API keys in frontend code

## 📖 Usage Guide

### Basic Usage (All Levels)

1. **Enter your information**:
   - Candidate Name
   - Job Role
   - Company Name
   - Key Skills

2. **Choose your level**:
   - Level 1: Instant mock generation
   - Level 2: AI-powered generation (2-5 seconds)
   - Level 3: Advanced with resume upload

3. **Generate & Download**:
   - Click "Generate Cover Letter"
   - Copy to clipboard or download as TXT

### Advanced Usage (Level 3)

1. **Upload your resume** (PDF, max 5MB)
2. **Paste the job description**
3. **Fill in basic information**
4. **Generate** - AI will create a highly personalized letter

## 🛠️ API Endpoints

### `GET /api/health`

Check server status

### `POST /api/generate-cover-letter`

Generate basic cover letter (Level 2)

**Request Body:**

```json
{
  "name": "John Doe",
  "role": "Software Engineer",
  "company": "Google",
  "skills": "JavaScript, React, Node.js"
}
```

### `POST /api/generate-advanced`

Generate advanced cover letter with resume (Level 3)

**Form Data:**

- `name`: Candidate name
- `role`: Job role
- `company`: Company name
- `skills`: Key skills
- `jobDescription`: Job description text
- `resume`: PDF file (optional)

## 🎯 Features Checklist

### Level 1 ✅

- [x] Professional form UI
- [x] Mock AI template generation
- [x] Copy to clipboard
- [x] Download as TXT
- [x] Form validation
- [x] Auto-save to localStorage

### Level 2 ✅

- [x] Backend server (Express)
- [x] Google Gemini API integration
- [x] Secure `.env` configuration
- [x] Loading animations
- [x] Error handling
- [x] Rate limiting
- [x] CORS setup

### Level 3 ✅

- [x] PDF upload interface
- [x] PDF text extraction
- [x] Job description input
- [x] Advanced prompt engineering
- [x] Personalized generation
- [x] Quality formatting
- [x] File size validation

## 🎨 Customization

### Change AI Service

Edit `.env`:

```env
AI_SERVICE=gemini  # or 'openai'
```

### Adjust Rate Limiting

Edit `server/index.js`:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // requests per window
});
```

### Modify Prompts

Edit `server/services/aiService.js` to customize the AI prompts.

## 🐛 Troubleshooting

### "Backend server not available"

- Make sure you ran `npm start`
- Check if server is running on `http://localhost:3000`
- Verify `.env` file exists with valid API key

### "API Key Error"

- Verify your API key in `.env`
- Check if you have API quota remaining
- Ensure no extra spaces in `.env` file

### PDF Upload Fails

- Check file size (must be < 5MB)
- Ensure file is PDF format
- Try a different PDF file

## 📝 License

MIT License - feel free to use this project for learning and portfolio purposes!

## 🙏 Acknowledgments

- Google Gemini API for AI generation
- Express.js for backend framework
- pdf-parse for PDF text extraction

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for Mission 4: AI Integration & Prompt Engineering**

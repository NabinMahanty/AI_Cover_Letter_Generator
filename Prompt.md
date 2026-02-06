### 
```
Create a Node.js project for an AI cover letter generator using Express and Gemini API. Include:
- package.json with express and dotenv dependencies
- server.js with Express setup
- public folder for static files (HTML, CSS, JS)
- .env file for API keys
```
### 
```
Initialize the project with pnpm and install dependencies:
- express for the server
- dotenv for environment variables
```
### 
```
Create a POST endpoint that:
1. Accepts: name, role, company, skills, jobDescription
2. Validates all fields are present
3. Constructs a prompt for Gemini API
4. Calls Gemini API with temperature 0.6
5. Extracts and returns the generated text
6. Returns appropriate error messages for API failures
```
### 

```
Create a dark-themed UI with:
- Modern card-based layout
- Gradient background
- Form inputs with focus states
- Loading spinner animation
- Responsive grid for form fields
- Professional typography using Inter font
- Button hover effects and transitions
- Success state for copy button
```
### 

```
Improve the user interface:
- Add animations for better UX
- Implement dark/light theme toggle
- Add input validation with helpful error messages
- Show character count for generated letter
- Add examples/placeholders that are more helpful
```


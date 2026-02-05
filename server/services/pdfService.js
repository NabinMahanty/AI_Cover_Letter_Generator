// ============================================
// PDF SERVICE - Extract Text from PDF Files
// ============================================

const fs = require('fs');
const pdf = require('pdf-parse');

// ============================================
// EXTRACT TEXT FROM PDF
// ============================================

async function extractTextFromPDF(filePath) {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(filePath);
    
    // Parse the PDF
    const data = await pdf(dataBuffer);
    
    // Extract and clean the text
    let text = data.text;
    
    // Remove excessive whitespace
    text = text.replace(/\s+/g, ' ');
    
    // Remove page numbers and common artifacts
    text = text.replace(/Page \d+ of \d+/gi, '');
    text = text.replace(/\f/g, '\n'); // Form feed to newline
    
    // Trim
    text = text.trim();
    
    console.log(`✅ Extracted ${text.length} characters from PDF`);
    
    return text;
    
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}


module.exports = {
  extractTextFromPDF,
};

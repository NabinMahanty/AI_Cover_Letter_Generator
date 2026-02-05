// ============================================
// AI COVER LETTER GENERATOR
// Supports 3 Levels: Mock AI, Real API, Advanced (PDF)
// ============================================

// Global state
let resumeText = "";

// DOM Elements
const form = document.getElementById("coverForm");
const loader = document.getElementById("loader");
const outputBox = document.getElementById("outputBox");
const outputText = document.getElementById("outputText");
const toast = document.getElementById("toast");
const resumeFile = document.getElementById("resumeFile");
const fileName = document.getElementById("fileName");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

// ============================================
// FILE UPLOAD HANDLING
// ============================================
resumeFile.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  if (!file) {
    fileName.textContent = "";
    resumeText = "";
    return;
  }

  // Validate file type
  if (file.type !== "application/pdf") {
    showToast("Please upload a PDF file only", "error");
    resumeFile.value = "";
    fileName.textContent = "";
    return;
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    showToast("File size must be less than 5MB", "error");
    resumeFile.value = "";
    fileName.textContent = "";
    return;
  }

  fileName.textContent = `✓ ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

  // For Level 3, we'll extract text from PDF
  // In a real implementation, this would be done on the backend
  // For now, we'll use a placeholder
  resumeText = `[Resume content from ${file.name}]`;
});

// ============================================
// FORM SUBMISSION
// ============================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();
  const company = document.getElementById("company").value.trim();
  const skills = document.getElementById("skills").value.trim();
  const jobDescription = document.getElementById("jobDescription").value.trim();

  // Show loader
  loader.style.display = "block";
  outputBox.style.display = "none";

  try {
    let coverLetter = "";

    // Generate advanced cover letter
    coverLetter = await generateAdvanced(
      name,
      role,
      company,
      skills,
      jobDescription,
      resumeText,
    );

    // Display result
    outputText.value = coverLetter;
    loader.style.display = "none";
    outputBox.style.display = "block";

    // Smooth scroll to output
    outputBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    outputText.value = `Error: ${error.message}\n\nPlease try again or switch to a different mode.`;
    loader.style.display = "none";
    outputBox.style.display = "block";
  }

  return false;
});

// ============================================
// ADVANCED GENERATION WITH PDF RESUME
// ============================================
async function generateAdvanced(
  name,
  role,
  company,
  skills,
  jobDescription,
  resumeText,
) {
  // Check if backend server is available
  const API_URL = "http://localhost:3000/api/generate-advanced";

  try {
    // If resume file is uploaded, send it
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("company", company);
    formData.append("skills", skills);
    formData.append("jobDescription", jobDescription);

    if (resumeFile.files[0]) {
      formData.append("resume", resumeFile.files[0]);
    }

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      data = null;
    }

    if (!response.ok) {
      const message =
        (data && (data.details || data.error)) ||
        `Server error: ${response.status}`;
      throw new Error(message);
    }

    if (!data || !data.coverLetter) {
      throw new Error("Unexpected response from server.");
    }

    return data.coverLetter;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(error.message);
  }
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(outputText.value);
    showToast("Copied to clipboard!", "success");
  } catch (error) {
    // Fallback for older browsers
    outputText.select();
    document.execCommand("copy");
    showToast("Copied to clipboard!", "success");
  }
});

// ============================================
// DOWNLOAD AS TXT
// ============================================
downloadBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim() || "Candidate";
  const company = document.getElementById("company").value.trim() || "Company";
  const filename = `CoverLetter_${name}_${company}.txt`.replace(/\s+/g, "_");

  const blob = new Blob([outputText.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Download started!", "success");
});

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showToast(message, type = "success") {
  toast.textContent = message;
  toast.style.background = type === "success" ? "#16a34a" : "#dc2626";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================
// FORM AUTO-SAVE (Optional Enhancement)
// ============================================
const formFields = ["name", "role", "company", "skills"];
formFields.forEach((fieldId) => {
  const field = document.getElementById(fieldId);

  // Load saved value
  const saved = localStorage.getItem(`coverLetter_${fieldId}`);
  if (saved) {
    field.value = saved;
  }

  // Save on input
  field.addEventListener("input", () => {
    localStorage.setItem(`coverLetter_${fieldId}`, field.value);
  });
});

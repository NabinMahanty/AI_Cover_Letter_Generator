const form = document.getElementById("coverForm");
const loader = document.getElementById("loader");
const outputBox = document.getElementById("outputBox");
const outputText = document.getElementById("outputText");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const company = document.getElementById("company").value;
  const skills = document.getElementById("skills").value;

  loader.style.display = "block";
  outputBox.style.display = "none";

  // MOCK AI (Level 1)
  setTimeout(() => {
    const letter = `Dear Hiring Manager at ${company},

I am ${name}, writing to express my interest in the ${role} position at your organization.

With strong expertise in ${skills}, I believe I can contribute effectively to your team and help achieve company goals.

I would welcome the opportunity to discuss how my skills align with your requirements.

Sincerely,
${name}`;

    outputText.value = letter;
    loader.style.display = "none";
    outputBox.style.display = "block";
  }, 2000);
});

function copyText() {
  outputText.select();
  document.execCommand("copy");
  alert("Cover letter copied!");
}

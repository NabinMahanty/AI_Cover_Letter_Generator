const form = document.getElementById("cover-form");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy-btn");
const submitBtn = form.querySelector("button[type='submit']");

const setLoading = (isLoading) => {
	submitBtn.disabled = isLoading;
	submitBtn.classList.toggle("loading", isLoading);
	submitBtn.querySelector(".button-text").textContent = isLoading
		? "Generating..."
		: "Generate Cover Letter";
};

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(form);
	const payload = Object.fromEntries(formData.entries());

	output.value = "";
	copyBtn.disabled = true;
	setLoading(true);

	try {
		const response = await fetch("/api/generate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data?.error || "Generation failed");
		}

		output.value = data.letter || "";
		copyBtn.disabled = !data.letter;
	} catch (error) {
		output.value = "Something went wrong. Please try again.";
	} finally {
		setLoading(false);
	}
});

copyBtn.addEventListener("click", async () => {
	try {
		await navigator.clipboard.writeText(output.value);
		copyBtn.textContent = "Copied";
		copyBtn.style.borderColor = "#2ecc71";
		copyBtn.style.color = "#2ecc71";
		setTimeout(() => {
			copyBtn.textContent = "Copy";
			copyBtn.style.borderColor = "";
			copyBtn.style.color = "";
		}, 1500);
	} catch (error) {
		copyBtn.textContent = "Failed";
		setTimeout(() => {
			copyBtn.textContent = "Copy";
		}, 1500);
	}
});

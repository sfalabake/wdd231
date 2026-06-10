document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const submission = {
            toolName: formData.get("toolName")?.toString().trim() || "",
            toolUrl: formData.get("toolUrl")?.toString().trim() || "",
            toolCategory: formData.get("toolCategory")?.toString().trim() || "",
            toolDescription: formData.get("toolDescription")?.toString().trim() || "",
            submittedAt: new Date().toISOString()
        };

        if (!submission.toolName || !submission.toolUrl || !submission.toolCategory || !submission.toolDescription) {
            alert("Please complete every field before submitting your tool recommendation.");
            return;
        }

        sessionStorage.setItem("techToolsSubmission", JSON.stringify(submission));
        window.location.href = "thankyou.html";
    });
});

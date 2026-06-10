document.addEventListener("DOMContentLoaded", () => {
    const submissionDataElement = document.getElementById("submissionData");
    const params = new URLSearchParams(window.location.search);

    if (!submissionDataElement) {
        return;
    }

    const toolName = params.get("toolName") || "";
    const toolUrl = params.get("toolUrl") || "";
    const toolCategory = params.get("toolCategory") || "";
    const platform = params.get("platform") || "";
    const price = params.get("price") || "";
    const toolDescription = params.get("toolDescription") || "";
    const fullName = params.get("fullName") || "";
    const email = params.get("email") || "";

    if (!toolName || !toolUrl || !toolCategory || !toolDescription) {
        submissionDataElement.innerHTML = `
            <p>Submission details were not found. Please return to the form and submit again.</p>
        `;
        return;
    }

    submissionDataElement.innerHTML = `
        <div class="submission-summary">
            <h3>Submission Summary</h3>
            <p><strong>Submitted by:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Tool Name:</strong> ${toolName}</p>
            <p><strong>Tool URL:</strong> <a href="${toolUrl}" target="_blank" rel="noopener">${toolUrl}</a></p>
            <p><strong>Category:</strong> ${toolCategory}</p>
            <p><strong>Platform:</strong> ${platform}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Description:</strong> ${toolDescription}</p>
        </div>
    `;
});

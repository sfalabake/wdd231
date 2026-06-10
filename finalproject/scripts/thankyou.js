document.addEventListener("DOMContentLoaded", () => {
    const submissionDataElement = document.getElementById("submissionData");
    const submissionJson = sessionStorage.getItem("techToolsSubmission");

    if (!submissionDataElement) {
        return;
    }

    if (!submissionJson) {
        submissionDataElement.innerHTML = `
            <p>Submission details were not found. Please return to the form and submit again.</p>
        `;
        return;
    }

    const submission = JSON.parse(submissionJson);
    const submittedAt = new Date(submission.submittedAt).toLocaleString();

    submissionDataElement.innerHTML = `
        <div class="submission-summary">
            <h3>Submission Summary</h3>
            <p><strong>Tool Name:</strong> ${submission.toolName}</p>
            <p><strong>Tool URL:</strong> <a href="${submission.toolUrl}" target="_blank" rel="noopener">${submission.toolUrl}</a></p>
            <p><strong>Category:</strong> ${submission.toolCategory}</p>
            <p><strong>Description:</strong> ${submission.toolDescription}</p>
            <p><strong>Submitted:</strong> ${submittedAt}</p>
        </div>
    `;

    sessionStorage.removeItem("techToolsSubmission");
});

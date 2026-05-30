document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Hidden Form Entry Timestamp
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Intercept Modal Links to Open Modal Windows Natively
    const benefitsTriggers = document.querySelectorAll(".membership-cards .card a");
    benefitsTriggers.forEach(trigger => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = trigger.getAttribute("href").substring(1); // Strips '#'
            const structuralModal = document.getElementById(targetId);
            if (structuralModal) {
                structuralModal.showModal();
            }
        });
    });

    // 3. Close Active Dialogues Natively via Event Listeners
    const modalCloseButtons = document.querySelectorAll("dialog button");
    modalCloseButtons.forEach(button => {
        button.addEventListener("click", () => {
            const parentDialog = button.closest("dialog");
            if (parentDialog) {
                parentDialog.close();
            }
        });
    });
});
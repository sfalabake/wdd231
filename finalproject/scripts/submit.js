document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        const requiredFields = [
            "fullName",
            "email",
            "toolName",
            "toolUrl",
            "toolCategory",
            "platform",
            "price",
            "toolDescription"
        ];

        const missingFields = requiredFields.filter((fieldName) => {
            const field = form.elements[fieldName];
            return !field || !field.value.trim();
        });

        if (missingFields.length > 0) {
            event.preventDefault();
            alert("Please complete every field before submitting your tool recommendation.");
        }
    });
});

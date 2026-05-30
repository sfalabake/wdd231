document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // 1. SET FORM TIMESTAMP
    // =====================================================
    const timestampField = document.getElementById("timestamp");

    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // =====================================================
    // 2. MEMBERSHIP MODAL HANDLING
    // =====================================================
    const benefitsTriggers = document.querySelectorAll(".membership-cards .card a");

    benefitsTriggers.forEach(trigger => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();

            const targetId = event.currentTarget.getAttribute("href").substring(1);
            const modal = document.getElementById(targetId);

            if (modal && typeof modal.showModal === "function") {
                modal.showModal();
            }
        });
    });

    document.querySelectorAll("dialog button").forEach(button => {
        button.addEventListener("click", () => {
            button.closest("dialog")?.close();
        });
    });

    // =====================================================
    // 3. FORM SUBMISSION HANDLER (CUSTOM ACTION)
    // =====================================================
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // stop default redirect

            // Collect form data
            const formData = new FormData(form);

            const firstName = formData.get("fname");
            const lastName = formData.get("lname");
            const membership = formData.get("membership");

            // Simple validation safety check
            if (!firstName || !membership) {
                alert("Please complete required fields.");
                return;
            }

            // Build friendly message
            const membershipLabel = membership.toUpperCase();

            alert(
                `Thank you ${firstName} ${lastName}!\n\n` +
                `You are now applying for ${membershipLabel} membership.\n\n` +
                `Redirecting to confirmation page...`
            );

            // ensure timestamp is updated at submit moment
            if (timestampField) {
                timestampField.value = new Date().toISOString();
            }

            // redirect to thank you page with query string
            const params = new URLSearchParams(new FormData(form));
            window.location.href = `thankyou.html?${params.toString()}`;
        });
    }

});
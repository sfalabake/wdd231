document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // 1. SET FORM TIMESTAMP
    // =====================================================
    const timestampField = document.getElementById("timestamp");

    const updateTimestamp = () => {
        if (timestampField) {
            timestampField.value = new Date().toISOString();
        }
    };

    updateTimestamp();

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
    // 3. FORM SUBMISSION HANDLER
    // =====================================================
    const form = document.querySelector("form[action='thankyou.html']");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            const firstName = formData.get("fname");
            const lastName = formData.get("lname");
            const membership = formData.get("membership");

            if (!firstName || !lastName || !membership) {
                alert("Please complete all required fields.");
                return;
            }

            const membershipMap = {
                np: "NP Membership",
                bronze: "Bronze Membership",
                silver: "Silver Membership",
                gold: "Gold Membership"
            };

            const membershipLabel = membershipMap[membership] || membership;

            alert(
                `Thank you ${firstName} ${lastName}!\n\n` +
                `You are now applying for ${membershipLabel}.\n\n` +
                `Redirecting to confirmation page...`
            );

            updateTimestamp();

            const params = new URLSearchParams(new FormData(form));
            window.location.href = `thankyou.html?${params.toString()}`;
        });
    }

});
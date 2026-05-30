/**
 * Join Page Script - Chamber of Commerce
 * Handles timestamp, modals, and form submission
 */

document.addEventListener("DOMContentLoaded", () => {

    // ================= TIMESTAMP =================
    const timestampField = document.getElementById("timestamp");

    const updateTimestamp = () => {
        if (timestampField) {
            timestampField.value = new Date().toISOString();
        }
    };

    updateTimestamp();

    // ================= MODALS =================
    const triggers = document.querySelectorAll(".membership-cards .card a");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();

            const id = event.currentTarget.getAttribute("href").substring(1);
            const modal = document.getElementById(id);

            if (modal?.showModal) {
                modal.showModal();
            }
        });
    });

    document.querySelectorAll("dialog button").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest("dialog")?.close();
        });
    });

    // ================= FORM SUBMISSION =================
    const form = document.querySelector("form[action='thankyou.html']");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(form);

        const firstName = data.get("fname");
        const lastName = data.get("lname");
        const membership = data.get("membership");

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

        const label = membershipMap[membership] || membership;

        alert(
            `Thank you ${firstName} ${lastName}!\n\n` +
            `You selected ${label}.\n\n` +
            `Redirecting to confirmation page...`
        );

        updateTimestamp();

        const params = new URLSearchParams(data);
        window.location.href = `thankyou.html?${params.toString()}`;
    });

});
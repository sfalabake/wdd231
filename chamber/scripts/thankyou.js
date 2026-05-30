document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const firstName = params.get("fname");
    const lastName = params.get("lname");
    const email = params.get("email");
    const phone = params.get("phone");
    const organization = params.get("organization");
    const membership = params.get("membership");
    const timestamp = params.get("timestamp");

    const membershipMap = {
        np: "NP Membership",
        bronze: "Bronze Membership",
        silver: "Silver Membership",
        gold: "Gold Membership"
    };

    const summary = document.getElementById("summary");

    if (summary) {
        summary.innerHTML = `
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Membership:</strong> ${membershipMap[membership] || membership}</p>
            <p><strong>Date Submitted:</strong> ${timestamp}</p>
        `;
    }

});
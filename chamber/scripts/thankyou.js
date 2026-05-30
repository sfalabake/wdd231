/**
 * Thank You Page - URL Parameter Display
 */

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const set = (id, key) => {
        const el = document.getElementById(id);
        if (el) el.textContent = params.get(key) || "N/A";
    };

    set("fname", "fname");
    set("lname", "lname");
    set("email", "email");
    set("phone", "phone");
    set("organization", "organization");
    set("membership", "membership");
    set("timestamp", "timestamp");

});
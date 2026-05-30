document.querySelector("#timestamp").value = new Date().toISOString();

document.querySelectorAll(".card a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href")).showModal();
    });
});
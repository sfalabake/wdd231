export function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
}

export function initializeThemeToggle() {
    const themeButton = document.querySelector("#themeToggle");

    if (!themeButton) return;

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );
    });
}
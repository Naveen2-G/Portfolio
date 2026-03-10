/* ===== THEME TOGGLE ===== */

function updateThemeToggleState() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    const isLightMode = document.body.classList.contains('light-mode');
    themeToggle.setAttribute('aria-pressed', isLightMode ? 'true' : 'false');
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    updateThemeToggleState();
}

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}

updateThemeToggleState();

const themeToggleControl = document.querySelector('.theme-toggle');
if (themeToggleControl) {
    themeToggleControl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// Make toggleTheme available globally
window.toggleTheme = toggleTheme;

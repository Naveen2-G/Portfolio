/* ===== UTILITIES ===== */

// Page loader
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 300);
});

// Failsafe - Hide loader after 3 seconds max
setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
    }
}, 3000);

// Dynamic greeting
function setGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    let greeting;
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Hello everyone, good morning! ☀️';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Hello everyone, good afternoon! 🌤️';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Hello everyone, good evening! 🌅';
    } else {
        greeting = 'Hello everyone, hope you are doing well.';
    }
    
    if (greetingEl) {
        greetingEl.textContent = greeting;
    }
}
setGreeting();

// Dynamic copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// CV download function
function downloadCV(event) {
    return true;
}

// Make downloadCV available globally
window.downloadCV = downloadCV;

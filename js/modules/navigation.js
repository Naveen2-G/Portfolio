/* ===== NAVIGATION ===== */

// Hide navbar on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide navbar
        nav.classList.add('nav-hidden');
    } else {
        // Scrolling up or at top - show navbar
        nav.classList.remove('nav-hidden');
    }
    
    lastScrollY = currentScrollY;
});

// Mobile menu toggle
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul') || document.querySelector('nav .nav-links');
    hamburger.classList.toggle('active');
    navUl.classList.toggle('active');
    const isExpanded = navUl.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
}

// Make toggleMenu available globally
window.toggleMenu = toggleMenu;

const hamburgerControl = document.querySelector('.hamburger');
if (hamburgerControl) {
    hamburgerControl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

// Smooth scroll with fixed-nav offset so each section lands cleanly
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        e.preventDefault();

        const navHeight = nav ? nav.offsetHeight : 0;
        const offset = navHeight + 24;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: Math.max(targetTop, 0),
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
});

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Magnetic navigation links
document.querySelectorAll('.nav-link, .social-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    const navUl = document.querySelector('nav ul') || document.querySelector('nav .nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navUl && navUl.classList.contains('active') && 
        !navUl.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navUl.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navUl = document.querySelector('nav ul') || document.querySelector('nav .nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navUl && navUl.classList.contains('active')) {
            navUl.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

/* ===== HERO ROLE TEXT (TYPING EFFECT) ===== */

const heroRoleElement = document.querySelector('.hero-role');

if (heroRoleElement) {
    const roles = [
        'Java Developer',
        'Full Stack Web Developer',
        'MERN Stack Developer'
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        heroRoleElement.textContent = roles[2];
    } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        cursor.setAttribute('aria-hidden', 'true');
        heroRoleElement.insertAdjacentElement('afterend', cursor);

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 75;
        const deleteSpeed = 45;
        const rolePause = 1300;
        const switchPause = 300;

        const type = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                charIndex -= 1;
            } else {
                charIndex += 1;
            }

            heroRoleElement.textContent = currentRole.slice(0, charIndex);

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(type, rolePause);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, switchPause);
                return;
            }

            setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
        };

        heroRoleElement.textContent = '';
        type();
    }
}

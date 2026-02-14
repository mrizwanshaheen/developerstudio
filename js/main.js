/* ============================================
   DEVELOPERSTUDIO MAIN
   Initialization and State Management
   ============================================ */

import { initNavigation } from './navigation.js';
import { initVideo } from './video.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Navigation
    initNavigation();

    // Initialize Video Components
    initVideo();

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.ds-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Form Handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    }

    // Console Branding
    console.log('%c DeveloperStudio ', 'background: #3b82f6; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Engineering Digital Products That Scale Businesses ', 'font-size: 12px; color: #94a3b8;');
});

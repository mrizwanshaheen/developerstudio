// ============================================
// DEVELOPERSTUDIO - MAIN JAVASCRIPT
// Professional Interactions & Animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // NAVIGATION
    // ==========================================

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinkItems = document.querySelectorAll('.ds-nav-links a');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section tracking
        updateActiveSection();
    });

    // Mobile menu toggle function
    const toggleMobileMenu = () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default for anchor links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Update active section in navigation
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================

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

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // HERO GRADIENT ANIMATION
    // ==========================================

    const heroGradient = document.querySelector('.ds-hero-gradient');
    if (heroGradient) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;

            heroGradient.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px) rotate(${mouseX * 5}deg)`;
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // FORM HANDLING
    // ==========================================

    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Form will be handled by Formspree
            // You can add custom validation or loading states here
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    }

    // ==========================================
    // WHATSAPP FLOAT BUTTON HOVER
    // ==========================================

    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', () => {
            whatsappFloat.style.transform = 'scale(1.1)';
        });

        whatsappFloat.addEventListener('mouseleave', () => {
            whatsappFloat.style.transform = 'scale(1)';
        });
    }

    // ==========================================
    // PRICING CARD INTERACTIONS
    // ==========================================

    const pricingCards = document.querySelectorAll('.ds-pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pricingCards.forEach(c => {
                if (c !== card && !c.classList.contains('featured')) {
                    c.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });

    // ==========================================
    // PERFORMANCE OPTIMIZATION
    // ==========================================

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ==========================================
    // CONSOLE BRANDING
    // ==========================================

    console.log('%c DeveloperStudio ', 'background: #3b82f6; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Engineering Digital Products That Scale Businesses ', 'font-size: 12px; color: #94a3b8;');
    console.log('%c Interested in working with us? Visit: https://developerstudio.com/contact ', 'font-size: 11px; color: #3b82f6;');
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

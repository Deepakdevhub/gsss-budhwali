// ============================================
// GSSS Budhwali - Main JavaScript
// Core functionality and interactions
// ============================================

// ========== Global State ==========
let currentLang = 'en'; //Default language

// ========== DOM Elements ==========
const langToggle = document.getElementById('langToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const header = document.getElementById('header');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// ========== Language Toggle ==========
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';

    // Hide all language elements
    document.querySelectorAll('.lang-en, .lang-hi').forEach(el => {
        el.classList.add('hidden');
    });

    // Show current language elements
    const activeClass = currentLang === 'en' ? '.lang-en' : '.lang-hi';
    document.querySelectorAll(activeClass).forEach(el => {
        el.classList.remove('hidden');
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Save preference to localStorage
    localStorage.setItem('preferredLang', currentLang);
}

// Initialize language from localStorage or default
function initializeLanguage() {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }
}

// ========== Mobile Menu Toggle ==========
function toggleMobileMenu() {
    const actions = document.querySelector('.header__actions');
    actions.classList.toggle('active');
}

// ========== Sticky Header ==========
function handleScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ========== Scroll Reveal Animation ==========
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// ========== Smooth Scroll ==========
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========== Scroll to Top (Logo Click) ==========
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== Confetti Easter Egg (for Toppers Section) ==========
function createConfetti() {
    const colors = ['#FF9933', '#FFFFFF', '#138808', '#FFD700']; // Indian flag + gold
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3500);
    }
}

// Trigger confetti when toppers section comes into view
function initializeToppersEasterEgg() {
    const toppersSection = document.getElementById('toppers');
    if (!toppersSection) return;

    let confettiTriggered = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !confettiTriggered) {
                createConfetti();
                confettiTriggered = true;
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(toppersSection);
}

// ========== Parallax Effect ==========
function initializeParallax() {
    const hero = document.querySelector('.hero__background');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ========== Handle Anchor Links ==========
function initializeAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');

            // Don't prevent default for empty hash
            if (target === '#') return;

            e.preventDefault();
            smoothScroll(target);
        });
    });
}

// ========== Form Submission Enhancement ==========
function initializeFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        // Let Web3Forms handle the submission
        // Add visual feedback
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = currentLang === 'en' ? 'Sending...' : 'भेजा जा रहा है...';
            submitBtn.disabled = true;

            // Reset after a delay (Web3Forms will handle actual submission)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// ========== Lazy Loading Images ==========
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ========== Table Sorting (Optional Enhancement) ==========
function initializeTableSorting() {
    // Future enhancement: Add table sorting functionality
    // For now, tables are static
}



// ========== Performance Monitoring ==========
function logPerformance() {
    window.addEventListener('load', () => {
        // Use modern Performance API
        const entries = performance.getEntriesByType('navigation');
        if (entries.length > 0) {
            const navTiming = entries[0];
            const pageLoadTime = Math.round(navTiming.loadEventEnd - navTiming.startTime);
            const connectTime = Math.round(navTiming.responseEnd - navTiming.requestStart);

            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Server Connect Time: ${connectTime}ms`);

            if (pageLoadTime > 3000) {
                console.warn('Page load time exceeds 3 seconds. Consider optimization.');
            }
        }
    });
}

// ========== Event Listeners ==========
function initializeEventListeners() {
    // Language toggle
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Scroll to top (logo click)
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }

    // Scroll events
    window.addEventListener('scroll', () => {
        handleScroll();
        revealOnScroll();
    });

    // Initial reveal check
    revealOnScroll();
}

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initializeLanguage();
    initializeEventListeners();
    initializeAnchorLinks();
    initializeFormHandling();
    initializeLazyLoading();
    initializeParallax();
    initializeToppersEasterEgg();

    // Log performance metrics
    logPerformance();

    // Add page transition animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== Service Worker Registration (for PWA - optional) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //   .then(reg => console.log('Service Worker registered'))
        //   .catch(err => console.log('Service Worker registration failed'));
    });
}

// ========== Export for use in other scripts ==========
window.gsssApp = {
    toggleLanguage,
    smoothScroll,
    createConfetti,
    currentLang: () => currentLang
};

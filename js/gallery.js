// ============================================
// GSSS Budhwali - Gallery JavaScript
// Gallery filtering and lightbox functionality
// ============================================

// ========== Gallery Data (can be replaced with Sanity CMS data) ==========
const galleryData = [
    {
        category: 'events',
        title: { en: 'Annual Day Celebration 2024', hi: 'वार्षिक दिवस समारोह 2024' },
        description: { en: 'Students performing cultural dance on Annual Day', hi: 'वार्षिक दिवस पर सांस्कृतिक नृत्य प्रस्तुत करते छात्र' },
        date: 'March 15, 2024',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600'
    },
    {
        category: 'activities',
        title: { en: 'Annual Sports Day', hi: 'वार्षिक खेल दिवस' },
        description: { en: 'Students participating in track and field events', hi: 'ट्रैक और फील्ड इवेंट में भाग लेते छात्र' },
        date: 'January 26, 2024',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600'
    },
    {
        category: 'events',
        title: { en: 'Science Exhibition 2024', hi: 'विज्ञान प्रदर्शनी 2024' },
        description: { en: 'Students showcasing innovative science projects', hi: 'नवीन विज्ञान परियोजनाओं का प्रदर्शन करते छात्र' },
        date: 'February 20, 2024',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600'
    },
    {
        category: 'infrastructure',
        title: { en: 'New Computer Laboratory', hi: 'नई कंप्यूटर प्रयोगशाला' },
        description: { en: 'State-of-the-art computer lab inaugurated', hi: 'अत्याधुनिक कंप्यूटर लैब का उद्घाटन' },
        date: 'December 10, 2023',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600'
    },
    {
        category: 'awards',
        title: { en: 'Board Exam Toppers 2024', hi: 'बोर्ड परीक्षा टॉपर्स 2024' },
        description: { en: 'Felicitating our brilliant toppers', hi: 'हमारे शानदार टॉपर्स का सम्मान' },
        date: 'May 18, 2024',
        image: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?q=80&w=600'
    },
    {
        category: 'events',
        title: { en: 'Independence Day Celebration', hi: 'स्वतंत्रता दिवस समारोह' },
        description: { en: 'Flag hoisting ceremony on Independence Day', hi: 'स्वतंत्रता दिवस पर ध्वजारोहण समारोह' },
        date: 'August 15, 2023',
        image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=600'
    },
    {
        category: 'infrastructure',
        title: { en: 'School Library', hi: 'विद्यालय पुस्तकालय' },
        description: { en: 'Our well-stocked library with thousands of books', hi: 'हजारों पुस्तकों से सुसज्जित हमारा पुस्तकालय' },
        date: 'November 5, 2023',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600'
    },
    {
        category: 'activities',
        title: { en: 'Cultural Program', hi: 'सांस्कृतिक कार्यक्रम' },
        description: { en: 'Traditional dance performance by students', hi: 'छात्रों द्वारा पारंपरिक नृत्य प्रस्तुति' },
        date: 'October 2, 2023',
        image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600'
    },
    {
        category: 'events',
        title: { en: 'Annual Book Fair', hi: 'वार्षिक पुस्तक मेला' },
        description: { en: 'Book fair organized in school premises', hi: 'विद्यालय परिसर में पुस्तक मेला का आयोजन' },
        date: 'September 14, 2023',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600'
    }
];

// ========== DOM Elements ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxDate = document.getElementById('lightboxDate');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let currentFilter = 'all';

// ========== Gallery Filtering ==========
function filterGallery(category) {
    currentFilter = category;

    galleryCards.forEach(card => {
        const cardCategory = card.dataset.category;

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            // Trigger animation
            setTimeout(() => {
                card.classList.add('reveal', 'active');
            }, 10);
        } else {
            card.style.display = 'none';
            card.classList.remove('active');
        }
    });
}

// ========== Filter Button Handler ==========
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery
            const category = this.dataset.filter;
            filterGallery(category);
        });
    });
}

// ========== Lightbox Functions ==========
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

function nextImage() {
    const visibleCards = Array.from(galleryCards).filter(card =>
        currentFilter === 'all' || card.dataset.category === currentFilter
    );

    currentImageIndex = (currentImageIndex + 1) % visibleCards.length;
    updateLightbox();
}

function prevImage() {
    const visibleCards = Array.from(galleryCards).filter(card =>
        currentFilter === 'all' || card.dataset.category === currentFilter
    );

    currentImageIndex = (currentImageIndex - 1 + visibleCards.length) % visibleCards.length;
    updateLightbox();
}

function updateLightbox() {
    const visibleCards = Array.from(galleryCards).filter(card =>
        card.style.display !== 'none'
    );

    const currentCard = visibleCards[currentImageIndex];
    if (!currentCard) return;

    const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';

    // Get data from card data attributes (works with both static and Sanity data)
    const imageUrl = currentCard.dataset.imageUrl || currentCard.querySelector('.gallery-card__image')?.src;
    const titleEn = currentCard.dataset.titleEn || currentCard.querySelector('.gallery-card__title.lang-en')?.textContent || currentCard.querySelector('.gallery-card__title')?.textContent;
    const titleHi = currentCard.dataset.titleHi || currentCard.querySelector('.gallery-card__title.lang-hi')?.textContent || titleEn;
    const descEn = currentCard.dataset.descEn || '';
    const descHi = currentCard.dataset.descHi || descEn;
    const date = currentCard.dataset.date || currentCard.querySelector('.gallery-card__date')?.textContent;

    lightboxImage.src = imageUrl;
    lightboxImage.alt = currentLang === 'hi' ? titleHi : titleEn;
    lightboxTitle.textContent = currentLang === 'hi' ? titleHi : titleEn;
    lightboxDescription.textContent = currentLang === 'hi' ? descHi : descEn;
    lightboxDate.textContent = date ? new Date(date).toLocaleDateString() : '';
}

// ========== Initialize Lightbox Event Listeners ==========
function initializeLightbox() {
    // Gallery card click handlers
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            openLightbox(parseInt(card.dataset.index));
        });
    });

    // Close button
    lightboxClose.addEventListener('click', closeLightbox);

    // Navigation buttons
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });
}

// ========== Lazy Loading Enhancement ==========
function setupLazyLoading() {
    const images = document.querySelectorAll('.gallery-card__image');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Image already has src, but we can add a loaded class for effects
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ========== Re-initialize after Sanity renders ==========
function reinitializeGallery() {
    // Re-query gallery cards after Sanity updates DOM
    const newGalleryCards = document.querySelectorAll('.gallery-card');

    // Rebind click handlers
    newGalleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            openLightbox(parseInt(card.dataset.index));
        });
    });

    // Trigger reveal animations
    setTimeout(() => {
        newGalleryCards.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 50);
        });
    }, 100);
}

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeLightbox();
    setupLazyLoading();

    // Initial reveal
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 50); // Stagger animation
        });
    }, 100);
});

// ========== Export for external use ==========
window.galleryApp = {
    filterGallery,
    openLightbox,
    closeLightbox,
    reinitializeGallery
};

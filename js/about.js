const track = document.querySelector('.carousel-track-container');
const slides = Array.from(track?.children || []);
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentSlideIndex = 0;

// Calculate exact offset of a slide relative to the track (works with gap/margins)
const getOffsetForIndex = (index) => {
    const trackRect = track.getBoundingClientRect();
    const slideRect = slides[index].getBoundingClientRect();
    return slideRect.left - trackRect.left;
};

// Function to move the carousel track
const moveSlide = (targetIndex) => {
    currentSlideIndex = targetIndex;
    const amountToMove = getOffsetForIndex(targetIndex);

    track.style.transform = `translateX(-${amountToMove}px)`;

    // Update the active dot
    dots.forEach(dot => dot.classList.remove('current-dot'));
    dots[targetIndex].classList.add('current-dot');
};

// Event listener for the navigation dots
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('.nav-dot');
    if (!targetDot) return;

    const targetIndex = dots.findIndex(dot => dot === targetDot);
    moveSlide(targetIndex);
});

// Event listener for the next button
nextButton.addEventListener('click', () => {
    let newIndex = currentSlideIndex + 1;
    if (newIndex >= slides.length) {
        newIndex = 0; // Loop back to the first slide
    }
    moveSlide(newIndex);
});

// Event listener for the previous button
prevButton.addEventListener('click', () => {
    let newIndex = currentSlideIndex - 1;
    if (newIndex < 0) {
        newIndex = slides.length - 1; // Loop back to the last slide
    }
    moveSlide(newIndex);
});

// Re-align on resize and on load
window.addEventListener('resize', () => {
    // Recompute and reposition the current slide so layout changes won't break alignment
    moveSlide(currentSlideIndex);
});

window.addEventListener('load', () => {
    moveSlide(currentSlideIndex);
});

/* MOBILE MENU */
    const mobileMenu = document.getElementById('mobileMenu');
    window.toggleMobileMenu = function() {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

/* CLASS CAROUSEL */
class Carousel {
    constructor() {
        this.track = document.querySelector('.carousel-track-container');
        this.slides = Array.from(this.track?.children || []);
        this.dots = Array.from(document.querySelectorAll('.nav-dot'));
        this.prevBtn = document.getElementById('prevButton');
        this.nextBtn = document.getElementById('nextButton');
        this.currentIndex = 0;

        if (!this.track || this.slides.length === 0) return;

        this.init();
    }

    init() {
        this.updateDot();
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.goTo(i)));
        window.addEventListener('resize', () => this.updateSlide());
    }

    updateSlide() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
    }

    updateDot() {
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('current-dot', i === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlide();
        this.updateDot();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlide();
        this.updateDot();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateSlide();
        this.updateDot();
    }
}

// Fade-up animation
class FadeUpObserver {
    constructor() {
        const options = { root: null, rootMargin: '0px', threshold: 0.1 };
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        };
        this.observer = new IntersectionObserver(callback, options);
        this.observe();
    }

    observe() {
        document.querySelectorAll('.fade-up-element').forEach(el => {
            this.observer.observe(el);
        });
    }
}

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.items = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const btn = item.querySelector('.faq-question');
            btn?.addEventListener('click', () => this.toggle(item));
        });
    }

    toggle(item) {
        this.items.forEach(i => {
            if (i !== item) i.classList.remove('open');
        });
        item.classList.toggle('open');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
    new FadeUpObserver();
    new FAQAccordion();

    // Logo scroll functionality
    const logoImg = document.querySelector('.navbar-logo-img');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Handle logo shrinking and transparency
        if (logoImg) {
            if (scrollPos > 50) {
                logoImg.classList.add('scrolled');
            } else {
                logoImg.classList.remove('scrolled');
            }
        }
    });
});

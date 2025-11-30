/* ===================================================== */
/* TYPEWRITER TEXT */
/* ===================================================== */
const typingElement = document.getElementById('typing-text');
const phrases = [
    'print("Hello world")',
    'import sklearn',
    'print("Welcome to ASR!")',
    'import sqlite3'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 40 : 70);
    }
}

document.addEventListener('DOMContentLoaded', type);

/* ===================================================== */
/* MOBILE MENU (SIDEBAR) TOGGLE */
/* ===================================================== */
const mobileMenu = document.getElementById('mobileMenu');

window.toggleMobileMenu = function() {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

/* ===================================================== */
/* FADE UP ANIMATION CONTROL */
/* ===================================================== */
const fadeUpElements = document.querySelectorAll('.fade-up-element');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05 
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // Apply the same "fade up" behaviour for all elements (including #about)
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); 
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
fadeUpElements.forEach(el => observer.observe(el));

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        fadeUpElements.forEach(el => observer.unobserve(el));
    }
});

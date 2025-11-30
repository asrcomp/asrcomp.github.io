/* ===================================================== */
/* TYPEWRITER TEXT */
/* ===================================================== */
const typingElement = document.getElementById('typing-text');
const phrases = [
    'print("Hello world 🌎")',
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
    
    if (mobileMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

/* ===================================================== */
/* FADE UP ANIMATION CONTROL (Mobile Scroll Only) */
/* ===================================================== */
const fadeUpElements = document.querySelectorAll('.fade-up-element');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05 
};

const observerCallback = (entries, observer) => {
    if (window.innerWidth < 768) {
        entries.forEach(entry => {
            // Skip the video element on mobile - CSS animation handles it
            if (entry.target.id === 'about') return;

            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); 
            } 
        });
    }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

fadeUpElements.forEach(element => {
    observer.observe(element);
});

/* ===================================================== */
/* RESIZE Handling */
/* ===================================================== */
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        fadeUpElements.forEach(element => {
            observer.unobserve(element);
        });
    } else {
        fadeUpElements.forEach(element => {
            if (!element.classList.contains('in-view')) {
                observer.observe(element);
            }
        });
    }
});


// Typewriter + mobile menu + fade-up observer
document.addEventListener('DOMContentLoaded', () => {
    /* TYPEWRITER */
    const typingElement = document.getElementById('typing-text');
    const phrases = [
        'print("Hello world")',
        'import sklearn',
        'print("Welcome to ASR!")',
        'import sqlite3'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            typingElement.textContent = current.substring(0, Math.max(0, charIndex - 1));
            charIndex--;
        } else {
            typingElement.textContent = current.substring(0, Math.min(current.length, charIndex + 1));
            charIndex++;
        }
        if (!isDeleting && charIndex === current.length) { isDeleting = true; setTimeout(type, 1500); }
        else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(type, 500); }
        else { setTimeout(type, isDeleting ? 40 : 70); }
    }
    type();

    /* MOBILE MENU */
    const mobileMenu = document.getElementById('mobileMenu');
    window.toggleMobileMenu = function() {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    /* FADE-UP OBSERVER (same behaviour on mobile & desktop) */
    const fadeUpElements = document.querySelectorAll('.fade-up-element');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.05 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    fadeUpElements.forEach(el => observer.observe(el));
});

const track = document.querySelector('.carousel-track-container');
const slides = Array.from(track.children);
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

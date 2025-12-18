document.addEventListener('DOMContentLoaded', () => {
    /* --- LOGO DELAYED FADE-IN WITH GLOW --- */
    const logoImg = document.querySelector('.navbar-logo-img');
    if (logoImg) {
        logoImg.style.opacity = '0';
        logoImg.style.transition = 'opacity 1s ease-in-out';

        // Initially disable hover animations to control them manually
        logoImg.style.pointerEvents = 'none';

        setTimeout(() => {
            // Fade in the logo
            logoImg.style.opacity = '1';

            // Start full glow animation
            setTimeout(() => {
                logoImg.style.animation = 'buildFire 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';

                // Sustain full glow for 2 seconds, then fade off the glow
                setTimeout(() => {
                    logoImg.style.animation = 'dieDown 4s cubic-bezier(0.4, 0, 0.6, 1) forwards';

                    // Re-enable hover interactions after glow animation completes
                    setTimeout(() => {
                        logoImg.style.pointerEvents = 'auto';
                        logoImg.style.animation = '';
                    }, 4000);
                }, 3200); // 1200 (build) + 2000 (sustain)
            }, 1000);
        }, 2000);
    }

    /* --- GOLD PLATED TAGLINE ANIMATION --- */
    const taglineContainer = document.getElementById('taglineContainer');
    const taglineText = document.getElementById('taglineText');

    if (taglineText) {
        const taglineContent = "Developing Future-Ready<br>Computing Professionals";

        // Function to create character spans
        function createCharacterSpans(text) {
            const chars = [];
            let currentWord = '';
            let inTag = false;

            for (let i = 0; i < text.length; i++) {
                const char = text[i];

                if (char === '<') {
                    inTag = true;
                    if (currentWord) {
                        chars.push({type: 'text', content: currentWord});
                        currentWord = '';
                    }
                    chars.push({type: 'tag', content: char});
                } else if (char === '>') {
                    inTag = false;
                    chars.push({type: 'tag', content: char});
                } else if (inTag) {
                    chars.push({type: 'tag', content: char});
                } else if (char === ' ') {
                    chars.push({type: 'text', content: currentWord});
                    currentWord = '';
                    chars.push({type: 'space', content: ' '});
                } else {
                    currentWord += char;
                }
            }

            if (currentWord) {
                chars.push({type: 'text', content: currentWord});
            }

            return chars;
        }

        // Build HTML with character spans but don't animate yet
        const characters = createCharacterSpans(taglineContent);
        let html = '';
        let charIndex = 0;

        characters.forEach(item => {
            if (item.type === 'tag') {
                html += item.content;
            } else if (item.type === 'space') {
                html += item.content;
            } else if (item.type === 'text') {
                for (let i = 0; i < item.content.length; i++) {
                    html += `<span class="gold-char">${item.content[i]}</span>`;
                    charIndex++;
                }
            }
        });

        taglineText.innerHTML = html;
    }

    /* --- WRAP CLICK FOR DETAILS TEXT --- */
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        const p = card.querySelector('p');
        if (p) {
            const text = p.innerHTML;
            if (text.includes('<br>click for details')) {
                const parts = text.split('<br>click for details');
                p.innerHTML = parts[0] + '<br><span class="click-details">click for details</span>';
            } else if (text.includes('click for details')) {
                const parts = text.split('click for details');
                p.innerHTML = parts[0] + '<span class="click-details">click for details</span>' + parts[1];
            }
        }
    });

    /* --- TYPEWRITER WITH COLOR CYCLING AND RANDOM PHRASES --- */
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            'print("Hello world")',
            'import sklearn',
            'print("Welcome to ASR!")',
            'import sqlite3',
            'from flask import Flask',
            'from sklearn.neighbors import KNeighborsClassifier',
            'from sklearn.cluster import KMeans',
            'from werkzeug.utils import secure_filename',
            'import numpy as np',
            'import random',
            "with open('output.csv', 'w', newline='') as file:",
            'from datetime import date, datetime, timedelta'
        ];

        const colors = [
            '#00D9FF',  // blue
            '#32CD32',  // lime green
            '#FFD700',  // yellow
            '#FFA500',  // orange
            '#C0C0C0',  // light silver
            '#FF69B4',  // hot pink
            '#00FF7F',  // spring green
            '#FF6347',  // tomato
            '#9370DB'   // medium purple
        ];

        let phraseIndex = 0, charIndex = 0, isDeleting = false, colorIndex = 0;

        function getRandomPhrase() {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            return phrases[randomIndex];
        }

        function type() {
            const current = phrases[phraseIndex];

            // Change color for each new phrase
            if (!isDeleting && charIndex === 0) {
                typingElement.style.color = colors[colorIndex];
                colorIndex = (colorIndex + 1) % colors.length;
            }

            if (isDeleting) {
                typingElement.textContent = current.substring(0, Math.max(0, charIndex - 1));
                charIndex--;
            } else {
                typingElement.textContent = current.substring(0, Math.min(current.length, charIndex + 1));
                charIndex++;
            }

            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                // Get a random phrase that's different from the current one
                let newPhraseIndex;
                do {
                    newPhraseIndex = Math.floor(Math.random() * phrases.length);
                } while (newPhraseIndex === phraseIndex && phrases.length > 1);
                phraseIndex = newPhraseIndex;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 40 : 70);
            }
        }

        // Start the typewriter effect with a random initial phrase
        phraseIndex = Math.floor(Math.random() * phrases.length);
        type();
    }

    /* --- MOBILE MENU (Keep Existing) --- */
    const mobileMenu = document.getElementById('mobileMenu');
    window.toggleMobileMenu = function() {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    /* --- SCROLL ARROW CLICK FUNCTIONALITY --- */
    const scrollArrowClick = document.getElementById('scrollArrow');
    if (scrollArrowClick) {
        scrollArrowClick.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight * 0.8, // Scroll down 80% of viewport height
                behavior: 'smooth'
            });
        });
    }

    /* --- FADE-UP OBSERVER (Fixed to prevent flickering) --- */
    const fadeUpElements = document.querySelectorAll('.fade-up-element');

    // Handle gradient bars separately for sequential animation
    const gradientBars = document.querySelectorAll('.gradient-bar.fade-up-element');
    let gradientBarTriggered = false;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
        trackVisibility: false
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('in-view')) {
                // Skip gradient bars - they'll be handled separately
                if (entry.target.classList.contains('gradient-bar')) {
                    return;
                }

                entry.target.classList.add('in-view');

                // Trigger tagline character animation specifically
                if (entry.target.id === 'taglineContainer') {
                    const goldChars = entry.target.querySelectorAll('.gold-char');
                    goldChars.forEach((char, index) => {
                        setTimeout(() => {
                            char.style.animationDelay = `${index * 0.08}s`;
                            char.style.animation = 'textFadeSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                        }, index * 80); // 80ms delay between each character
                    });
                }
            }
            // Removed the else clause that was removing the 'in-view' class
            // This prevents the animation from repeating and causing flicker
        });
    };

    // Separate observer for gradient bars
    const gradientBarsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !gradientBarTriggered) {
                gradientBarTriggered = true;

                // Trigger gradient bars sequentially with overlapping timing
                const bars = [
                    document.querySelector('.about-bar'),
                    document.querySelector('.opportunities-bar'),
                    document.querySelector('.resources-bar')
                ];

                // Animate About (Orange) - starts immediately
                if (bars[0]) {
                    setTimeout(() => {
                        bars[0].classList.add('in-view');
                    }, 100);
                }

                // Animate Opportunities (Blue) - starts 400ms after About
                if (bars[1]) {
                    setTimeout(() => {
                        bars[1].classList.add('in-view');
                    }, 500); // 100 + 400
                }

                // Animate Resources (Green) - starts 400ms after Opportunities
                if (bars[2]) {
                    setTimeout(() => {
                        bars[2].classList.add('in-view');
                    }, 900); // 500 + 400
                }
            }
        });
    }, observerOptions);

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Regular fade-up elements
    fadeUpElements.forEach(el => {
        if (!el.classList.contains('gradient-bar')) {
            observer.observe(el);
        }
    });

    // Gradient bars container
    const quickLinksSection = document.querySelector('.quick-links-section');
    if (quickLinksSection) {
        gradientBarsObserver.observe(quickLinksSection);
    }

    /* --- SCROLL ARROW (Optimized with throttling) --- */
    const scrollArrow = document.getElementById('scrollArrow');
    let ticking = false;

    function updateScrollEffects() {
        const scrollPos = window.scrollY;

        // Handle scroll arrow fade
        if (scrollArrow) {
            const fadePoint = 200;
            let opacity = 1 - (scrollPos / fadePoint);
            if (opacity < 0) opacity = 0; if (opacity > 1) opacity = 1;
            scrollArrow.style.opacity = opacity;
        }

        // Handle logo shrinking and transparency
        if (logoImg) {
            const startShrinking = 50;
            const endShrinking = 250;
            const startSize = 147;
            const endSize = 73.5;

            let scale;
            if (scrollPos <= startShrinking) {
                scale = 1;
                logoImg.classList.remove('shrinking');
            } else if (scrollPos >= endShrinking) {
                logoImg.classList.add('shrinking');
                scale = endSize / startSize; // Minimum size - no smaller than this
            } else {
                logoImg.classList.add('shrinking');
                // Smooth, linear shrinking - never expanding
                const progress = (scrollPos - startShrinking) / (endShrinking - startShrinking);
                scale = 1 - (progress * (1 - endSize / startSize));
            }

            logoImg.style.transform = `scale(${scale})`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    /* Tagline now uses the standard fade-up observer - no custom animation needed */

    /* ================================================= */
    /* MODAL WARP & CAROUSEL LOGIC                       */
    /* ================================================= */
    const modalOverlay = document.getElementById('detailsModal');
    const modalContent = document.querySelector('.modal-content');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalCloseBottom = document.getElementById('modalCloseBottom');
    const cardsForModal = document.querySelectorAll('.highlight-card');

    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalImg = document.getElementById('modalImg');
    const modalImageWrapper = document.querySelector('.modal-image-wrapper'); // NEW
    const modalLinkBtn = document.getElementById('modalLinkBtn'); // NEW

    // Carousel Elements
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Only proceed with modal logic if modal elements exist
    if (!modalOverlay || !modalContent || !modalCloseBtn) {
        console.log('Modal elements not found, skipping modal initialization');
    }
    
    /* ================================================= */
    /* NEW: BACKGROUND IMAGE SETUP - INSERTED HERE       */
    /* ================================================= */
    cardsForModal.forEach(card => {
        const bgImageUrl = card.dataset.bgImage;
        if (bgImageUrl) {
            // Set a CSS custom property on the element
            card.style.setProperty('--bg-image', `url('../${bgImageUrl}')`);
        }
    });

    let activeCard = null;
    let currentImages = [];
    let currentImgIndex = 0;
    let autoAdvanceInterval = null;

    // Helper to update image display
    const updateGallery = () => {
        // CHANGED: Hide entire wrapper if no images
        if (currentImages.length > 0) {
            modalImageWrapper.style.display = 'flex'; // Show wrapper
            modalImg.style.display = 'block';
            modalImg.src = currentImages[currentImgIndex];
        } else {
            modalImageWrapper.style.display = 'none'; // Hide wrapper
            modalImg.style.display = 'none';
        }

        // Show/Hide Arrows based on count
        if (currentImages.length > 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    };

    // Auto-advance carousel functionality
    const startAutoAdvance = () => {
        stopAutoAdvance(); // Clear any existing interval
        if (currentImages.length > 1) {
            autoAdvanceInterval = setInterval(() => {
                currentImgIndex = (currentImgIndex + 1) % currentImages.length;
                updateGallery();
            }, 3500); // 3.5 seconds
        }
    };

    const stopAutoAdvance = () => {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = null;
        }
    };

    // Card Click Listeners
    cardsForModal.forEach(card => {
        card.addEventListener('click', () => {
            activeCard = card;

            // 1. Populate Text
            modalTitle.textContent = card.dataset.title;
            modalDesc.innerHTML = card.dataset.desc;

            // 2. Handle Link Button (NEW)
            const linkUrl = card.dataset.link;
            if (linkUrl) {
                modalLinkBtn.href = linkUrl;
                modalLinkBtn.style.display = 'inline-block';
            } else {
                modalLinkBtn.style.display = 'none';
            }

            // 3. Populate Images
            const rawImages = card.dataset.images || '';
            currentImages = rawImages.split(',').map(s => s.trim()).filter(s => s.length > 0);

            currentImgIndex = 0;
            updateGallery();
            startAutoAdvance(); // Start auto-advance when modal opens

            // 4. Prepare for Animation
            modalOverlay.classList.add('active');

            // RESET Styles
            modalContent.style.transition = 'none';
            modalContent.style.transform = '';
            modalContent.style.opacity = '1';

            // Reset scroll position to top
            const modalTextWrapper = document.querySelector('.modal-text-wrapper');
            if (modalTextWrapper) {
                modalTextWrapper.scrollTop = 0;
            }

            // 5. Measure
            const cardRect = card.getBoundingClientRect();
            const modalRect = modalContent.getBoundingClientRect();

            // 6. Calculate Deltas
            const scaleX = cardRect.width / modalRect.width;
            const scaleY = cardRect.height / modalRect.height;
            const translateX = cardRect.left - modalRect.left;
            const translateY = cardRect.top - modalRect.top;

            // 7. Apply & Animate
            modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

            requestAnimationFrame(() => {
                modalContent.style.transition = 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.4s ease';
                modalContent.style.transform = 'translate(0, 0) scale(1, 1)';
            });
        });
    });

    // Button Listeners (Keep Existing)
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImages.length > 1) {
            currentImgIndex = (currentImgIndex + 1) % currentImages.length;
            updateGallery();
            startAutoAdvance(); // Restart auto-advance after manual navigation
        }
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImages.length > 1) {
            currentImgIndex = (currentImgIndex - 1 + currentImages.length) % currentImages.length;
            updateGallery();
            startAutoAdvance(); // Restart auto-advance after manual navigation
        }
    });

    // Close Function (Keep Existing)
    const closeModal = () => {
        stopAutoAdvance(); // Stop auto-advance when modal closes

        if (!activeCard) {
            modalOverlay.classList.remove('active');
            return;
        }

        const modalRect = modalContent.getBoundingClientRect();
        const cardRect = activeCard.getBoundingClientRect();

        const scaleX = cardRect.width / modalRect.width;
        const scaleY = cardRect.height / modalRect.height;
        const translateX = cardRect.left - modalRect.left;
        const translateY = cardRect.top - modalRect.top;

        modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
        modalContent.style.opacity = '0'; 

        setTimeout(() => {
             modalOverlay.classList.remove('active');
             activeCard = null;
        }, 400); 
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalCloseBottom.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
});

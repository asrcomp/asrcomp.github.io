document.addEventListener('DOMContentLoaded', () => {
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
    }

    /* --- TYPEWRITER (Disabled - replaced with hero banner) --- */
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = ['print("Hello world")', 'import sklearn', 'print("Welcome to ASR!")', 'import sqlite3'];
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
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    /* --- FADE-UP OBSERVER (Fixed to prevent flickering) --- */
    const fadeUpElements = document.querySelectorAll('.fade-up-element');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        trackVisibility: false
    };
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('in-view')) {
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
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    fadeUpElements.forEach(el => observer.observe(el));

    /* --- SCROLL ARROW (Optimized with throttling) --- */
    const scrollArrow = document.getElementById('scrollArrow');
    const logoImg = document.querySelector('.navbar-logo-img');
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
            if (scrollPos > 50) {
                logoImg.classList.add('scrolled');
            } else {
                logoImg.classList.remove('scrolled');
            }
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
    const cardsForModal = document.querySelectorAll('.highlight-card');

    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalImg = document.getElementById('modalImg');
    const modalImageWrapper = document.querySelector('.modal-image-wrapper'); // NEW
    const modalLinkBtn = document.getElementById('modalLinkBtn'); // NEW

    // Carousel Elements
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
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
            }, 2500); // 2.5 seconds
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
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
});

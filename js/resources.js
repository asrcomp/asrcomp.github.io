document.addEventListener('DOMContentLoaded', () => {
    /* --- TYPEWRITER (Keep Existing) --- */
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
    if (mobileMenu) {
        window.toggleMobileMenu = function() {
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        };
    }

    /* --- FADE-UP OBSERVER (UPDATED) --- */
    const fadeUpElements = document.querySelectorAll('.fade-up-element');
    
    // CHANGED: threshold reduced to 0.05 to prevent bottom-edge flickering
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.05 };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
            else entry.target.classList.remove('in-view');
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    fadeUpElements.forEach(el => observer.observe(el));

    /* --- SCROLL ARROW (Keep Existing) --- */
    const scrollArrow = document.getElementById('scrollArrow');
    if (scrollArrow) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const fadePoint = 200; 
            let opacity = 1 - (scrollPos / fadePoint);
            if (opacity < 0) opacity = 0; if (opacity > 1) opacity = 1;
            scrollArrow.style.opacity = opacity;
        });
    }

    /* --- MODAL LOGIC (Keep Existing) --- */
    const modalOverlay = document.getElementById('detailsModal');
    if (modalOverlay) {
        const modalContent = document.querySelector('.modal-content');
        const modalCloseBtn = document.querySelector('.modal-close-btn');
        const highlightCards = document.querySelectorAll('.highlight-card');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalImg = document.getElementById('modalImg');
        const modalImageWrapper = document.querySelector('.modal-image-wrapper');
        const modalLinkBtn = document.getElementById('modalLinkBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        let activeCard = null;
        let currentImages = []; 
        let currentImgIndex = 0;

        const updateGallery = () => {
            if (currentImages.length > 0) {
                modalImageWrapper.style.display = 'flex';
                modalImg.style.display = 'block';
                modalImg.src = currentImages[currentImgIndex];
            } else {
                modalImageWrapper.style.display = 'none';
                modalImg.style.display = 'none';
            }
            if (currentImages.length > 1) {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            } else {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
        };

        highlightCards.forEach(card => {
            card.addEventListener('click', () => {
                activeCard = card;
                modalTitle.textContent = card.dataset.title;
                modalDesc.innerHTML = card.dataset.desc;
                const linkUrl = card.dataset.link;
                if (linkUrl) {
                    modalLinkBtn.href = linkUrl;
                    modalLinkBtn.style.display = 'inline-block';
                } else {
                    modalLinkBtn.style.display = 'none';
                }
                const rawImages = card.dataset.images || ''; 
                currentImages = rawImages.split(',').map(s => s.trim()).filter(s => s.length > 0);
                currentImgIndex = 0;
                updateGallery();

                modalOverlay.classList.add('active');
                modalContent.style.transition = 'none'; 
                modalContent.style.transform = ''; 
                modalContent.style.opacity = '1'; 

                const cardRect = card.getBoundingClientRect();
                const modalRect = modalContent.getBoundingClientRect();
                const scaleX = cardRect.width / modalRect.width;
                const scaleY = cardRect.height / modalRect.height;
                const translateX = cardRect.left - modalRect.left;
                const translateY = cardRect.top - modalRect.top;

                modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
                requestAnimationFrame(() => {
                    modalContent.style.transition = 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.4s ease';
                    modalContent.style.transform = 'translate(0, 0) scale(1, 1)';
                });
            });
        });

        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); if (currentImages.length > 1) { currentImgIndex = (currentImgIndex + 1) % currentImages.length; updateGallery(); } });
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); if (currentImages.length > 1) { currentImgIndex = (currentImgIndex - 1 + currentImages.length) % currentImages.length; updateGallery(); } });

        const closeModal = () => {
            if (!activeCard) { modalOverlay.classList.remove('active'); return; }
            const modalRect = modalContent.getBoundingClientRect();
            const cardRect = activeCard.getBoundingClientRect();
            const scaleX = cardRect.width / modalRect.width;
            const scaleY = cardRect.height / modalRect.height;
            const translateX = cardRect.left - modalRect.left;
            const translateY = cardRect.top - modalRect.top;
            modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
            modalContent.style.opacity = '0'; 
            setTimeout(() => { modalOverlay.classList.remove('active'); activeCard = null; }, 400); 
        };

        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
    }
});

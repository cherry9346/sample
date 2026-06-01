document.addEventListener('DOMContentLoaded', () => {
    
    // --- Responsive Mobile Navigation ---
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Dynamic Navbar Highlight & On-Scroll Reveal Animations ---
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Section link tracking
            if (entry.isIntersecting && entry.target.tagName === 'SECTION') {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
            // Element scroll animation reveal trigger
            if (entry.isIntersecting && entry.target.classList.contains('scroll-reveal')) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    sections.forEach(section => scrollObserver.observe(section));
    revealElements.forEach(element => scrollObserver.observe(element));


    // --- Testimonials Carousel Logic ---
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (track && indicators.length > 0) {
        const slides = Array.from(track.children);
        
        const setSlidePosition = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            slides.forEach((slide, index) => {
                slide.style.left = slideWidth * index + 'px';
            });
        };
        
        setSlidePosition();
        window.addEventListener('resize', setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        const updateIndicators = (currentDot, targetDot) => {
            currentDot.classList.remove('current-slide');
            targetDot.classList.add('current-slide');
        };

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.dataset.slide);
                const currentSlide = track.querySelector('.current-slide');
                const targetSlide = slides[targetIndex];
                const currentDot = document.querySelector('.carousel-indicator.current-slide');

                moveToSlide(track, currentSlide, targetSlide);
                updateIndicators(currentDot, e.target);
            });
        });

        // Optional Autoplay Loop for Testimonials
        let autoPlayIndex = 0;
        setInterval(() => {
            const currentSlide = track.querySelector('.current-slide');
            const currentDot = document.querySelector('.carousel-indicator.current-slide');
            autoPlayIndex = (autoPlayIndex + 1) % slides.length;
            
            moveToSlide(track, currentSlide, slides[autoPlayIndex]);
            updateIndicators(currentDot, indicators[autoPlayIndex]);
        }, 7000);
    }
});
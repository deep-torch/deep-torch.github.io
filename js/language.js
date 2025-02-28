document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('languageToggle');
    const langElements = document.querySelectorAll('[data-en], [data-ar]');
    const placeholderElements = document.querySelectorAll('[data-placeholder-en], [data-placeholder-ar]');

    // Load saved language
    let currentLang = localStorage.getItem('lang') || 'en';
    
    function updateLanguage(lang) {
        // Update elements with text content
        langElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) element.textContent = text;
        });

        // Update input placeholders
        placeholderElements.forEach(element => {
            const placeholder = element.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) element.placeholder = placeholder;
        });

        // Update document attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        toggleButton.textContent = lang === 'en' ? 'AR' : 'EN';
        localStorage.setItem('lang', lang);
    }

    // Initial setup
    updateLanguage(currentLang);

    // Toggle language
    toggleButton.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        updateLanguage(currentLang);
    });

    /* Testimonials */
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');

    let currentSlideIndex = 0;

    const updateSlidePosition = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
    };

    // Arrange the slides next to each other
    const setSlidePositions = () => {
        slides.forEach((slide, index) => {
            slide.style.left = `${index * 100}%`;
        });
    };

    setSlidePositions();
    updateSlidePosition();

    nextButton.addEventListener('click', () => {
        if (currentSlideIndex === slides.length - 1) {
            currentSlideIndex = 0; // Loop back to the first slide
        } else {
            currentSlideIndex++;
        }
        updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
        if (currentSlideIndex === 0) {
            currentSlideIndex = slides.length - 1; // Loop to the last slide
        } else {
            currentSlideIndex--;
        }
        updateSlidePosition();
    });

    // Update slide position on window resize
    window.addEventListener('resize', updateSlidePosition);

});
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

    /* Testimonials */
    let swiper = null;  // Initialize Swiper
    
    function initSwiper() {
        swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            //loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            centeredSlides: true,
            effect: 'cards'
            //direction: document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr'
        });
    }

    // Destroy Swiper before reinitializing
    function destroySwiper() {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
    }

    // Modified language toggle handler
    toggleButton.addEventListener('click', function() {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        
        // Your existing language update
        updateLanguage(newLang);
        
        // Handle Swiper reinitialization
        destroySwiper();
        setTimeout(() => {
            initSwiper();
            currentLang = newLang;
        }, 50); // Allow time for DOM updates
    });

    // Initial setup
    updateLanguage(currentLang);
    initSwiper();
});
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
});
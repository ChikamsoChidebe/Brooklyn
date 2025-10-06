// Brooklyn Unisex Salon - Accessibility Enhancement

class AccessibilityManager {
    constructor() {
        this.preferences = {};
        this.init();
    }
    
    init() {
        this.loadUserPreferences();
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
        this.setupColorContrastOptions();
        this.setupMotionPreferences();
        this.setupTextSizeControls();
        this.setupAccessibilityToolbar();
        this.setupARIALabels();
        this.monitorAccessibilityViolations();
    }
    
    // User Preferences
    loadUserPreferences() {
        const saved = localStorage.getItem('brooklyn-salon-accessibility');
        this.preferences = saved ? JSON.parse(saved) : {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            screenReader: false,
            keyboardNavigation: false
        };
        
        this.applyPreferences();
    }
    
    savePreferences() {
        localStorage.setItem('brooklyn-salon-accessibility', JSON.stringify(this.preferences));
    }
    
    applyPreferences() {
        const html = document.documentElement;
        
        html.classList.toggle('high-contrast', this.preferences.highContrast);
        html.classList.toggle('large-text', this.preferences.largeText);
        html.classList.toggle('reduced-motion', this.preferences.reducedMotion);
        html.classList.toggle('screen-reader-optimized', this.preferences.screenReader);
        html.classList.toggle('keyboard-navigation', this.preferences.keyboardNavigation);
    }
    
    // Keyboard Navigation
    setupKeyboardNavigation() {
        this.createSkipLinks();
        this.setupTabNavigation();
        this.setupKeyboardShortcuts();
        this.trapFocusInModals();
    }
    
    createSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
            <a href="#footer" class="skip-link">Skip to footer</a>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .skip-links {
                position: absolute;
                top: -40px;
                left: 6px;
                z-index: 10000;
            }
            
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary-color);
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                transition: top 0.3s;
            }
            
            .skip-link:focus {
                top: 6px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.insertBefore(skipLinks, document.body.firstChild);
        
        // Add main content landmark
        const mainContent = document.querySelector('main') || document.querySelector('#main');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
    }
    
    setupTabNavigation() {
        // Ensure proper tab order
        const focusableElements = this.getFocusableElements();
        
        focusableElements.forEach((element, index) => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
        
        // Visual focus indicators
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 3px solid var(--primary-color);
                outline-offset: 2px;
            }
            
            .keyboard-navigation *:focus {
                outline: 3px solid var(--primary-color);
                outline-offset: 2px;
                box-shadow: 0 0 0 6px rgba(212, 175, 55, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + M: Main menu
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                const menu = document.querySelector('.nav-menu');
                if (menu) {
                    menu.focus();
                }
            }
            
            // Alt + S: Search
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                const search = document.querySelector('input[type="search"]');
                if (search) {
                    search.focus();
                }
            }
            
            // Alt + B: Book appointment
            if (e.altKey && e.key === 'b') {
                e.preventDefault();
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                    const firstInput = bookingSection.querySelector('input, button');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }
            }
            
            // Escape: Close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    trapFocusInModals() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    this.trapFocus(e, modal);
                }
            });
        });
    }
    
    trapFocus(e, container) {
        const focusableElements = this.getFocusableElements(container);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    getFocusableElements(container = document) {
        const selector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
        return Array.from(container.querySelectorAll(selector)).filter(el => {
            return !el.disabled && !el.hidden && el.offsetWidth > 0 && el.offsetHeight > 0;
        });
    }
    
    // Screen Reader Support
    setupScreenReaderSupport() {
        this.addLandmarks();
        this.addHeadingStructure();
        this.addImageAltText();
        this.addFormLabels();
        this.addLiveRegions();
    }
    
    addLandmarks() {
        // Add ARIA landmarks
        const nav = document.querySelector('nav');
        if (nav && !nav.hasAttribute('role')) {
            nav.setAttribute('role', 'navigation');
            nav.setAttribute('aria-label', 'Main navigation');
        }
        
        const main = document.querySelector('main') || document.body;
        if (main && !main.hasAttribute('role')) {
            main.setAttribute('role', 'main');
        }
        
        const footer = document.querySelector('footer');
        if (footer && !footer.hasAttribute('role')) {
            footer.setAttribute('role', 'contentinfo');
        }
        
        // Add section landmarks
        document.querySelectorAll('section').forEach((section, index) => {
            if (!section.hasAttribute('aria-label')) {
                const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
                if (heading) {
                    section.setAttribute('aria-labelledby', heading.id || `section-heading-${index}`);
                    if (!heading.id) {
                        heading.id = `section-heading-${index}`;
                    }
                }
            }
        });
    }
    
    addHeadingStructure() {
        // Ensure proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let currentLevel = 0;
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            
            if (level > currentLevel + 1) {
                console.warn(`Heading level jump detected: ${heading.tagName} after h${currentLevel}`);
            }
            
            currentLevel = level;
        });
    }
    
    addImageAltText() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('alt')) {
                // Try to get alt text from context
                const figcaption = img.closest('figure')?.querySelector('figcaption');
                const title = img.getAttribute('title');
                
                if (figcaption) {
                    img.setAttribute('alt', figcaption.textContent);
                } else if (title) {
                    img.setAttribute('alt', title);
                } else {
                    img.setAttribute('alt', 'Image');
                    console.warn('Image missing alt text:', img.src);
                }
            }
        });
    }
    
    addFormLabels() {
        document.querySelectorAll('input, textarea, select').forEach(input => {
            if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
                const label = document.querySelector(`label[for="${input.id}"]`);
                const placeholder = input.getAttribute('placeholder');
                
                if (!label && placeholder) {
                    input.setAttribute('aria-label', placeholder);
                } else if (!label) {
                    console.warn('Form input missing label:', input);
                }
            }
        });
    }
    
    addLiveRegions() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        
        document.body.appendChild(liveRegion);
        
        // Create method to announce messages
        window.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        };
    }
    
    // Focus Management
    setupFocusManagement() {
        this.manageFocusOnRouteChange();
        this.restoreFocusAfterModalClose();
        this.highlightFocusedElements();
    }
    
    manageFocusOnRouteChange() {
        // Focus management for single-page navigation
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    setTimeout(() => {
                        target.focus();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            });
        });
    }
    
    restoreFocusAfterModalClose() {
        let lastFocusedElement = null;
        
        // Store focus when modal opens
        document.addEventListener('modalOpen', (e) => {
            lastFocusedElement = document.activeElement;
        });
        
        // Restore focus when modal closes
        document.addEventListener('modalClose', (e) => {
            if (lastFocusedElement) {
                lastFocusedElement.focus();
                lastFocusedElement = null;
            }
        });
    }
    
    highlightFocusedElements() {
        // Enhanced focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .focus-highlight {
                position: relative;
            }
            
            .focus-highlight::after {
                content: '';
                position: absolute;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
                border: 3px solid var(--primary-color);
                border-radius: 8px;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            .focus-highlight:focus::after {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Color Contrast Options
    setupColorContrastOptions() {
        const style = document.createElement('style');
        style.textContent = `
            .high-contrast {
                --primary-color: #ffff00;
                --secondary-color: #000000;
                --text-dark: #ffffff;
                --text-light: #ffffff;
                --white: #000000;
                --black: #ffffff;
                --gray-light: #333333;
                --gray-medium: #666666;
                --gray-dark: #999999;
            }
            
            .high-contrast * {
                border-color: #ffffff !important;
            }
            
            .high-contrast img {
                filter: contrast(150%) brightness(150%);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Motion Preferences
    setupMotionPreferences() {
        // Detect system preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion || this.preferences.reducedMotion) {
            this.enableReducedMotion();
        }
        
        // Listen for changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (e.matches) {
                this.enableReducedMotion();
            } else {
                this.disableReducedMotion();
            }
        });
    }
    
    enableReducedMotion() {
        const style = document.createElement('style');
        style.id = 'reduced-motion-styles';
        style.textContent = `
            .reduced-motion *,
            .reduced-motion *::before,
            .reduced-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            
            .reduced-motion .parallax-element {
                transform: none !important;
            }
            
            .reduced-motion .particle {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        document.documentElement.classList.add('reduced-motion');
    }
    
    disableReducedMotion() {
        const style = document.getElementById('reduced-motion-styles');
        if (style) {
            style.remove();
        }
        document.documentElement.classList.remove('reduced-motion');
    }
    
    // Text Size Controls
    setupTextSizeControls() {
        const style = document.createElement('style');
        style.textContent = `
            .large-text {
                font-size: 120% !important;
            }
            
            .large-text h1 { font-size: 3.5rem !important; }
            .large-text h2 { font-size: 2.8rem !important; }
            .large-text h3 { font-size: 2.2rem !important; }
            .large-text h4 { font-size: 1.8rem !important; }
            .large-text p { font-size: 1.2rem !important; }
            .large-text .btn { font-size: 1.1rem !important; padding: 1.2rem 2.4rem !important; }
        `;
        document.head.appendChild(style);
    }
    
    // Accessibility Toolbar
    setupAccessibilityToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'accessibility-toolbar';
        toolbar.innerHTML = `
            <button class="accessibility-toggle" aria-label="Open accessibility options">
                <i class="fas fa-universal-access"></i>
            </button>
            <div class="accessibility-panel" hidden>
                <h3>Accessibility Options</h3>
                <div class="accessibility-controls">
                    <label>
                        <input type="checkbox" id="high-contrast-toggle">
                        High Contrast
                    </label>
                    <label>
                        <input type="checkbox" id="large-text-toggle">
                        Large Text
                    </label>
                    <label>
                        <input type="checkbox" id="reduced-motion-toggle">
                        Reduce Motion
                    </label>
                    <label>
                        <input type="checkbox" id="keyboard-navigation-toggle">
                        Keyboard Navigation
                    </label>
                </div>
                <button class="reset-accessibility">Reset to Default</button>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .accessibility-toolbar {
                position: fixed;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                z-index: 10000;
            }
            
            .accessibility-toggle {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1.2rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
            
            .accessibility-panel {
                position: absolute;
                left: 60px;
                top: 50%;
                transform: translateY(-50%);
                background: white;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 1rem;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                min-width: 200px;
            }
            
            .accessibility-controls {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin: 1rem 0;
            }
            
            .accessibility-controls label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
            }
            
            .reset-accessibility {
                width: 100%;
                padding: 0.5rem;
                background: var(--secondary-color);
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toolbar);
        
        // Setup event listeners
        this.setupToolbarEvents(toolbar);
    }
    
    setupToolbarEvents(toolbar) {
        const toggle = toolbar.querySelector('.accessibility-toggle');
        const panel = toolbar.querySelector('.accessibility-panel');
        
        toggle.addEventListener('click', () => {
            const isHidden = panel.hasAttribute('hidden');
            if (isHidden) {
                panel.removeAttribute('hidden');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                panel.setAttribute('hidden', '');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Setup control toggles
        const controls = {
            'high-contrast-toggle': 'highContrast',
            'large-text-toggle': 'largeText',
            'reduced-motion-toggle': 'reducedMotion',
            'keyboard-navigation-toggle': 'keyboardNavigation'
        };
        
        Object.entries(controls).forEach(([id, preference]) => {
            const checkbox = toolbar.querySelector(`#${id}`);
            checkbox.checked = this.preferences[preference];
            
            checkbox.addEventListener('change', () => {
                this.preferences[preference] = checkbox.checked;
                this.applyPreferences();
                this.savePreferences();
            });
        });
        
        // Reset button
        toolbar.querySelector('.reset-accessibility').addEventListener('click', () => {
            this.resetPreferences();
        });
    }
    
    // ARIA Labels
    setupARIALabels() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            const text = button.textContent.trim();
            if (!text) {
                const icon = button.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    if (iconClass.includes('menu')) {
                        button.setAttribute('aria-label', 'Open menu');
                    } else if (iconClass.includes('close')) {
                        button.setAttribute('aria-label', 'Close');
                    } else if (iconClass.includes('play')) {
                        button.setAttribute('aria-label', 'Play video');
                    }
                }
            }
        });
        
        // Add ARIA labels to form controls
        document.querySelectorAll('input[type="search"]').forEach(input => {
            if (!input.hasAttribute('aria-label')) {
                input.setAttribute('aria-label', 'Search');
            }
        });
    }
    
    // Accessibility Monitoring
    monitorAccessibilityViolations() {
        // Check for common accessibility issues
        this.checkColorContrast();
        this.checkKeyboardAccessibility();
        this.checkScreenReaderCompatibility();
    }
    
    checkColorContrast() {
        // Basic color contrast checking
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            const styles = window.getComputedStyle(element);
            const color = styles.color;
            const backgroundColor = styles.backgroundColor;
            
            if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
                const contrast = this.calculateContrast(color, backgroundColor);
                if (contrast < 4.5) {
                    console.warn('Low color contrast detected:', element, contrast);
                }
            }
        });
    }
    
    calculateContrast(color1, color2) {
        // Simplified contrast calculation
        const rgb1 = this.parseRGB(color1);
        const rgb2 = this.parseRGB(color2);
        
        const l1 = this.getLuminance(rgb1);
        const l2 = this.getLuminance(rgb2);
        
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        
        return (lighter + 0.05) / (darker + 0.05);
    }
    
    parseRGB(color) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
    }
    
    getLuminance([r, g, b]) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    checkKeyboardAccessibility() {
        const focusableElements = this.getFocusableElements();
        focusableElements.forEach(element => {
            if (element.tabIndex < 0) {
                console.warn('Element not keyboard accessible:', element);
            }
        });
    }
    
    checkScreenReaderCompatibility() {
        // Check for missing alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            console.warn('Image missing alt text:', img);
        });
        
        // Check for missing form labels
        document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (!label) {
                console.warn('Input missing label:', input);
            }
        });
    }
    
    // Utility Methods
    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.dispatchEvent(new CustomEvent('modalClose'));
        });
    }
    
    resetPreferences() {
        this.preferences = {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            screenReader: false,
            keyboardNavigation: false
        };
        
        this.applyPreferences();
        this.savePreferences();
        
        // Update toolbar checkboxes
        document.querySelectorAll('.accessibility-panel input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    }
    
    // Public API
    toggleHighContrast() {
        this.preferences.highContrast = !this.preferences.highContrast;
        this.applyPreferences();
        this.savePreferences();
    }
    
    toggleLargeText() {
        this.preferences.largeText = !this.preferences.largeText;
        this.applyPreferences();
        this.savePreferences();
    }
    
    toggleReducedMotion() {
        this.preferences.reducedMotion = !this.preferences.reducedMotion;
        if (this.preferences.reducedMotion) {
            this.enableReducedMotion();
        } else {
            this.disableReducedMotion();
        }
        this.savePreferences();
    }
}

// Initialize Accessibility Manager
let accessibilityManager;

document.addEventListener('DOMContentLoaded', () => {
    accessibilityManager = new AccessibilityManager();
    
    // Add to global scope
    window.accessibility = accessibilityManager;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}
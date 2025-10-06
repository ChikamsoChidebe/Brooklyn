// Brooklyn Unisex Salon - Dark Mode Controller

class DarkModeController {
    constructor() {
        this.isDarkMode = false;
        this.toggleButton = null;
        this.init();
    }
    
    init() {
        this.createToggleButton();
        this.loadSavedTheme();
        this.setupEventListeners();
        this.detectSystemPreference();
    }
    
    createToggleButton() {
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'dark-mode-toggle';
        this.toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        this.toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        this.toggleButton.setAttribute('title', 'Toggle dark mode');
        
        document.body.appendChild(this.toggleButton);
    }
    
    setupEventListeners() {
        this.toggleButton.addEventListener('click', () => {
            this.toggle();
        });
        
        // Keyboard support
        this.toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle();
            }
        });
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!this.hasUserPreference()) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    toggle() {
        const newTheme = this.isDarkMode ? 'light' : 'dark';
        this.setTheme(newTheme);
        this.saveTheme(newTheme);
        
        // Add toggle animation
        this.toggleButton.classList.add('active');
        setTimeout(() => {
            this.toggleButton.classList.remove('active');
        }, 300);
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        }));
    }
    
    setTheme(theme) {
        this.isDarkMode = theme === 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update toggle button icon
        const icon = this.toggleButton.querySelector('i');
        if (this.isDarkMode) {
            icon.className = 'fas fa-sun';
            this.toggleButton.setAttribute('title', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            this.toggleButton.setAttribute('title', 'Switch to dark mode');
        }
        
        // Update meta theme-color
        this.updateMetaThemeColor(theme);
        
        // Animate theme transition
        this.animateThemeTransition();
    }
    
    saveTheme(theme) {
        localStorage.setItem('brooklyn-salon-theme', theme);
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('brooklyn-salon-theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
    }
    
    hasUserPreference() {
        return localStorage.getItem('brooklyn-salon-theme') !== null;
    }
    
    detectSystemPreference() {
        if (!this.hasUserPreference() && window.matchMedia) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }
    
    updateMetaThemeColor(theme) {
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            document.head.appendChild(themeColorMeta);
        }
        
        themeColorMeta.content = theme === 'dark' ? '#2c3e50' : '#d4af37';
    }
    
    animateThemeTransition() {
        // Add smooth transition class to body
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    // Public methods
    getCurrentTheme() {
        return this.isDarkMode ? 'dark' : 'light';
    }
    
    setDarkMode() {
        this.setTheme('dark');
        this.saveTheme('dark');
    }
    
    setLightMode() {
        this.setTheme('light');
        this.saveTheme('light');
    }
    
    resetToSystemPreference() {
        localStorage.removeItem('brooklyn-salon-theme');
        this.detectSystemPreference();
    }
}

// Advanced Dark Mode Features
class AdvancedDarkMode extends DarkModeController {
    constructor() {
        super();
        this.setupAdvancedFeatures();
    }
    
    setupAdvancedFeatures() {
        this.setupAutoMode();
        this.setupImageFilters();
        this.setupVideoFilters();
        this.setupCustomProperties();
    }
    
    setupAutoMode() {
        // Auto dark mode based on time
        const autoModeEnabled = localStorage.getItem('brooklyn-salon-auto-mode') === 'true';
        
        if (autoModeEnabled) {
            this.enableAutoMode();
        }
    }
    
    enableAutoMode() {
        const now = new Date();
        const hour = now.getHours();
        
        // Dark mode from 6 PM to 6 AM
        const shouldBeDark = hour >= 18 || hour < 6;
        
        if (shouldBeDark && !this.isDarkMode) {
            this.setTheme('dark');
        } else if (!shouldBeDark && this.isDarkMode) {
            this.setTheme('light');
        }
        
        // Check every hour
        setTimeout(() => {
            this.enableAutoMode();
        }, 3600000); // 1 hour
    }
    
    setupImageFilters() {
        const style = document.createElement('style');
        style.textContent = `
            [data-theme="dark"] img:not(.no-filter) {
                filter: brightness(0.8) contrast(1.2);
                transition: filter 0.3s ease;
            }
            
            [data-theme="dark"] img:not(.no-filter):hover {
                filter: brightness(1) contrast(1);
            }
        `;
        document.head.appendChild(style);
    }
    
    setupVideoFilters() {
        const style = document.createElement('style');
        style.textContent = `
            [data-theme="dark"] video:not(.no-filter) {
                filter: brightness(0.7) contrast(1.3);
                transition: filter 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupCustomProperties() {
        // Add custom CSS properties for smooth transitions
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s ease, 
                           color 0.3s ease, 
                           border-color 0.3s ease,
                           box-shadow 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Theme scheduling
    scheduleTheme(startTime, endTime, theme) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const start = this.parseTime(startTime);
        const end = this.parseTime(endTime);
        
        if (currentTime >= start && currentTime < end) {
            this.setTheme(theme);
        }
        
        // Schedule next check
        const nextCheck = new Date();
        nextCheck.setMinutes(nextCheck.getMinutes() + 1);
        
        setTimeout(() => {
            this.scheduleTheme(startTime, endTime, theme);
        }, nextCheck.getTime() - now.getTime());
    }
    
    parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }
    
    // Accessibility enhancements
    enhanceAccessibility() {
        // High contrast mode detection
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.classList.add('high-contrast');
        }
        
        // Reduced motion detection
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-motion');
        }
        
        // Focus management
        this.setupFocusManagement();
    }
    
    setupFocusManagement() {
        // Ensure focus is visible in dark mode
        const style = document.createElement('style');
        style.textContent = `
            [data-theme="dark"] *:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Theme Persistence Manager
class ThemePersistence {
    constructor(darkModeController) {
        this.controller = darkModeController;
        this.setupPersistence();
    }
    
    setupPersistence() {
        // Save theme preference across sessions
        window.addEventListener('beforeunload', () => {
            this.saveCurrentState();
        });
        
        // Sync across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'brooklyn-salon-theme') {
                this.controller.setTheme(e.newValue);
            }
        });
    }
    
    saveCurrentState() {
        const state = {
            theme: this.controller.getCurrentTheme(),
            timestamp: Date.now()
        };
        
        localStorage.setItem('brooklyn-salon-theme-state', JSON.stringify(state));
    }
    
    loadSavedState() {
        const savedState = localStorage.getItem('brooklyn-salon-theme-state');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.controller.setTheme(state.theme);
        }
    }
}

// Initialize Dark Mode
let darkModeController;
let themePersistence;

document.addEventListener('DOMContentLoaded', () => {
    // Use advanced dark mode if supported
    if (window.matchMedia && CSS.supports('color-scheme', 'dark')) {
        darkModeController = new AdvancedDarkMode();
    } else {
        darkModeController = new DarkModeController();
    }
    
    // Setup persistence
    themePersistence = new ThemePersistence(darkModeController);
    
    // Enhance accessibility
    if (darkModeController.enhanceAccessibility) {
        darkModeController.enhanceAccessibility();
    }
    
    // Add to global scope
    window.darkMode = darkModeController;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DarkModeController, AdvancedDarkMode, ThemePersistence };
}
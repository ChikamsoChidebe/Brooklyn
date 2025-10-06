// Brooklyn Unisex Salon - Analytics & Tracking

class AnalyticsManager {
    constructor() {
        this.events = [];
        this.sessionData = {};
        this.userBehavior = {};
        this.init();
    }
    
    init() {
        this.initializeSession();
        this.setupEventTracking();
        this.setupUserBehaviorTracking();
        this.setupConversionTracking();
        this.setupPerformanceTracking();
        this.setupErrorTracking();
    }
    
    // Session Management
    initializeSession() {
        this.sessionData = {
            sessionId: this.generateSessionId(),
            startTime: Date.now(),
            pageViews: 0,
            events: [],
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            device: this.detectDevice()
        };
        
        this.trackPageView();
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    detectDevice() {
        const userAgent = navigator.userAgent;
        
        if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
            return 'tablet';
        } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
            return 'mobile';
        } else {
            return 'desktop';
        }
    }
    
    // Event Tracking
    setupEventTracking() {
        this.trackNavigationClicks();
        this.trackButtonClicks();
        this.trackFormInteractions();
        this.trackScrollDepth();
        this.trackTimeOnPage();
    }
    
    trackNavigationClicks() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackEvent('navigation_click', {
                    target: e.target.textContent,
                    href: e.target.getAttribute('href')
                });
            });
        });
    }
    
    trackButtonClicks() {
        document.querySelectorAll('button, .btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.trackEvent('button_click', {
                    text: e.target.textContent,
                    class: e.target.className,
                    id: e.target.id
                });
            });
        });
    }
    
    trackFormInteractions() {
        // Track form starts
        document.querySelectorAll('form').forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            let formStarted = false;
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    if (!formStarted) {
                        this.trackEvent('form_start', {
                            form: form.id || form.className,
                            field: input.name || input.id
                        });
                        formStarted = true;
                    }
                });
                
                input.addEventListener('blur', () => {
                    if (input.value) {
                        this.trackEvent('form_field_complete', {
                            form: form.id || form.className,
                            field: input.name || input.id
                        });
                    }
                });
            });
            
            // Track form submissions
            form.addEventListener('submit', (e) => {
                this.trackEvent('form_submit', {
                    form: form.id || form.className
                });
            });
        });
    }
    
    trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        const tracked = new Set();
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !tracked.has(milestone)) {
                        this.trackEvent('scroll_depth', {
                            percentage: milestone
                        });
                        tracked.add(milestone);
                    }
                });
            }
        }, 250));
    }
    
    trackTimeOnPage() {
        let startTime = Date.now();
        let isActive = true;
        
        // Track when user becomes inactive
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isActive = false;
                this.trackEvent('page_inactive', {
                    timeActive: Date.now() - startTime
                });
            } else {
                isActive = true;
                startTime = Date.now();
                this.trackEvent('page_active');
            }
        });
        
        // Track time milestones
        const timeMilestones = [30, 60, 120, 300]; // seconds
        timeMilestones.forEach(seconds => {
            setTimeout(() => {
                if (isActive) {
                    this.trackEvent('time_on_page', {
                        seconds: seconds
                    });
                }
            }, seconds * 1000);
        });
    }
    
    // User Behavior Tracking
    setupUserBehaviorTracking() {
        this.trackMouseMovement();
        this.trackClickHeatmap();
        this.trackKeyboardUsage();
        this.trackDeviceOrientation();
    }
    
    trackMouseMovement() {
        let mouseData = [];
        let lastRecorded = 0;
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastRecorded > 100) { // Sample every 100ms
                mouseData.push({
                    x: e.clientX,
                    y: e.clientY,
                    timestamp: now
                });
                lastRecorded = now;
                
                // Keep only last 100 points
                if (mouseData.length > 100) {
                    mouseData = mouseData.slice(-100);
                }
            }
        });
        
        // Send mouse data periodically
        setInterval(() => {
            if (mouseData.length > 0) {
                this.trackEvent('mouse_movement', {
                    data: mouseData.slice()
                });
                mouseData = [];
            }
        }, 30000); // Every 30 seconds
    }
    
    trackClickHeatmap() {
        document.addEventListener('click', (e) => {
            this.trackEvent('click_heatmap', {
                x: e.clientX,
                y: e.clientY,
                element: e.target.tagName,
                className: e.target.className,
                id: e.target.id
            });
        });
    }
    
    trackKeyboardUsage() {
        let keystrokes = 0;
        
        document.addEventListener('keydown', () => {
            keystrokes++;
        });
        
        // Report keystroke count every minute
        setInterval(() => {
            if (keystrokes > 0) {
                this.trackEvent('keyboard_usage', {
                    keystrokes: keystrokes
                });
                keystrokes = 0;
            }
        }, 60000);
    }
    
    trackDeviceOrientation() {
        if ('orientation' in screen) {
            screen.orientation.addEventListener('change', () => {
                this.trackEvent('orientation_change', {
                    orientation: screen.orientation.angle
                });
            });
        }
    }
    
    // Conversion Tracking
    setupConversionTracking() {
        this.trackBookingFunnel();
        this.trackContactFormSubmissions();
        this.trackPhoneClicks();
        this.trackSocialMediaClicks();
    }
    
    trackBookingFunnel() {
        // Track booking form steps
        const bookingSteps = ['service_selection', 'stylist_selection', 'datetime_selection', 'info_submission'];
        
        document.addEventListener('bookingStepComplete', (e) => {
            this.trackEvent('booking_funnel', {
                step: e.detail.step,
                stepIndex: bookingSteps.indexOf(e.detail.step)
            });
        });
        
        // Track booking completion
        document.addEventListener('bookingComplete', (e) => {
            this.trackEvent('conversion_booking', {
                service: e.detail.service,
                stylist: e.detail.stylist,
                value: e.detail.price
            });
        });
    }
    
    trackContactFormSubmissions() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                this.trackEvent('conversion_contact', {
                    form: 'contact'
                });
            });
        }
    }
    
    trackPhoneClicks() {
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('conversion_phone_click', {
                    number: link.href.replace('tel:', '')
                });
            });
        });
    }
    
    trackSocialMediaClicks() {
        document.querySelectorAll('.social-icon, .social-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('social_media_click', {
                    platform: this.getSocialPlatform(link.href)
                });
            });
        });
    }
    
    getSocialPlatform(url) {
        if (url.includes('facebook')) return 'facebook';
        if (url.includes('instagram')) return 'instagram';
        if (url.includes('twitter')) return 'twitter';
        if (url.includes('youtube')) return 'youtube';
        if (url.includes('linkedin')) return 'linkedin';
        return 'unknown';
    }
    
    // Performance Tracking
    setupPerformanceTracking() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                
                this.trackEvent('performance', {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: this.getFirstPaint(),
                    firstContentfulPaint: this.getFirstContentfulPaint()
                });
            }, 0);
        });
    }
    
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? firstPaint.startTime : null;
    }
    
    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? fcp.startTime : null;
    }
    
    // Error Tracking
    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: e.error ? e.error.stack : null
            });
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            this.trackEvent('promise_rejection', {
                reason: e.reason.toString(),
                stack: e.reason.stack
            });
        });
    }
    
    // Core Tracking Methods
    trackEvent(eventName, properties = {}) {
        const event = {
            name: eventName,
            properties: {
                ...properties,
                timestamp: Date.now(),
                sessionId: this.sessionData.sessionId,
                url: window.location.href,
                userAgent: navigator.userAgent
            }
        };
        
        this.events.push(event);
        this.sessionData.events.push(event);
        
        // Send to analytics services
        this.sendToAnalytics(event);
        
        console.log('Analytics Event:', event);
    }
    
    trackPageView() {
        this.sessionData.pageViews++;
        
        this.trackEvent('page_view', {
            title: document.title,
            url: window.location.href,
            referrer: document.referrer
        });
    }
    
    // Analytics Service Integration
    sendToAnalytics(event) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', event.name, event.properties);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', event.name, event.properties);
        }
        
        // Custom Analytics API
        this.sendToCustomAPI(event);
    }
    
    sendToCustomAPI(event) {
        // Send to your custom analytics endpoint
        fetch('/api/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }).catch(error => {
            console.error('Analytics API error:', error);
        });
    }
    
    // A/B Testing
    setupABTesting() {
        const tests = {
            'hero_cta_text': {
                variants: ['Book Appointment', 'Schedule Now', 'Get Started'],
                weights: [0.4, 0.3, 0.3]
            },
            'pricing_display': {
                variants: ['starting_from', 'exact_price'],
                weights: [0.5, 0.5]
            }
        };
        
        Object.keys(tests).forEach(testName => {
            const variant = this.selectVariant(tests[testName]);
            this.applyVariant(testName, variant);
            
            this.trackEvent('ab_test_assignment', {
                test: testName,
                variant: variant
            });
        });
    }
    
    selectVariant(test) {
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < test.variants.length; i++) {
            cumulative += test.weights[i];
            if (random <= cumulative) {
                return test.variants[i];
            }
        }
        
        return test.variants[0];
    }
    
    applyVariant(testName, variant) {
        switch (testName) {
            case 'hero_cta_text':
                const ctaButton = document.querySelector('.hero .btn-primary');
                if (ctaButton) {
                    ctaButton.textContent = variant;
                }
                break;
            case 'pricing_display':
                document.body.classList.add(`pricing-${variant}`);
                break;
        }
    }
    
    // Utility Methods
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Data Export
    exportSessionData() {
        return {
            session: this.sessionData,
            events: this.events,
            userBehavior: this.userBehavior
        };
    }
    
    // Privacy Compliance
    setupPrivacyCompliance() {
        // Check for consent
        const hasConsent = localStorage.getItem('analytics-consent') === 'true';
        
        if (!hasConsent) {
            this.showConsentBanner();
        } else {
            this.enableTracking();
        }
    }
    
    showConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'consent-banner';
        banner.innerHTML = `
            <div class="consent-content">
                <p>We use cookies and analytics to improve your experience. By continuing to use our site, you consent to our use of cookies.</p>
                <div class="consent-buttons">
                    <button onclick="window.analytics.acceptConsent()">Accept</button>
                    <button onclick="window.analytics.declineConsent()">Decline</button>
                </div>
            </div>
        `;
        
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--gray-dark);
            color: white;
            padding: 1rem;
            z-index: 10000;
        `;
        
        document.body.appendChild(banner);
    }
    
    acceptConsent() {
        localStorage.setItem('analytics-consent', 'true');
        this.enableTracking();
        document.querySelector('.consent-banner')?.remove();
    }
    
    declineConsent() {
        localStorage.setItem('analytics-consent', 'false');
        this.disableTracking();
        document.querySelector('.consent-banner')?.remove();
    }
    
    enableTracking() {
        this.trackingEnabled = true;
        this.setupABTesting();
    }
    
    disableTracking() {
        this.trackingEnabled = false;
        this.events = [];
        this.sessionData.events = [];
    }
}

// Initialize Analytics
let analyticsManager;

document.addEventListener('DOMContentLoaded', () => {
    analyticsManager = new AnalyticsManager();
    
    // Add to global scope
    window.analytics = analyticsManager;
    
    // Setup privacy compliance
    analyticsManager.setupPrivacyCompliance();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
}
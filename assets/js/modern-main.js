// Brooklyn Unisex Salon - Modern Advanced JavaScript

// GSAP Registration
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Application State
const App = {
    isLoaded: false,
    currentSection: 'home',
    animations: {},
    observers: new Map(),
    
    init() {
        this.setupPreloader();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupCounters();
        this.setupParallax();
        this.setupInteractiveElements();
        this.setupPerformanceOptimizations();
    }
};

// Preloader System
class PreloaderManager {
    constructor() {
        this.progress = 0;
        this.preloader = document.getElementById('preloader');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressText = document.querySelector('.progress-text');
        this.init();
    }
    
    init() {
        this.simulateLoading();
        this.setupAnimations();
    }
    
    simulateLoading() {
        const loadingSteps = [
            { progress: 20, delay: 300, text: 'Loading assets...' },
            { progress: 40, delay: 500, text: 'Preparing experience...' },
            { progress: 60, delay: 400, text: 'Initializing animations...' },
            { progress: 80, delay: 300, text: 'Almost ready...' },
            { progress: 100, delay: 200, text: 'Welcome!' }
        ];
        
        let currentStep = 0;
        
        const updateProgress = () => {
            if (currentStep >= loadingSteps.length) {
                this.complete();
                return;
            }
            
            const step = loadingSteps[currentStep];
            
            gsap.to(this, {
                progress: step.progress,
                duration: 0.5,
                ease: "power2.out",
                onUpdate: () => {
                    this.progressBar.style.width = `${this.progress}%`;
                    this.progressText.textContent = `${Math.round(this.progress)}%`;
                }
            });
            
            currentStep++;
            setTimeout(updateProgress, step.delay);
        };
        
        setTimeout(updateProgress, 500);
    }
    
    setupAnimations() {
        // Scissors animation
        gsap.to('.scissors-animation', {
            rotation: 360,
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
        });
        
        // Sparkles animation
        gsap.to('.sparkle', {
            y: -30,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    }
    
    complete() {
        setTimeout(() => {
            gsap.to(this.preloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    this.preloader.style.display = 'none';
                    App.isLoaded = true;
                    this.initMainAnimations();
                }
            });
        }, 500);
    }
    
    initMainAnimations() {
        // Hero entrance animation
        const tl = gsap.timeline();
        
        tl.from('.hero-badge', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        })
        .from('.title-line', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.4")
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .from('.hero-features .feature-item', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4")
        .from('.hero-buttons .btn', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .from('.stat-item', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .from('.scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2")
        .from('.hero-social .social-link', {
            x: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.4");
    }
}

// Navigation System
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.isMenuOpen = false;
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupActiveLink();
    }
    
    setupScrollEffect() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                gsap.to(this.navbar, {
                    y: -100,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                gsap.to(this.navbar, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 80
                        },
                        ease: "power2.inOut"
                    });
                    
                    this.closeMobileMenu();
                    this.updateActiveLink(link);
                }
            });
        });
    }
    
    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.hamburger.classList.toggle('active');
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }
    
    openMobileMenu() {
        gsap.set(this.navMenu, { display: 'flex' });
        gsap.fromTo(this.navMenu, 
            { x: '100%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 0.4, ease: "power2.out" }
        );
        
        gsap.from('.nav-menu .nav-link', {
            x: 50,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out"
        });
        
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        if (!this.isMenuOpen) return;
        
        gsap.to(this.navMenu, {
            x: '100%',
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                this.navMenu.style.display = 'none';
            }
        });
        
        this.hamburger.classList.remove('active');
        this.isMenuOpen = false;
        document.body.style.overflow = 'visible';
    }
    
    setupActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeLink = document.querySelector(`[href="#${entry.target.id}"]`);
                    this.updateActiveLink(activeLink);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Scroll Animations Manager
class ScrollAnimationsManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSectionAnimations();
        this.setupParallaxEffects();
        this.setupRevealAnimations();
    }
    
    setupSectionAnimations() {
        // About section animations
        gsap.from('.about-intro h3', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
        
        gsap.from('.about-intro p', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out"
        });
        
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.about-features',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
        
        gsap.from('.main-image', {
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        gsap.from('.floating-card', {
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });
    }
    
    setupParallaxEffects() {
        // Hero background parallax
        gsap.to('.layer-1', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -100,
            ease: "none"
        });
        
        gsap.to('.layer-2', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -150,
            ease: "none"
        });
        
        gsap.to('.layer-3', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -200,
            ease: "none"
        });
        
        // Hero content parallax
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 100,
            opacity: 0.3,
            ease: "none"
        });
    }
    
    setupRevealAnimations() {
        // Generic reveal animation for elements with data-reveal attribute
        document.querySelectorAll('[data-reveal]').forEach(element => {
            const direction = element.dataset.reveal || 'up';
            let fromProps = {};
            
            switch (direction) {
                case 'up':
                    fromProps = { y: 50, opacity: 0 };
                    break;
                case 'down':
                    fromProps = { y: -50, opacity: 0 };
                    break;
                case 'left':
                    fromProps = { x: -50, opacity: 0 };
                    break;
                case 'right':
                    fromProps = { x: 50, opacity: 0 };
                    break;
                case 'scale':
                    fromProps = { scale: 0.8, opacity: 0 };
                    break;
            }
            
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                ...fromProps,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }
}

// Counter Animation Manager
class CounterManager {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.init();
    }
    
    init() {
        this.setupCounterAnimations();
    }
    
    setupCounterAnimations() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            
            gsap.from(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                textContent: 0,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                stagger: 0.2,
                onUpdate: function() {
                    counter.textContent = Math.ceil(counter.textContent).toLocaleString();
                }
            });
        });
    }
}

// Interactive Elements Manager
class InteractiveManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupCursorEffects();
    }
    
    setupHoverEffects() {
        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
        });
        
        // Feature card hover effects
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.feature-icon'), {
                    rotation: 360,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.feature-icon'), {
                    rotation: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            });
        });
        
        // Social link hover effects
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                });
            });
        });
    }
    
    setupClickEffects() {
        // Ripple effect for buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                gsap.to(ripple, {
                    scale: 2,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => ripple.remove()
                });
            });
        });
    }
    
    setupCursorEffects() {
        // Custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1,
                ease: "power2.out"
            });
        });
        
        // Cursor hover effects
        document.querySelectorAll('a, button, .clickable').forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
        });
    }
}

// Performance Optimization Manager
class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupMemoryManagement();
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    setupImageOptimization() {
        // WebP support detection
        const supportsWebP = () => {
            return new Promise(resolve => {
                const webP = new Image();
                webP.onload = webP.onerror = () => resolve(webP.height === 2);
                webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            });
        };
        
        supportsWebP().then(supported => {
            if (supported) {
                document.documentElement.classList.add('webp');
            }
        });
    }
    
    setupMemoryManagement() {
        // Clean up animations when elements are out of view
        const cleanupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Pause heavy animations when out of view
                    const animations = gsap.getById(entry.target.id);
                    if (animations) {
                        animations.pause();
                    }
                } else {
                    const animations = gsap.getById(entry.target.id);
                    if (animations) {
                        animations.play();
                    }
                }
            });
        }, {
            rootMargin: '100px 0px'
        });
        
        document.querySelectorAll('[id]').forEach(element => {
            cleanupObserver.observe(element);
        });
    }
}

// Video Modal Manager
class VideoModalManager {
    constructor() {
        this.modal = null;
        this.init();
    }
    
    init() {
        this.createModal();
        this.setupEventListeners();
    }
    
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'video-modal';
        this.modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="video-container">
                    <iframe src="" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        `;
        
        this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(this.modal);
    }
    
    setupEventListeners() {
        const closeBtn = this.modal.querySelector('.modal-close');
        const overlay = this.modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }
    
    open(videoUrl) {
        const iframe = this.modal.querySelector('iframe');
        iframe.src = videoUrl;
        
        this.modal.style.opacity = '1';
        this.modal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        
        gsap.from(this.modal.querySelector('.modal-content'), {
            scale: 0.8,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    }
    
    close() {
        const iframe = this.modal.querySelector('iframe');
        iframe.src = '';
        
        this.modal.style.opacity = '0';
        this.modal.style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
    }
}

// Global Functions
window.openVideoModal = function() {
    const videoModal = new VideoModalManager();
    videoModal.open('https://www.youtube.com/embed/dQw4w9WgXcQ'); // Replace with actual video URL
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new PreloaderManager();
    new NavigationManager();
    new ScrollAnimationsManager();
    new CounterManager();
    new InteractiveManager();
    new PerformanceManager();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: 'mobile'
        });
    }
    
    // Initialize App
    App.init();
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Export for global access
window.App = App;
// Brooklyn Unisex Salon - Advanced Animations

// Animation Controller
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadingAnimations();
        this.setupParticleSystem();
        this.setupMorphingShapes();
        this.setupTextAnimations();
        this.setupCounterAnimations();
        this.setupParallaxEffects();
    }
    
    // Scroll-based animations
    setupScrollAnimations() {
        if (this.isReducedMotion) return;
        
        const scrollElements = document.querySelectorAll('[data-scroll-animation]');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.scrollAnimation;
                    const delay = element.dataset.animationDelay || 0;
                    
                    setTimeout(() => {
                        this.triggerScrollAnimation(element, animationType);
                    }, delay);
                    
                    scrollObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        scrollElements.forEach(element => {
            scrollObserver.observe(element);
        });
        
        this.observers.set('scroll', scrollObserver);
    }
    
    triggerScrollAnimation(element, type) {
        switch (type) {
            case 'fadeInUp':
                this.fadeInUp(element);
                break;
            case 'fadeInLeft':
                this.fadeInLeft(element);
                break;
            case 'fadeInRight':
                this.fadeInRight(element);
                break;
            case 'scaleIn':
                this.scaleIn(element);
                break;
            case 'rotateIn':
                this.rotateIn(element);
                break;
            case 'slideInUp':
                this.slideInUp(element);
                break;
            case 'bounceIn':
                this.bounceIn(element);
                break;
            case 'flipInX':
                this.flipInX(element);
                break;
            case 'zoomIn':
                this.zoomIn(element);
                break;
            default:
                this.fadeInUp(element);
        }
    }
    
    // Animation methods
    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    fadeInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    fadeInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }
    
    rotateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg) scale(1)';
        });
    }
    
    slideInUp(element) {
        element.style.transform = 'translateY(100%)';
        element.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
        });
    }
    
    bounceIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.3)';
        element.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }
    
    flipInX(element) {
        element.style.opacity = '0';
        element.style.transform = 'perspective(400px) rotateX(90deg)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'perspective(400px) rotateX(0deg)';
        });
    }
    
    zoomIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }
    
    // Hover animations
    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('[data-hover-animation]');
        
        hoverElements.forEach(element => {
            const animationType = element.dataset.hoverAnimation;
            
            element.addEventListener('mouseenter', () => {
                this.triggerHoverAnimation(element, animationType, true);
            });
            
            element.addEventListener('mouseleave', () => {
                this.triggerHoverAnimation(element, animationType, false);
            });
        });
    }
    
    triggerHoverAnimation(element, type, isEnter) {
        if (this.isReducedMotion) return;
        
        switch (type) {
            case 'lift':
                this.hoverLift(element, isEnter);
                break;
            case 'scale':
                this.hoverScale(element, isEnter);
                break;
            case 'rotate':
                this.hoverRotate(element, isEnter);
                break;
            case 'glow':
                this.hoverGlow(element, isEnter);
                break;
            case 'tilt':
                this.hoverTilt(element, isEnter);
                break;
            case 'shake':
                if (isEnter) this.shake(element);
                break;
            case 'pulse':
                this.hoverPulse(element, isEnter);
                break;
        }
    }
    
    hoverLift(element, isEnter) {
        element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        if (isEnter) {
            element.style.transform = 'translateY(-10px)';
            element.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        } else {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '';
        }
    }
    
    hoverScale(element, isEnter) {
        element.style.transition = 'transform 0.3s ease';
        element.style.transform = isEnter ? 'scale(1.05)' : 'scale(1)';
    }
    
    hoverRotate(element, isEnter) {
        element.style.transition = 'transform 0.3s ease';
        element.style.transform = isEnter ? 'rotate(5deg)' : 'rotate(0deg)';
    }
    
    hoverGlow(element, isEnter) {
        element.style.transition = 'box-shadow 0.3s ease';
        element.style.boxShadow = isEnter ? '0 0 20px var(--primary-color)' : '';
    }
    
    hoverTilt(element, isEnter) {
        element.style.transition = 'transform 0.3s ease';
        if (isEnter) {
            element.style.transform = 'perspective(1000px) rotateX(10deg) rotateY(10deg)';
        } else {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    }
    
    hoverPulse(element, isEnter) {
        if (isEnter) {
            element.style.animation = 'pulse 1s ease-in-out infinite';
        } else {
            element.style.animation = '';
        }
    }
    
    shake(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    
    // Loading animations
    setupLoadingAnimations() {
        this.createLoadingSpinner();
        this.createLoadingDots();
        this.createLoadingBars();
    }
    
    createLoadingSpinner() {
        const spinners = document.querySelectorAll('.loading-spinner');
        spinners.forEach(spinner => {
            spinner.style.animation = 'rotate 1s linear infinite';
        });
    }
    
    createLoadingDots() {
        const dotsContainers = document.querySelectorAll('.loading-dots');
        dotsContainers.forEach(container => {
            const dots = container.querySelectorAll('.loading-dot');
            dots.forEach((dot, index) => {
                dot.style.animation = `pulse 1.5s ease-in-out infinite`;
                dot.style.animationDelay = `${index * 0.2}s`;
            });
        });
    }
    
    createLoadingBars() {
        const barsContainers = document.querySelectorAll('.loading-bars');
        barsContainers.forEach(container => {
            const bars = container.querySelectorAll('.loading-bar');
            bars.forEach((bar, index) => {
                bar.style.animation = 'loadingBars 1.2s ease-in-out infinite';
                bar.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }
    
    // Particle system
    setupParticleSystem() {
        if (this.isReducedMotion) return;
        
        const particleContainers = document.querySelectorAll('.particles-container');
        
        particleContainers.forEach(container => {
            this.createParticleSystem(container);
        });
    }
    
    createParticleSystem(container) {
        const particleCount = 50;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle();
            container.appendChild(particle);
            particles.push(particle);
        }
        
        this.animateParticles(particles);
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        return particle;
    }
    
    animateParticles(particles) {
        particles.forEach(particle => {
            const moveParticle = () => {
                const currentY = parseFloat(particle.style.top);
                const newY = currentY - 0.5;
                
                if (newY < -10) {
                    particle.style.top = '110%';
                    particle.style.left = Math.random() * 100 + '%';
                } else {
                    particle.style.top = newY + '%';
                }
                
                requestAnimationFrame(moveParticle);
            };
            
            moveParticle();
        });
    }
    
    // Morphing shapes
    setupMorphingShapes() {
        if (this.isReducedMotion) return;
        
        const morphingElements = document.querySelectorAll('.morphing-shape');
        
        morphingElements.forEach(element => {
            element.style.animation = 'morphing 4s ease-in-out infinite';
        });
    }
    
    // Text animations
    setupTextAnimations() {
        this.setupTypewriterEffect();
        this.setupTextReveal();
        this.setupGradientText();
    }
    
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-color)';
            element.style.animation = 'blink 0.75s step-end infinite';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                        element.style.animation = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }
    
    setupTextReveal() {
        const textRevealElements = document.querySelectorAll('.text-reveal');
        
        textRevealElements.forEach(element => {
            const text = element.textContent;
            const words = text.split(' ');
            
            element.innerHTML = words.map((word, index) => 
                `<span style="animation-delay: ${index * 0.1}s">${word}</span>`
            ).join(' ');
            
            const spans = element.querySelectorAll('span');
            spans.forEach(span => {
                span.style.opacity = '0';
                span.style.transform = 'translateY(100%)';
                span.style.display = 'inline-block';
                span.style.animation = 'textReveal 0.8s ease forwards';
            });
        });
    }
    
    setupGradientText() {
        const gradientTextElements = document.querySelectorAll('.gradient-text');
        
        gradientTextElements.forEach(element => {
            element.style.background = 'var(--gradient-primary)';
            element.style.webkitBackgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            element.style.backgroundClip = 'text';
            element.style.animation = 'colorShift 3s ease-in-out infinite';
        });
    }
    
    // Counter animations
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = parseInt(element.dataset.duration) || 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Parallax effects
    setupParallaxEffects() {
        if (this.isReducedMotion) return;
        
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * rate);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };
        
        window.addEventListener('scroll', this.throttle(updateParallax, 16));
    }
    
    // Utility methods
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
    
    // Public methods for manual animation triggering
    animate(element, animationType, options = {}) {
        if (this.isReducedMotion && !options.force) return;
        
        const duration = options.duration || 800;
        const delay = options.delay || 0;
        const easing = options.easing || 'cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.transition = `all ${duration}ms ${easing}`;
            this.triggerScrollAnimation(element, animationType);
        }, delay);
    }
    
    // Stagger animations
    staggerAnimation(elements, animationType, staggerDelay = 100) {
        elements.forEach((element, index) => {
            this.animate(element, animationType, {
                delay: index * staggerDelay
            });
        });
    }
    
    // Chain animations
    chainAnimations(element, animations) {
        let totalDelay = 0;
        
        animations.forEach((animation, index) => {
            setTimeout(() => {
                this.animate(element, animation.type, animation.options);
            }, totalDelay);
            
            totalDelay += (animation.options?.duration || 800) + (animation.options?.delay || 0);
        });
    }
    
    // Cleanup method
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.animations.clear();
        this.observers.clear();
    }
}

// Initialize animation controller
let animationController;

document.addEventListener('DOMContentLoaded', () => {
    animationController = new AnimationController();
});

// Export for global access
window.AnimationController = AnimationController;
window.animationController = animationController;

// Additional animation utilities
const AnimationUtils = {
    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },
    
    // Fade in element
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let opacity = 0;
        const timer = setInterval(() => {
            opacity += 50 / duration;
            if (opacity >= 1) {
                clearInterval(timer);
                opacity = 1;
            }
            element.style.opacity = opacity;
        }, 50);
    },
    
    // Fade out element
    fadeOut(element, duration = 300) {
        let opacity = 1;
        const timer = setInterval(() => {
            opacity -= 50 / duration;
            if (opacity <= 0) {
                clearInterval(timer);
                opacity = 0;
                element.style.display = 'none';
            }
            element.style.opacity = opacity;
        }, 50);
    },
    
    // Slide down element
    slideDown(element, duration = 300) {
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        const targetHeight = element.scrollHeight;
        let height = 0;
        const increment = targetHeight / (duration / 10);
        
        const timer = setInterval(() => {
            height += increment;
            if (height >= targetHeight) {
                clearInterval(timer);
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            } else {
                element.style.height = height + 'px';
            }
        }, 10);
    },
    
    // Slide up element
    slideUp(element, duration = 300) {
        const targetHeight = element.scrollHeight;
        let height = targetHeight;
        const decrement = targetHeight / (duration / 10);
        
        element.style.overflow = 'hidden';
        
        const timer = setInterval(() => {
            height -= decrement;
            if (height <= 0) {
                clearInterval(timer);
                element.style.display = 'none';
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            } else {
                element.style.height = height + 'px';
            }
        }, 10);
    }
};

// Export animation utilities
window.AnimationUtils = AnimationUtils;
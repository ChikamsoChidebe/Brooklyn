// Hero Slider for Brooklyn Unisex Salon

class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero .slide');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.init();
    }
    
    init() {
        if (this.totalSlides <= 1) return;
        
        this.createControls();
        this.startAutoPlay();
        this.setupEventListeners();
    }
    
    createControls() {
        const heroContent = document.querySelector('.hero-content');
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'hero-dots';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `hero-dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('data-slide', i);
            dotsContainer.appendChild(dot);
        }
        
        heroContent.appendChild(dotsContainer);
        
        // Create arrow controls
        const prevBtn = document.createElement('button');
        prevBtn.className = 'hero-nav prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'hero-nav next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        const hero = document.querySelector('.hero');
        hero.appendChild(prevBtn);
        hero.appendChild(nextBtn);
    }
    
    setupEventListeners() {
        // Dot navigation
        document.querySelectorAll('.hero-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                this.goToSlide(slideIndex);
            });
        });
        
        // Arrow navigation
        document.querySelector('.hero-nav.prev')?.addEventListener('click', () => {
            this.prevSlide();
        });
        
        document.querySelector('.hero-nav.next')?.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Pause on hover
        const hero = document.querySelector('.hero');
        hero.addEventListener('mouseenter', () => this.pauseAutoPlay());
        hero.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    goToSlide(index) {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        document.querySelector('.hero-dot.active')?.classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
        document.querySelector(`[data-slide="${index}"]`)?.classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize hero slider
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});
// Brooklyn Unisex Salon - Performance Optimization

class PerformanceOptimizer {
    constructor() {
        this.metrics = {};
        this.observers = new Map();
        this.init();
    }
    
    init() {
        this.measurePerformance();
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupResourceHints();
        this.setupCriticalResourceLoading();
        this.setupServiceWorkerOptimizations();
        this.monitorWebVitals();
    }
    
    // Performance Measurement
    measurePerformance() {
        // Measure page load time
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            this.metrics.loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            this.metrics.domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
            this.metrics.firstPaint = this.getFirstPaint();
            this.metrics.firstContentfulPaint = this.getFirstContentfulPaint();
            
            this.reportMetrics();
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
    
    // Lazy Loading Implementation
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.fallbackLazyLoading();
        }
    }
    
    setupIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        this.observers.set('images', imageObserver);
    }
    
    loadImage(img) {
        return new Promise((resolve, reject) => {
            const imageLoader = new Image();
            
            imageLoader.onload = () => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                resolve(img);
            };
            
            imageLoader.onerror = reject;
            imageLoader.src = img.dataset.src;
        });
    }
    
    fallbackLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const loadImagesInViewport = () => {
            images.forEach(img => {
                if (this.isInViewport(img)) {
                    this.loadImage(img);
                }
            });
        };
        
        window.addEventListener('scroll', this.throttle(loadImagesInViewport, 100));
        window.addEventListener('resize', this.throttle(loadImagesInViewport, 100));
        loadImagesInViewport();
    }
    
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Image Optimization
    setupImageOptimization() {
        this.implementResponsiveImages();
        this.setupWebPSupport();
        this.setupImageCompression();
    }
    
    implementResponsiveImages() {
        const images = document.querySelectorAll('img[data-sizes]');
        
        images.forEach(img => {
            const sizes = JSON.parse(img.dataset.sizes);
            const srcset = sizes.map(size => `${size.src} ${size.width}w`).join(', ');
            
            img.srcset = srcset;
            img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
        });
    }
    
    setupWebPSupport() {
        const supportsWebP = this.checkWebPSupport();
        
        if (supportsWebP) {
            document.documentElement.classList.add('webp');
            this.convertImagesToWebP();
        }
    }
    
    checkWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    convertImagesToWebP() {
        const images = document.querySelectorAll('img[data-webp]');
        
        images.forEach(img => {
            const webpSrc = img.dataset.webp;
            if (webpSrc) {
                img.src = webpSrc;
            }
        });
    }
    
    setupImageCompression() {
        // Implement client-side image compression for uploads
        const fileInputs = document.querySelectorAll('input[type="file"][accept*="image"]');
        
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                Promise.all(files.map(file => this.compressImage(file)))
                    .then(compressedFiles => {
                        // Handle compressed files
                        console.log('Images compressed:', compressedFiles);
                    });
            });
        });
    }
    
    compressImage(file, quality = 0.8) {
        return new Promise(resolve => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                const maxWidth = 1920;
                const maxHeight = 1080;
                
                let { width, height } = img;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }
    
    // Resource Hints
    setupResourceHints() {
        this.addDNSPrefetch();
        this.addPreconnect();
        this.addPreload();
        this.addPrefetch();
    }
    
    addDNSPrefetch() {
        const domains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com',
            'cdnjs.cloudflare.com',
            'unpkg.com',
            'images.unsplash.com'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            document.head.appendChild(link);
        });
    }
    
    addPreconnect() {
        const criticalDomains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com'
        ];
        
        criticalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = `https://${domain}`;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    addPreload() {
        const criticalResources = [
            { href: './assets/css/style.css', as: 'style' },
            { href: './assets/js/main.js', as: 'script' },
            { href: './assets/images/salon-logo.jpg', as: 'image' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = () => {
                    link.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }
    
    addPrefetch() {
        const nextPageResources = [
            './assets/js/booking.js',
            './assets/js/gallery.js'
        ];
        
        // Prefetch after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                nextPageResources.forEach(resource => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = resource;
                    document.head.appendChild(link);
                });
            }, 2000);
        });
    }
    
    // Critical Resource Loading
    setupCriticalResourceLoading() {
        this.loadCriticalCSS();
        this.deferNonCriticalCSS();
        this.optimizeJavaScriptLoading();
    }
    
    loadCriticalCSS() {
        const criticalCSS = `
            /* Critical CSS for above-the-fold content */
            body { font-family: 'Inter', sans-serif; margin: 0; }
            .navbar { position: fixed; top: 0; width: 100%; z-index: 1000; }
            .hero { height: 100vh; display: flex; align-items: center; }
            .preloader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
    }
    
    deferNonCriticalCSS() {
        const nonCriticalCSS = [
            './assets/css/animations.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        window.addEventListener('load', () => {
            nonCriticalCSS.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                document.head.appendChild(link);
            });
        });
    }
    
    optimizeJavaScriptLoading() {
        // Load non-critical JavaScript after page load
        const nonCriticalJS = [
            './assets/js/animations.js',
            'https://unpkg.com/aos@2.3.1/dist/aos.js'
        ];
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                nonCriticalJS.forEach(src => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = true;
                    document.body.appendChild(script);
                });
            }, 1000);
        });
    }
    
    // Service Worker Optimizations
    setupServiceWorkerOptimizations() {
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
            this.setupCacheStrategies();
        }
    }
    
    registerServiceWorker() {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                    this.handleServiceWorkerUpdates(registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    handleServiceWorkerUpdates(registration) {
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // Show update notification
                    this.showUpdateNotification();
                }
            });
        });
    }
    
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <p>A new version is available!</p>
                <button onclick="window.location.reload()">Update</button>
                <button onclick="this.parentNode.parentNode.remove()">Later</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
        `;
        
        document.body.appendChild(notification);
    }
    
    setupCacheStrategies() {
        // Implement different caching strategies for different resource types
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'CACHE_STRATEGY',
                strategies: {
                    images: 'cache-first',
                    api: 'network-first',
                    static: 'stale-while-revalidate'
                }
            });
        }
    }
    
    // Web Vitals Monitoring
    monitorWebVitals() {
        this.measureLCP();
        this.measureFID();
        this.measureCLS();
    }
    
    measureLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                console.log('LCP:', lastEntry.startTime);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }
    
    measureFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        }
    }
    
    measureCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                this.metrics.cls = clsValue;
                console.log('CLS:', clsValue);
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
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
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Performance Reporting
    reportMetrics() {
        // Send metrics to analytics service
        console.log('Performance Metrics:', this.metrics);
        
        // Example: Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: Math.round(this.metrics.loadTime)
            });
        }
    }
    
    // Memory Management
    cleanup() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
    }
}

// Resource Monitor
class ResourceMonitor {
    constructor() {
        this.monitoring = false;
        this.init();
    }
    
    init() {
        this.monitorMemoryUsage();
        this.monitorNetworkStatus();
        this.monitorBatteryStatus();
    }
    
    monitorMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                console.log('Memory Usage:', {
                    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
                    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
                    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
                });
                
                // Warn if memory usage is high
                if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
                    console.warn('High memory usage detected');
                    this.optimizeMemoryUsage();
                }
            }, 30000); // Check every 30 seconds
        }
    }
    
    monitorNetworkStatus() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            const logConnection = () => {
                console.log('Network:', {
                    effectiveType: connection.effectiveType,
                    downlink: connection.downlink,
                    rtt: connection.rtt
                });
                
                // Adjust quality based on connection
                this.adjustQualityForConnection(connection.effectiveType);
            };
            
            connection.addEventListener('change', logConnection);
            logConnection();
        }
    }
    
    monitorBatteryStatus() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                const logBattery = () => {
                    console.log('Battery:', {
                        level: Math.round(battery.level * 100) + '%',
                        charging: battery.charging
                    });
                    
                    // Reduce animations if battery is low
                    if (battery.level < 0.2 && !battery.charging) {
                        document.documentElement.classList.add('low-battery');
                    }
                };
                
                battery.addEventListener('levelchange', logBattery);
                battery.addEventListener('chargingchange', logBattery);
                logBattery();
            });
        }
    }
    
    adjustQualityForConnection(effectiveType) {
        const body = document.body;
        
        switch (effectiveType) {
            case 'slow-2g':
            case '2g':
                body.classList.add('low-quality');
                break;
            case '3g':
                body.classList.add('medium-quality');
                break;
            case '4g':
            default:
                body.classList.remove('low-quality', 'medium-quality');
                break;
        }
    }
    
    optimizeMemoryUsage() {
        // Clear unused resources
        if (window.animationController) {
            window.animationController.cleanup();
        }
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }
}

// Initialize Performance Optimization
let performanceOptimizer;
let resourceMonitor;

document.addEventListener('DOMContentLoaded', () => {
    performanceOptimizer = new PerformanceOptimizer();
    resourceMonitor = new ResourceMonitor();
    
    // Add to global scope
    window.performanceOptimizer = performanceOptimizer;
    window.resourceMonitor = resourceMonitor;
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (performanceOptimizer) {
        performanceOptimizer.cleanup();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PerformanceOptimizer, ResourceMonitor };
}
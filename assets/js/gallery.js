// Brooklyn Unisex Salon - Gallery System

// Gallery data with real images from Unsplash
const galleryData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Modern salon interior with styling chairs',
        category: 'salon',
        title: 'Modern Salon Interior',
        description: 'Our beautifully designed salon space'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Professional hair cutting in progress',
        category: 'haircuts',
        title: 'Precision Hair Cutting',
        description: 'Expert precision cutting techniques'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hair coloring process with foils',
        category: 'coloring',
        title: 'Professional Hair Coloring',
        description: 'Advanced coloring techniques with premium products'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Elegant updo hairstyle',
        category: 'styling',
        title: 'Elegant Updo Styling',
        description: 'Beautiful updo for special occasions'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Men\'s haircut and styling',
        category: 'men',
        title: 'Men\'s Professional Cut',
        description: 'Classic and modern men\'s styling'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Women\'s long hair styling',
        category: 'women',
        title: 'Women\'s Long Hair Styling',
        description: 'Beautiful long hair styling and treatment'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hair washing and treatment',
        category: 'treatments',
        title: 'Luxury Hair Treatment',
        description: 'Relaxing hair washing and conditioning'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Curly hair styling',
        category: 'styling',
        title: 'Curly Hair Styling',
        description: 'Expert curly hair care and styling'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hair color transformation',
        category: 'coloring',
        title: 'Color Transformation',
        description: 'Dramatic color change and styling'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Bridal hair styling',
        category: 'styling',
        title: 'Bridal Hair Styling',
        description: 'Elegant bridal hairstyles for your special day'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Men\'s beard trimming',
        category: 'men',
        title: 'Professional Beard Trimming',
        description: 'Expert beard grooming and styling'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hair highlights technique',
        category: 'coloring',
        title: 'Balayage Highlights',
        description: 'Natural-looking balayage highlighting'
    },
    {
        id: 13,
        src: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Short hair styling',
        category: 'haircuts',
        title: 'Modern Short Cut',
        description: 'Trendy short hairstyles and cuts'
    },
    {
        id: 14,
        src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hair treatment mask application',
        category: 'treatments',
        title: 'Deep Conditioning Treatment',
        description: 'Nourishing hair mask and treatment'
    },
    {
        id: 15,
        src: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Women\'s layered haircut',
        category: 'women',
        title: 'Layered Hair Cut',
        description: 'Beautiful layered cuts for volume and movement'
    },
    {
        id: 16,
        src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hair styling tools and products',
        category: 'salon',
        title: 'Professional Tools',
        description: 'High-quality styling tools and products'
    },
    {
        id: 17,
        src: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Creative hair coloring',
        category: 'coloring',
        title: 'Creative Color Design',
        description: 'Artistic and creative hair coloring'
    },
    {
        id: 18,
        src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hair blow-dry styling',
        category: 'styling',
        title: 'Professional Blow-Dry',
        description: 'Perfect blow-dry styling techniques'
    },
    {
        id: 19,
        src: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Men\'s modern haircut',
        category: 'men',
        title: 'Contemporary Men\'s Cut',
        description: 'Modern and stylish men\'s haircuts'
    },
    {
        id: 20,
        src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Hair consultation process',
        category: 'salon',
        title: 'Professional Consultation',
        description: 'Personalized hair consultation service'
    }
];

// Gallery state
let currentFilter = 'all';
let currentImageIndex = 0;
let visibleImages = 12;
let filteredImages = [...galleryData];

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

function initGallery() {
    setupFilters();
    renderGallery();
    setupLoadMore();
    setupGalleryModal();
    setupLazyLoading();
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            currentFilter = filter;
            
            // Filter images
            filterImages(filter);
            
            // Reset visible count
            visibleImages = 12;
            
            // Re-render gallery
            renderGallery();
        });
    });
}

// Filter images
function filterImages(filter) {
    if (filter === 'all') {
        filteredImages = [...galleryData];
    } else {
        filteredImages = galleryData.filter(image => image.category === filter);
    }
}

// Render gallery
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // Clear existing content
    galleryGrid.innerHTML = '';
    
    // Get images to show
    const imagesToShow = filteredImages.slice(0, visibleImages);
    
    // Create gallery items with staggered animation
    imagesToShow.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
    });
    
    // Update load more button
    updateLoadMoreButton();
    
    // Trigger animations
    animateGalleryItems();
}

// Create gallery item
function createGalleryItem(image, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.category = image.category;
    galleryItem.dataset.index = index;
    
    galleryItem.innerHTML = `
        <img src="${image.src}" alt="${image.alt}" loading="lazy">
        <div class="gallery-overlay">
            <div class="gallery-info">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
                <div class="gallery-actions">
                    <button class="gallery-btn view-btn" onclick="openGalleryModal(${image.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="gallery-btn zoom-btn" onclick="zoomImage(${image.id})">
                        <i class="fas fa-search-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add click event for modal
    galleryItem.addEventListener('click', () => openGalleryModal(image.id));
    
    return galleryItem;
}

// Animate gallery items
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Setup load more functionality
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreImages);
    }
}

// Load more images
function loadMoreImages() {
    visibleImages += 8;
    renderGallery();
    
    // Smooth scroll to new images
    setTimeout(() => {
        const newImages = document.querySelectorAll('.gallery-item');
        if (newImages.length > visibleImages - 8) {
            newImages[visibleImages - 8].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, 300);
}

// Update load more button
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;
    
    if (visibleImages >= filteredImages.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.innerHTML = `
            Load More 
            <span class="remaining-count">(${filteredImages.length - visibleImages} remaining)</span>
        `;
    }
}

// Setup gallery modal
function setupGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = modal?.querySelector('.close-modal');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeGalleryModal);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal && modal.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeGalleryModal();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

// Open gallery modal
function openGalleryModal(imageId) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    
    if (!modal || !modalImage) return;
    
    const image = galleryData.find(img => img.id === imageId);
    if (!image) return;
    
    // Set current image index
    currentImageIndex = galleryData.findIndex(img => img.id === imageId);
    
    // Update modal image
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add image info
    updateModalInfo(image);
    
    // Preload adjacent images
    preloadAdjacentImages();
}

// Close gallery modal
function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'visible';
    }
}

// Show previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateModalImage();
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    updateModalImage();
}

// Update modal image
function updateModalImage() {
    const modalImage = document.getElementById('modal-image');
    const image = galleryData[currentImageIndex];
    
    if (modalImage && image) {
        // Add fade effect
        modalImage.style.opacity = '0';
        
        setTimeout(() => {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalImage.style.opacity = '1';
            
            updateModalInfo(image);
            preloadAdjacentImages();
        }, 150);
    }
}

// Update modal info
function updateModalInfo(image) {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    
    // Remove existing info
    const existingInfo = modal.querySelector('.modal-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    // Add new info
    const modalContent = modal.querySelector('.modal-content');
    const infoElement = document.createElement('div');
    infoElement.className = 'modal-info';
    infoElement.innerHTML = `
        <h3>${image.title}</h3>
        <p>${image.description}</p>
        <div class="modal-meta">
            <span class="category-tag">${image.category}</span>
            <span class="image-counter">${currentImageIndex + 1} / ${galleryData.length}</span>
        </div>
    `;
    
    modalContent.appendChild(infoElement);
}

// Preload adjacent images
function preloadAdjacentImages() {
    const prevIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    const nextIndex = (currentImageIndex + 1) % galleryData.length;
    
    // Preload previous image
    const prevImg = new Image();
    prevImg.src = galleryData[prevIndex].src;
    
    // Preload next image
    const nextImg = new Image();
    nextImg.src = galleryData[nextIndex].src;
}

// Zoom image functionality
function zoomImage(imageId) {
    const image = galleryData.find(img => img.id === imageId);
    if (!image) return;
    
    // Create zoom overlay
    const zoomOverlay = document.createElement('div');
    zoomOverlay.className = 'zoom-overlay';
    zoomOverlay.innerHTML = `
        <div class="zoom-container">
            <img src="${image.src}" alt="${image.alt}" class="zoom-image">
            <button class="zoom-close">&times;</button>
        </div>
    `;
    
    // Add styles
    zoomOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
    `;
    
    document.body.appendChild(zoomOverlay);
    document.body.style.overflow = 'hidden';
    
    // Close functionality
    const closeZoom = () => {
        zoomOverlay.remove();
        document.body.style.overflow = 'visible';
    };
    
    zoomOverlay.addEventListener('click', closeZoom);
    zoomOverlay.querySelector('.zoom-close').addEventListener('click', closeZoom);
    
    // Prevent image click from closing
    zoomOverlay.querySelector('.zoom-image').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Setup lazy loading
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all gallery images
        document.querySelectorAll('.gallery-item img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Search functionality
function setupGallerySearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search gallery...';
    searchInput.className = 'gallery-search';
    
    const galleryFilters = document.querySelector('.gallery-filters');
    if (galleryFilters) {
        galleryFilters.appendChild(searchInput);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchGallery(searchTerm);
        });
    }
}

// Search gallery
function searchGallery(searchTerm) {
    if (!searchTerm) {
        filterImages(currentFilter);
    } else {
        filteredImages = galleryData.filter(image => 
            image.title.toLowerCase().includes(searchTerm) ||
            image.description.toLowerCase().includes(searchTerm) ||
            image.category.toLowerCase().includes(searchTerm)
        );
    }
    
    visibleImages = 12;
    renderGallery();
}

// Download image functionality
function downloadImage(imageId) {
    const image = galleryData.find(img => img.id === imageId);
    if (!image) return;
    
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `brooklyn-salon-${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Share image functionality
function shareImage(imageId) {
    const image = galleryData.find(img => img.id === imageId);
    if (!image) return;
    
    if (navigator.share) {
        navigator.share({
            title: image.title,
            text: image.description,
            url: image.src
        });
    } else {
        // Fallback to copying URL
        navigator.clipboard.writeText(image.src).then(() => {
            showNotification('Image URL copied to clipboard!', 'success');
        });
    }
}

// Masonry layout (alternative layout option)
function setupMasonryLayout() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // Add masonry class
    galleryGrid.classList.add('masonry-layout');
    
    // Calculate column count based on screen size
    const updateMasonry = () => {
        const containerWidth = galleryGrid.offsetWidth;
        const columnWidth = 300;
        const columnCount = Math.floor(containerWidth / columnWidth);
        
        galleryGrid.style.columnCount = columnCount;
        galleryGrid.style.columnGap = '1rem';
    };
    
    // Update on resize
    window.addEventListener('resize', debounce(updateMasonry, 250));
    updateMasonry();
}

// Infinite scroll (alternative to load more button)
function setupInfiniteScroll() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && visibleImages < filteredImages.length) {
                loadMoreImages();
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    // Create sentinel element
    const sentinel = document.createElement('div');
    sentinel.className = 'scroll-sentinel';
    sentinel.style.height = '1px';
    
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        gallerySection.appendChild(sentinel);
        observer.observe(sentinel);
    }
}

// Utility function for debouncing
function debounce(func, wait) {
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

// Make functions globally available
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = closeGalleryModal;
window.zoomImage = zoomImage;
window.downloadImage = downloadImage;
window.shareImage = shareImage;

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment to enable alternative features
    // setupGallerySearch();
    // setupMasonryLayout();
    // setupInfiniteScroll();
});
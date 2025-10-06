// Brooklyn Unisex Salon - Booking System

// Booking data
const bookingData = {
    services: [
        {
            id: 'haircut-styling',
            name: 'Hair Cutting & Styling',
            description: 'Expert cuts and styling for all hair types',
            price: 45000,
            duration: 60,
            category: 'haircuts'
        },
        {
            id: 'hair-coloring',
            name: 'Hair Coloring',
            description: 'Professional coloring services using premium products',
            price: 85000,
            duration: 120,
            category: 'coloring'
        },
        {
            id: 'hair-treatments',
            name: 'Hair Treatments',
            description: 'Restorative treatments to nourish and strengthen',
            price: 65000,
            duration: 90,
            category: 'treatments'
        },
        {
            id: 'mens-grooming',
            name: 'Men\'s Grooming',
            description: 'Complete grooming services for the modern gentleman',
            price: 35000,
            duration: 45,
            category: 'men'
        },
        {
            id: 'womens-styling',
            name: 'Women\'s Styling',
            description: 'Elegant styling services for every occasion',
            price: 55000,
            duration: 75,
            category: 'women'
        },
        {
            id: 'beauty-services',
            name: 'Beauty Services',
            description: 'Complete beauty treatments to enhance your natural radiance',
            price: 25000,
            duration: 30,
            category: 'beauty'
        },
        {
            id: 'bridal-package',
            name: 'Bridal Package',
            description: 'Complete bridal styling including hair, makeup, and trial',
            price: 250000,
            duration: 180,
            category: 'special'
        },
        {
            id: 'color-correction',
            name: 'Color Correction',
            description: 'Expert color correction for damaged or unwanted color',
            price: 150000,
            duration: 240,
            category: 'coloring'
        }
    ],
    
    stylists: [
        {
            id: 'sarah-johnson',
            name: 'Sarah Johnson',
            title: 'Senior Hair Stylist',
            specialties: ['Balayage', 'Precision Cuts', 'Color Correction'],
            image: 'https://images.unsplash.com/photo-1594824804732-ca8db7d1457c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            rating: 4.9,
            experience: '10+ years'
        },
        {
            id: 'michael-chen',
            name: 'Michael Chen',
            title: 'Master Barber',
            specialties: ['Classic Cuts', 'Beard Styling', 'Hot Shaves'],
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            rating: 4.8,
            experience: '8+ years'
        },
        {
            id: 'emma-rodriguez',
            name: 'Emma Rodriguez',
            title: 'Color Specialist',
            specialties: ['Creative Color', 'Highlights', 'Fashion Colors'],
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            rating: 4.9,
            experience: '7+ years'
        },
        {
            id: 'david-thompson',
            name: 'David Thompson',
            title: 'Style Director',
            specialties: ['Bridal Styling', 'Updos', 'Event Hair'],
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            rating: 5.0,
            experience: '12+ years'
        }
    ],
    
    timeSlots: [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
        '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
    ],
    
    unavailableSlots: {
        // Format: 'YYYY-MM-DD': ['time1', 'time2']
        // This would typically come from a backend API
    }
};

// Booking state
let currentBooking = {
    step: 1,
    service: null,
    stylist: null,
    date: null,
    time: null,
    clientInfo: {}
};

// Initialize booking system
document.addEventListener('DOMContentLoaded', function() {
    initBookingSystem();
});

function initBookingSystem() {
    const bookingForm = document.getElementById('booking-form');
    if (!bookingForm) return;
    
    renderServices();
    renderStylists();
    setupDatePicker();
    setupFormNavigation();
    setupFormValidation();
}

// Render services
function renderServices() {
    const serviceSelection = document.querySelector('.service-selection');
    if (!serviceSelection) return;
    
    serviceSelection.innerHTML = '';
    
    bookingData.services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.className = 'selection-item';
        serviceElement.dataset.serviceId = service.id;
        
        serviceElement.innerHTML = `
            <h4>${service.name}</h4>
            <p>${service.description}</p>
            <div class="selection-details">
                <span class="selection-price">$${service.price}</span>
                <span class="selection-duration">${service.duration} min</span>
            </div>
        `;
        
        serviceElement.addEventListener('click', () => selectService(service));
        serviceSelection.appendChild(serviceElement);
    });
}

// Render stylists
function renderStylists() {
    const stylistSelection = document.querySelector('.stylist-selection');
    if (!stylistSelection) return;
    
    stylistSelection.innerHTML = '';
    
    bookingData.stylists.forEach(stylist => {
        const stylistElement = document.createElement('div');
        stylistElement.className = 'selection-item stylist-item';
        stylistElement.dataset.stylistId = stylist.id;
        
        stylistElement.innerHTML = `
            <div class="stylist-info">
                <img src="${stylist.image}" alt="${stylist.name}" class="stylist-avatar">
                <div class="stylist-details">
                    <h4>${stylist.name}</h4>
                    <p class="stylist-title">${stylist.title}</p>
                    <div class="stylist-rating">
                        ${generateStars(stylist.rating)}
                        <span>(${stylist.rating})</span>
                    </div>
                    <div class="stylist-specialties">
                        ${stylist.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                    </div>
                    <p class="stylist-experience">${stylist.experience} experience</p>
                </div>
            </div>
        `;
        
        stylistElement.addEventListener('click', () => selectStylist(stylist));
        stylistSelection.appendChild(stylistElement);
    });
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Setup date picker
function setupDatePicker() {
    const dateInput = document.getElementById('appointment-date');
    if (!dateInput) return;
    
    // Set minimum date to today
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    dateInput.min = minDate;
    
    // Set maximum date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];
    
    dateInput.addEventListener('change', (e) => {
        currentBooking.date = e.target.value;
        renderTimeSlots();
        updateBookingSummary();
    });
}

// Render time slots
function renderTimeSlots() {
    const timeSlotsContainer = document.getElementById('time-slots');
    if (!timeSlotsContainer || !currentBooking.date) return;
    
    timeSlotsContainer.innerHTML = '';
    
    const selectedDate = currentBooking.date;
    const unavailableForDate = bookingData.unavailableSlots[selectedDate] || [];
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date();
    
    bookingData.timeSlots.forEach(timeSlot => {
        const timeElement = document.createElement('div');
        timeElement.className = 'time-slot';
        timeElement.textContent = timeSlot;
        
        // Check if slot is unavailable
        const isUnavailable = unavailableForDate.includes(timeSlot);
        
        // Check if slot is in the past (for today's date)
        let isPast = false;
        if (selectedDate === today) {
            const slotTime = new Date(`${selectedDate} ${convertTo24Hour(timeSlot)}`);
            isPast = slotTime <= currentTime;
        }
        
        if (isUnavailable || isPast) {
            timeElement.classList.add('unavailable');
        } else {
            timeElement.addEventListener('click', () => selectTimeSlot(timeSlot, timeElement));
        }
        
        timeSlotsContainer.appendChild(timeElement);
    });
}

// Convert 12-hour to 24-hour format
function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
        hours = '00';
    }
    
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours}:${minutes}:00`;
}

// Select service
function selectService(service) {
    currentBooking.service = service;
    
    // Update UI
    document.querySelectorAll('.service-selection .selection-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    document.querySelector(`[data-service-id="${service.id}"]`).classList.add('selected');
    
    updateBookingSummary();
    
    // Auto-advance to next step after a short delay
    setTimeout(() => {
        nextStep();
    }, 500);
}

// Select stylist
function selectStylist(stylist) {
    currentBooking.stylist = stylist;
    
    // Update UI
    document.querySelectorAll('.stylist-selection .selection-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    document.querySelector(`[data-stylist-id="${stylist.id}"]`).classList.add('selected');
    
    updateBookingSummary();
    
    // Auto-advance to next step after a short delay
    setTimeout(() => {
        nextStep();
    }, 500);
}

// Select time slot
function selectTimeSlot(timeSlot, element) {
    currentBooking.time = timeSlot;
    
    // Update UI
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    element.classList.add('selected');
    
    updateBookingSummary();
}

// Setup form navigation
function setupFormNavigation() {
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    const submitBtn = document.getElementById('submit-booking');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', submitBooking);
    }
}

// Next step
function nextStep() {
    if (!validateCurrentStep()) return;
    
    currentBooking.step++;
    updateFormStep();
}

// Previous step
function prevStep() {
    currentBooking.step--;
    updateFormStep();
}

// Update form step
function updateFormStep() {
    const steps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    const submitBtn = document.getElementById('submit-booking');
    
    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));
    
    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${currentBooking.step}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update navigation buttons
    if (prevBtn) {
        prevBtn.style.display = currentBooking.step > 1 ? 'inline-flex' : 'none';
    }
    
    if (nextBtn && submitBtn) {
        if (currentBooking.step === 4) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }
    
    // Special handling for step 3 (date/time)
    if (currentBooking.step === 3 && currentBooking.date) {
        renderTimeSlots();
    }
}

// Validate current step
function validateCurrentStep() {
    switch (currentBooking.step) {
        case 1:
            if (!currentBooking.service) {
                showNotification('Please select a service', 'error');
                return false;
            }
            break;
        case 2:
            if (!currentBooking.stylist) {
                showNotification('Please select a stylist', 'error');
                return false;
            }
            break;
        case 3:
            if (!currentBooking.date || !currentBooking.time) {
                showNotification('Please select date and time', 'error');
                return false;
            }
            break;
    }
    return true;
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

// Validate individual input
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing error styling
    input.classList.remove('error');
    
    // Validate based on input type
    switch (input.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showInputError(input, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'tel':
            if (value && !isValidPhone(value)) {
                showInputError(input, 'Please enter a valid phone number');
                return false;
            }
            break;
        default:
            if (input.required && !value) {
                showInputError(input, 'This field is required');
                return false;
            }
    }
    
    return true;
}

// Clear validation error
function clearValidationError(e) {
    const input = e.target;
    input.classList.remove('error');
    
    const errorMsg = input.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Show input error
function showInputError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.appendChild(errorElement);
}

// Validation helpers
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Submit booking
function submitBooking(e) {
    e.preventDefault();
    
    // Collect client information
    currentBooking.clientInfo = {
        name: document.getElementById('client-name').value,
        email: document.getElementById('client-email').value,
        phone: document.getElementById('client-phone').value,
        specialRequests: document.getElementById('special-requests').value
    };
    
    // Validate all required fields
    const form = document.getElementById('booking-form');
    const requiredInputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submit-booking');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showBookingConfirmation();
        
        // Reset form
        resetBookingForm();
        
    }, 2000);
}

// Show booking confirmation
function showBookingConfirmation() {
    const modal = document.createElement('div');
    modal.className = 'booking-confirmation-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="confirmation-header">
                <i class="fas fa-check-circle"></i>
                <h2>Booking Confirmed!</h2>
            </div>
            <div class="confirmation-details">
                <h3>Appointment Details</h3>
                <div class="detail-row">
                    <span class="label">Service:</span>
                    <span class="value">${currentBooking.service.name}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Stylist:</span>
                    <span class="value">${currentBooking.stylist.name}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Date:</span>
                    <span class="value">${formatDate(currentBooking.date)}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Time:</span>
                    <span class="value">${currentBooking.time}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Duration:</span>
                    <span class="value">${currentBooking.service.duration} minutes</span>
                </div>
                <div class="detail-row total">
                    <span class="label">Total:</span>
                    <span class="value">$${currentBooking.service.price}</span>
                </div>
            </div>
            <div class="confirmation-actions">
                <button class="btn btn-primary" onclick="closeConfirmationModal()">Close</button>
                <button class="btn btn-secondary" onclick="addToCalendar()">Add to Calendar</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', closeConfirmationModal);
}

// Close confirmation modal
function closeConfirmationModal() {
    const modal = document.querySelector('.booking-confirmation-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'visible';
    }
}

// Add to calendar
function addToCalendar() {
    const startDate = new Date(`${currentBooking.date} ${convertTo24Hour(currentBooking.time)}`);
    const endDate = new Date(startDate.getTime() + (currentBooking.service.duration * 60000));
    
    const event = {
        title: `${currentBooking.service.name} - Brooklyn Unisex Salon`,
        start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        description: `Appointment with ${currentBooking.stylist.name} at Brooklyn Unisex Salon`,
        location: '123 Brooklyn Avenue, Brooklyn, NY 11201'
    };
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
}

// Reset booking form
function resetBookingForm() {
    currentBooking = {
        step: 1,
        service: null,
        stylist: null,
        date: null,
        time: null,
        clientInfo: {}
    };
    
    // Reset form
    const form = document.getElementById('booking-form');
    if (form) {
        form.reset();
    }
    
    // Reset selections
    document.querySelectorAll('.selection-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Reset step
    updateFormStep();
    updateBookingSummary();
}

// Update booking summary
function updateBookingSummary() {
    const summaryContent = document.getElementById('booking-summary');
    if (!summaryContent) return;
    
    if (!currentBooking.service) {
        summaryContent.innerHTML = '<p>Select your service to see booking details</p>';
        return;
    }
    
    let summaryHTML = '<div class="summary-items">';
    
    if (currentBooking.service) {
        summaryHTML += `
            <div class="summary-item">
                <h4>Service</h4>
                <p>${currentBooking.service.name}</p>
                <span class="price">₦${currentBooking.service.price.toLocaleString()}</span>
            </div>
        `;
    }
    
    if (currentBooking.stylist) {
        summaryHTML += `
            <div class="summary-item">
                <h4>Stylist</h4>
                <p>${currentBooking.stylist.name}</p>
                <span class="title">${currentBooking.stylist.title}</span>
            </div>
        `;
    }
    
    if (currentBooking.date && currentBooking.time) {
        summaryHTML += `
            <div class="summary-item">
                <h4>Date & Time</h4>
                <p>${formatDate(currentBooking.date)}</p>
                <span class="time">${currentBooking.time}</span>
            </div>
        `;
    }
    
    if (currentBooking.service) {
        summaryHTML += `
            <div class="summary-item">
                <h4>Duration</h4>
                <p>${currentBooking.service.duration} minutes</p>
            </div>
        `;
    }
    
    summaryHTML += '</div>';
    
    if (currentBooking.service) {
        summaryHTML += `
            <div class="summary-total">
                <h4>Total: ₦${currentBooking.service.price.toLocaleString()}</h4>
            </div>
        `;
    }
    
    summaryContent.innerHTML = summaryHTML;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Notification function (if not available from main.js)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        alert(message);
    }
}

// Make functions globally available
window.closeConfirmationModal = closeConfirmationModal;
window.addToCalendar = addToCalendar;
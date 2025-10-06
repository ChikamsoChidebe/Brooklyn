# Brooklyn Unisex Salon Website

A comprehensive, modern website for Brooklyn Unisex Salon featuring advanced animations, booking system, gallery, and responsive design.

## Features

### 🎨 Design & UI
- Modern, professional design with golden color scheme
- Fully responsive layout for all devices
- Advanced CSS animations and transitions
- Interactive hover effects and micro-interactions
- Dark mode support
- High contrast mode for accessibility

### 📱 Progressive Web App (PWA)
- Installable on mobile devices
- Offline functionality with service worker
- App-like experience
- Fast loading with caching

### 🎭 Animations
- Scroll-triggered animations using AOS library
- Custom CSS animations and keyframes
- Particle effects and morphing shapes
- Typewriter text effects
- Parallax scrolling
- Staggered animations
- Hover animations and micro-interactions

### 📅 Booking System
- Multi-step booking form
- Service selection with pricing
- Stylist selection with profiles
- Date and time picker
- Real-time availability checking
- Booking confirmation with calendar integration
- Form validation and error handling

### 🖼️ Gallery
- Filterable image gallery
- Lightbox modal with navigation
- Lazy loading for performance
- Image zoom functionality
- Category-based filtering
- Load more functionality

### 👥 Team Section
- Stylist profiles with specialties
- Social media integration
- Rating system
- Experience highlights

### 💬 Testimonials
- Automated slider with controls
- Client reviews with photos
- Star ratings
- Navigation dots

### 📞 Contact & Location
- Contact form with validation
- Business hours display
- Social media links
- Map integration ready
- Multiple contact methods

### 🚀 Performance
- Optimized images and assets
- Lazy loading implementation
- Minified CSS and JavaScript
- Service worker caching
- Fast loading times

## File Structure

```
Brooklyn/
├── index.html                 # Main HTML file
├── manifest.json             # PWA manifest
├── sw.js                     # Service worker
├── README.md                 # This file
└── assets/
    ├── css/
    │   ├── style.css         # Main stylesheet
    │   ├── animations.css    # Animation styles
    │   └── responsive.css    # Responsive design
    ├── js/
    │   ├── main.js          # Main JavaScript
    │   ├── booking.js       # Booking system
    │   ├── gallery.js       # Gallery functionality
    │   └── animations.js    # Animation controller
    ├── images/
    │   └── salon-logo.jpg   # Salon logo (placeholder)
    └── videos/              # Video assets (to be added)
```

## Setup Instructions

### 1. Replace Placeholder Images
- Add your salon logo to `assets/images/salon-logo.jpg`
- The logo should be approximately 200x200 pixels
- Supported formats: JPG, PNG, SVG

### 2. Customize Content
- Update salon name, address, and contact information in `index.html`
- Modify services, pricing, and descriptions in `assets/js/booking.js`
- Update team member information in the HTML
- Replace testimonials with real client reviews

### 3. Add Real Images
- Replace gallery images in `assets/js/gallery.js` with your salon photos
- Add team member photos
- Include before/after transformation photos

### 4. Configure Booking System
- Set up backend API for booking management
- Configure email notifications
- Set real availability and pricing
- Integrate with calendar system

### 5. Social Media Integration
- Update social media links throughout the site
- Add Instagram feed integration
- Configure sharing functionality

### 6. SEO Optimization
- Update meta tags with your salon information
- Add structured data markup
- Configure Google Analytics
- Set up Google My Business integration

### 7. Performance Optimization
- Optimize images for web (WebP format recommended)
- Configure CDN for faster loading
- Set up compression and caching
- Monitor Core Web Vitals

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid and Flexbox
- **JavaScript ES6+** - Interactive functionality
- **AOS Library** - Scroll animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **Service Worker** - PWA functionality

## Customization Guide

### Colors
The color scheme can be customized by modifying CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #d4af37;    /* Golden yellow */
    --secondary-color: #2c3e50;  /* Dark blue */
    --accent-color: #e74c3c;     /* Red accent */
    /* ... other colors */
}
```

### Animations
Animations can be controlled in `assets/js/animations.js`:
- Disable animations for reduced motion preference
- Customize animation timing and easing
- Add new animation types

### Booking System
Modify booking options in `assets/js/booking.js`:
- Add/remove services
- Update pricing
- Change available time slots
- Customize form fields

## Deployment

### Local Development
1. Open `index.html` in a web browser
2. Use a local server for full functionality:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

### Production Deployment
1. Upload files to your web server
2. Configure HTTPS for PWA functionality
3. Set up proper caching headers
4. Configure redirects and error pages

## Support & Maintenance

### Regular Updates
- Update testimonials and gallery images
- Refresh team member information
- Update pricing and services
- Monitor and fix any issues

### Performance Monitoring
- Check loading speeds regularly
- Monitor Core Web Vitals
- Update dependencies as needed
- Optimize images and assets

## License

This website template is created for Brooklyn Unisex Salon. All rights reserved.

## Contact

For technical support or customization requests, please contact the development team.

---

**Note**: This is a comprehensive salon website with advanced features. Make sure to test all functionality thoroughly before going live and customize the content to match your specific salon's needs.
/* ============================================
   EZ Fast Studio - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create WhatsApp message
            const whatsappMessage = `Hi EZ Fast Studio!

Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service Interest: ${service}

Message: ${message}`;
            
            // Encode for WhatsApp URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp
            window.open(`https://wa.me/601116664816?text=${encodedMessage}`, '_blank');
            
            // Show success message
            alert('Thank you for your message! We will open WhatsApp to continue the conversation.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .tech-category, .portfolio-item, .why-item').forEach(el => {
        el.classList.add('animate-target');
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-target {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(2) { transition-delay: 0.1s; }
        .service-card:nth-child(3) { transition-delay: 0.2s; }
        .service-card:nth-child(4) { transition-delay: 0.3s; }
        .service-card:nth-child(5) { transition-delay: 0.4s; }
        .service-card:nth-child(6) { transition-delay: 0.5s; }
        
        .tech-category:nth-child(2) { transition-delay: 0.1s; }
        .tech-category:nth-child(3) { transition-delay: 0.2s; }
        .tech-category:nth-child(4) { transition-delay: 0.3s; }
        
        .portfolio-item:nth-child(2) { transition-delay: 0.1s; }
        .portfolio-item:nth-child(3) { transition-delay: 0.2s; }
        
        .why-item:nth-child(2) { transition-delay: 0.1s; }
        .why-item:nth-child(3) { transition-delay: 0.2s; }
        .why-item:nth-child(4) { transition-delay: 0.3s; }
        .why-item:nth-child(5) { transition-delay: 0.4s; }
        .why-item:nth-child(6) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
    
    // Counter animation for stats
    const animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = function() {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            // Start animation when element is in view
            const observer = new IntersectionObserver(function(entries) {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    };
    
    animateCounters();
    
    // Typing effect for hero (optional enhancement)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        // Add a subtle pulse effect to the gradient text
        const gradientText = document.querySelector('.gradient-text');
        if (gradientText) {
            setInterval(function() {
                gradientText.style.opacity = '0.8';
                setTimeout(function() {
                    gradientText.style.opacity = '1';
                }, 500);
            }, 3000);
        }
    }
    
    // WhatsApp floating button (if needed)
    // Can be added here if you want a persistent WhatsApp button
    
    console.log('EZ Fast Studio website loaded successfully!');
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background on scroll - DISABLED to keep transparent
// window.addEventListener('scroll', () => {
//     const navbar = document.querySelector('.navbar');
//     if (window.scrollY > 100) {
//         navbar.style.background = 'rgba(0, 0, 0, 0.95)';
//     } else {
//         navbar.style.background = 'rgba(0, 0, 0, 0.9)';
//     }
// });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.portfolio-item, .stat, .contact-form, .about-text');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#45b7d1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Portfolio item click handlers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            
            console.log('Portfolio item clicked:', title); // Debug log
            
            // Create modal for portfolio item
            showPortfolioModal(title, description);
        });
    });
});

// Portfolio modal function
function showPortfolioModal(title, description) {
    console.log('Creating modal for:', title); // Debug log
    
    // Remove existing modal
    const existingModal = document.querySelector('.portfolio-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Determine image source based on title
    let imageSource = '';
    let imageAlt = '';
    if (title === 'Akeldama') {
        imageSource = 'blood-sea.jpeg';
        imageAlt = 'Dark landscape with blood-red water';
        console.log('Setting image source for Akeldama:', imageSource);
    } else {
        imageSource = '';
        imageAlt = title;
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="${title === 'Akeldama' ? 'akeldama-title' : ''}">${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    ${imageSource ? `<img src="${imageSource}" alt="${imageAlt}" style="width: 100%; height: 100%; object-fit: cover;">` : `<div class="placeholder-image">${title}</div>`}
                </div>
                <p>${description}</p>
                <p>This is a sample portfolio item. In a real implementation, you would display actual artwork, images, or videos here.</p>
            </div>
        </div>
    `;
    
    console.log('Modal HTML created with imageSource:', imageSource);
    console.log('Modal HTML:', modal.innerHTML);
    
    // Add modal styles
    if (modal && modal.style) {
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
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
    }
    
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay && overlay.style) {
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        `;
    }
    
    const content = modal.querySelector('.modal-content');
    if (content && content.style) {
        content.style.cssText = `
            background: rgba(0, 0, 0, 0.9);
            border-radius: 15px;
            padding: 2rem;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow: hidden;
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
    }
    
    const header = modal.querySelector('.modal-header');
    if (header && header.style) {
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        `;
    }
    
    const headerTitle = header ? header.querySelector('h3') : null;
    if (headerTitle && headerTitle.style) {
        headerTitle.style.cssText = `
            color: #4ecdc4;
            margin: 0;
            font-size: 1.5rem;
        `;
    }
    
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn && closeBtn.style) {
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        `;
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('mouseenter', () => {
            if (closeBtn.style) {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            if (closeBtn.style) {
                closeBtn.style.background = 'none';
            }
        });
    }
    
    const image = modal.querySelector('.modal-image');
    if (image && image.style) {
        if (imageSource) {
            // Style for actual image
            image.style.cssText = `
                width: 100%;
                min-height: 400px;
                max-height: 600px;
                border-radius: 10px;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            // Style the actual image inside
            const actualImage = image.querySelector('img');
            if (actualImage && actualImage.style) {
                actualImage.style.cssText = `
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    border-radius: 10px;
                `;
            }
        } else {
            // Style for placeholder
            image.style.cssText = `
                height: 200px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
            `;
        }
    }
    
    const placeholderImage = image ? image.querySelector('.placeholder-image') : null;
    if (placeholderImage && placeholderImage.style) {
        placeholderImage.style.cssText = `
            color: white;
            font-weight: 600;
            font-size: 1.2rem;
        `;
    }
    
    const modalBodyP = modal.querySelector('.modal-body p');
    if (modalBodyP && modalBodyP.style) {
        modalBodyP.style.cssText = `
            color: #cccccc;
            line-height: 1.6;
            margin-bottom: 1rem;
        `;
    }
    
    // Add to page
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        if (modal && modal.style) {
            modal.style.opacity = '1';
        }
        if (content && content.style) {
            content.style.transform = 'scale(1)';
        }
        
        // Add gyroscope effect to modal title if it's Akeldama
        const modalTitle = modal.querySelector('.akeldama-title');
        if (modalTitle) {
            modalTitle.addEventListener('mousemove', (e) => {
                const rect = modalTitle.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                const deltaX = (mouseX - centerX) / (rect.width / 2);
                const deltaY = (mouseY - centerY) / (rect.height / 2);
                
                const rotateX = -deltaY * 30;
                const rotateY = deltaX * 30;
                const rotateZ = deltaX * 10;
                
                modalTitle.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    rotateZ(${rotateZ}deg)
                    scale(1.05)
                `;
                
                const glowIntensity = Math.abs(deltaX) + Math.abs(deltaY);
                modalTitle.style.textShadow = `
                    0 0 ${10 + glowIntensity * 10}px rgba(255, 0, 0, 0.8),
                    0 0 ${20 + glowIntensity * 15}px rgba(255, 0, 0, 0.6),
                    0 0 ${30 + glowIntensity * 20}px rgba(255, 0, 0, 0.4),
                    0 0 ${40 + glowIntensity * 25}px rgba(255, 0, 0, 0.2),
                    2px 2px 4px rgba(0, 0, 0, 0.8),
                    4px 4px 8px rgba(0, 0, 0, 0.6),
                    6px 6px 12px rgba(0, 0, 0, 0.4)
                `;
            });
            
            modalTitle.addEventListener('mouseleave', () => {
                modalTitle.style.transform = 'perspective(1000px) rotateX(15deg) rotateY(-5deg)';
                modalTitle.style.textShadow = `
                    0 0 10px rgba(255, 0, 0, 0.8),
                    0 0 20px rgba(255, 0, 0, 0.6),
                    0 0 30px rgba(255, 0, 0, 0.4),
                    0 0 40px rgba(255, 0, 0, 0.2),
                    2px 2px 4px rgba(0, 0, 0, 0.8),
                    4px 4px 8px rgba(0, 0, 0, 0.6),
                    6px 6px 12px rgba(0, 0, 0, 0.4)
                `;
            });
        }
    }, 100);
    
    // Close functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Scroll percentage tracking for animations
window.addEventListener('scroll', () => {
    const scrollHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercentage = scrollHeight > 0 ? window.pageYOffset / scrollHeight : 0;
    const clampedPercentage = Math.max(0, Math.min(1, scrollPercentage)); // Clamp between 0 and 1
    
    document.documentElement.style.setProperty('--scroll', clampedPercentage);
    console.log('Scroll percentage:', clampedPercentage); // Debug log
    
    // Direct rotation of cross images
    const crosses = document.querySelectorAll('.corner-cross img');
    const rotation = clampedPercentage * 360;
    crosses.forEach(cross => {
        if (cross && cross.style) {
            cross.style.transform = `rotate(${rotation}deg)`;
        }
    });
    
    // Parallax effect for background
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('body');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.backgroundPosition = `0px ${speed}px`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Clear the text first
        heroTitle.innerHTML = '';
        // Start typing effect after a short delay
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 200);
        }, 1000);
    }
    
    // Initialize scroll value
    const scrollHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercentage = scrollHeight > 0 ? window.pageYOffset / scrollHeight : 0;
    const clampedPercentage = Math.max(0, Math.min(1, scrollPercentage));
    document.documentElement.style.setProperty('--scroll', clampedPercentage);
    console.log('Initial scroll percentage:', clampedPercentage);
    
    // Gyroscope effect for Akeldama title
    const akeldamaTitle = document.querySelector('.akeldama-title');
    
    if (akeldamaTitle) {
        akeldamaTitle.addEventListener('mousemove', (e) => {
            const rect = akeldamaTitle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const deltaX = (mouseX - centerX) / (rect.width / 2);
            const deltaY = (mouseY - centerY) / (rect.height / 2);
            
            const rotateX = -deltaY * 30; // Tilt up/down
            const rotateY = deltaX * 30;  // Tilt left/right
            const rotateZ = deltaX * 10;  // Slight twist
            
            akeldamaTitle.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                rotateZ(${rotateZ}deg)
                scale(1.05)
            `;
            
            // Enhanced glow based on mouse position
            const glowIntensity = Math.abs(deltaX) + Math.abs(deltaY);
            akeldamaTitle.style.textShadow = `
                0 0 ${10 + glowIntensity * 10}px rgba(255, 0, 0, 0.8),
                0 0 ${20 + glowIntensity * 15}px rgba(255, 0, 0, 0.6),
                0 0 ${30 + glowIntensity * 20}px rgba(255, 0, 0, 0.4),
                0 0 ${40 + glowIntensity * 25}px rgba(255, 0, 0, 0.2),
                2px 2px 4px rgba(0, 0, 0, 0.8),
                4px 4px 8px rgba(0, 0, 0, 0.6),
                6px 6px 12px rgba(0, 0, 0, 0.4)
            `;
        });
        
        // Reset when mouse leaves
        akeldamaTitle.addEventListener('mouseleave', () => {
            akeldamaTitle.style.transform = 'perspective(1000px) rotateX(15deg) rotateY(-5deg)';
            akeldamaTitle.style.textShadow = `
                0 0 10px rgba(255, 0, 0, 0.8),
                0 0 20px rgba(255, 0, 0, 0.6),
                0 0 30px rgba(255, 0, 0, 0.4),
                0 0 40px rgba(255, 0, 0, 0.2),
                2px 2px 4px rgba(0, 0, 0, 0.8),
                4px 4px 8px rgba(0, 0, 0, 0.6),
                6px 6px 12px rgba(0, 0, 0, 0.4)
            `;
        });
    }
}); 
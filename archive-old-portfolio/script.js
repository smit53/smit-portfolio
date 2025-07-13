// Initialize all libraries and features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize 3D background
    init3DBackground();
    
    // Initialize particle system
    initParticles();
    
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize cursor follower
    initCursorFollower();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize form handling
    initFormHandling();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// 3D Background with Three.js
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00d4ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add multiple meshes
    for (let i = 0; i < 50; i++) {
        const clone = mesh.clone();
        clone.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        clone.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        clone.scale.setScalar(Math.random() * 0.5 + 0.5);
        scene.add(clone);
    }
    
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        scene.children.forEach((child, index) => {
            child.rotation.x += 0.001 * (index + 1);
            child.rotation.y += 0.001 * (index + 1);
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Particle System
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00d4ff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00d4ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// GSAP Animations
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    
    // Hero section animations
    gsap.from('.hero-title .title-line', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-stats', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 1.2,
        ease: 'power3.out'
    });
    
    // Floating elements animation
    gsap.to('.floating-elements .element', {
        y: -20,
        rotation: 360,
        duration: 6,
        ease: 'power2.inOut',
        stagger: 1,
        repeat: -1,
        yoyo: true
    });
    
    // Geometric shapes rotation
    gsap.to('.geometric-shapes .shape', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
    });
    
    // Section reveal animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Skill tags animation
    gsap.from('.skill-tag', {
        scrollTrigger: {
            trigger: '.skills-showcase',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Timeline items animation
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%'
        },
        x: (i) => i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });
    
    // Project cards animation
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Skill tags interaction
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        tag.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Project cards interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.btn-icon'), {
                x: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.btn-icon'), {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Navigation
function initNavigation() {
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
        });
    });

// Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
        e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
            });
        }
    });
});

    // Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
    } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements .element');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Reveal animations on scroll
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

    // Observe elements for reveal animation
    const revealElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
}

// Cursor Follower
function initCursorFollower() {
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursorFollower || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animateCursor() {
        // Smooth following effect
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        // Faster dot movement
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        
        // Apply transforms
        cursorFollower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
        cursorDot.style.transform = `translate(${dotX - 2}px, ${dotY - 2}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform += ' scale(2)';
            cursorFollower.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(2)', '');
            cursorFollower.style.opacity = '0.5';
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (you can integrate with your backend here)
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
            
            // Reset form labels
            const labels = this.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.left = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-secondary)';
            });
        });
    }
    
    // Form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            const line = this.parentElement.querySelector('.form-line');
            
            gsap.to(label, {
                top: '-0.5rem',
                left: '0',
                fontSize: '0.8rem',
                color: 'var(--primary-color)',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(line, {
                width: '100%',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        field.addEventListener('blur', function() {
            const label = this.nextElementSibling;
            const line = this.parentElement.querySelector('.form-line');
            
            if (!this.value) {
                gsap.to(label, {
                    top: '1rem',
                    left: '1rem',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(line, {
                    width: '0%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Performance optimization
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate dimensions and positions
}, 250));

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadResources(); 
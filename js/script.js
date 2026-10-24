/**
 * Chandan Tiwari - Personal Portfolio Website
 * Main JavaScript File
 * 
 * Features:
 * - Theme toggle (dark/light) with localStorage persistence
 * - Mobile navigation menu
 * - Smooth scroll navigation
 * - Scroll animations
 * - Counter animation for stats
 * - Contact form validation with mailto submission
 * - Current year update
 * - Resume download handling
 * - Profile image fallback
 */

// ==========================================================================
// Global Configuration & Constants
// ==========================================================================
const CONFIG = {
    themeKey: 'portfolio-theme',
    animationDelay: 100,
    counterDuration: 2000,
    scrollOffset: 80
};

// ==========================================================================
// Utility Functions
// ==========================================================================

/**
 * Debounce function to limit rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Throttle function to limit rate of function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight * (1 - threshold)) && 
                       (rect.bottom >= windowHeight * threshold);
    const horInView = (rect.left <= windowWidth * (1 - threshold)) && 
                      (rect.right >= windowWidth * threshold);
    
    return vertInView && horInView;
}

/**
 * Smooth scroll to element
 * @param {string} targetId - Target element ID
 * @param {number} offset - Offset from top
 */
function smoothScrollTo(targetId, offset = CONFIG.scrollOffset) {
    const target = document.getElementById(targetId);
    if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ==========================================================================
// Theme Management Module
// ==========================================================================
const ThemeManager = (function() {
    let currentTheme = 'dark'; // Default to dark
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    /**
     * Initialize theme from localStorage or system preference
     */
    function init() {
        // Check localStorage first
        const savedTheme = localStorage.getItem(CONFIG.themeKey);
        
        if (savedTheme) {
            currentTheme = savedTheme;
        } else {
            // Default to dark theme as per design requirements
            currentTheme = 'dark';
        }
        
        applyTheme(currentTheme);
        
        // Listen for system theme changes (only if no user preference saved)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(CONFIG.themeKey)) {
                currentTheme = e.matches ? 'dark' : 'light';
                applyTheme(currentTheme);
            }
        });
    }

    /**
     * Apply theme to document
     * @param {string} theme - 'light' or 'dark'
     */
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        currentTheme = theme;
        localStorage.setItem(CONFIG.themeKey, theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0d061a' : '#faf8fc');
        }
    }

    /**
     * Toggle between light and dark theme
     */
    function toggle() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }

    /**
     * Get current theme
     * @returns {string} Current theme
     */
    function getTheme() {
        return currentTheme;
    }

    // Event listener for theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggle);
        
        // Keyboard support
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    }

    // Public API
    return {
        init,
        toggle,
        getTheme,
        applyTheme
    };
})();

// ==========================================================================
// Navigation Module
// ==========================================================================
const Navigation = (function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    /**
     * Initialize navigation
     */
    function init() {
        setupMobileMenu();
        setupSmoothScroll();
        setupScrollSpy();
        setupNavbarScroll();
    }

    /**
     * Setup mobile menu toggle
     */
    function setupMobileMenu() {
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }

    /**
     * Setup smooth scroll for navigation links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').slice(1);
                if (targetId) {
                    e.preventDefault();
                    smoothScrollTo(targetId);
                    
                    // Update active link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }

    /**
     * Setup scroll spy for active navigation link
     */
    function setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    /**
     * Setup navbar scroll effect
     */
    function setupNavbarScroll() {
        if (!navbar) return;

        const handleScroll = throttle(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return { init };
})();

// ==========================================================================
// Animation Module
// ==========================================================================
const AnimationManager = (function() {
    const animatedElements = new Set();
    let observer = null;

    /**
     * Initialize scroll animations
     */
    function init() {
        setupIntersectionObserver();
        animateCounters();
    }

    /**
     * Setup IntersectionObserver for scroll animations
     */
    function setupIntersectionObserver() {
        const elements = document.querySelectorAll(
            '.skill-category, .project-card, .cert-card, .education-card, .stat-card, .contact-item, .resume-action, .coding-card'
        );

        const observerOptions = {
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        animatedElements.add(entry.target);
                    }, index * CONFIG.animationDelay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Set initial state and observe
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            observer.observe(el);
        });
    }

    /**
     * Animate counter numbers
     */
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target], .coding-stat-value[data-target]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    const format = counter.getAttribute('data-format') || 'locale';
                    animateCounter(counter, target, format);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    /**
     * Animate a single counter
     * @param {Element} element - Counter element
     * @param {number} target - Target number
     * @param {string} format - 'locale' or 'plain'
     */
    function animateCounter(element, target, format = 'locale') {
        const duration = CONFIG.counterDuration;
        const start = 0;
        const startTime = performance.now();

        function formatNumber(num) {
            return format === 'plain' ? String(num) : num.toLocaleString();
        }

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easedProgress * target);
            
            element.textContent = formatNumber(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = formatNumber(target);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    return { init };
})();

// ==========================================================================
// Contact Form Module (mailto-based)
// ==========================================================================
const ContactForm = (function() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
    const MAILTO_EMAIL = 'chandan05010@gmail.com';

    // Validation rules
    const validators = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Please enter a valid name (2-50 characters, letters only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 100,
            message: 'Subject must be between 5 and 100 characters'
        },
        message: {
            required: true,
            minLength: 20,
            maxLength: 2000,
            message: 'Message must be between 20 and 2000 characters'
        }
    };

    /**
     * Initialize contact form
     */
    function init() {
        if (!form) return;

        setupValidation();
        setupSubmission();
    }

    /**
     * Setup real-time validation
     */
    function setupValidation() {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', () => validateField(input));
            
            // Clear error on input
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }

    /**
     * Validate a single field
     * @param {HTMLInputElement|HTMLTextAreaElement} field - Form field
     * @returns {boolean} True if valid
     */
    function validateField(field) {
        const name = field.name;
        const value = field.value.trim();
        const rules = validators[name];
        const errorElement = document.getElementById(`${name}-error`);

        if (!rules) return true;

        let isValid = true;
        let errorMessage = '';

        // Required check
        if (rules.required && !value) {
            isValid = false;
            errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        // Min length
        else if (rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.message;
        }
        // Max length
        else if (rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = rules.message;
        }
        // Pattern
        else if (rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }

        // Update UI
        field.classList.toggle('error', !isValid);
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    /**
     * Validate all fields
     * @returns {boolean} True if all valid
     */
    function validateForm() {
        const fields = form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Setup form submission via mailto
     */
    function setupSubmission() {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!validateForm()) {
                showStatus('Please fix the errors above before sending.', 'error');
                // Focus first error field
                const firstError = form.querySelector('.error');
                if (firstError) firstError.focus();
                return;
            }

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1" stroke-linecap="round"/></svg> Opening email...';

            // Construct mailto URL
            const formData = new FormData(form);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();

            const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`);
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            const mailtoUrl = `mailto:${MAILTO_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

            // Open mailto link
            window.location.href = mailtoUrl;

            // Show success message
            showStatus(
                'Your email application should open now. If it doesn\'t, please email me directly at chandan05010@gmail.com',
                'success'
            );

            // Reset form
            form.reset();

            // Re-enable button
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }, 2000);
        });
    }

    /**
     * Show form status message
     * @param {string} message - Status message
     * @param {string} type - 'success' or 'error'
     */
    function showStatus(message, type) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    return { init };
})();

// ==========================================================================
// Resume Download Module
// ==========================================================================
const ResumeDownload = (function() {
    const downloadBtn = document.getElementById('resume-download');
    const resumeNote = document.getElementById('resume-note');
    const resumePath = 'resume/Chandan_Tiwari_Resume.pdf';

    /**
     * Initialize resume download handling
     */
    function init() {
        if (!downloadBtn) return;

        // Check if resume file exists
        checkResumeExists();

        // Handle download click - the download attribute handles the actual download
        downloadBtn.addEventListener('click', handleDownload);
    }

    /**
     * Check if resume file exists using fetch HEAD request
     */
    function checkResumeExists() {
        fetch(resumePath, { method: 'HEAD', cache: 'no-cache' })
            .then(response => {
                if (!response.ok) {
                    showMissingMessage();
                } else {
                    showAvailableMessage();
                }
            })
            .catch(() => {
                showMissingMessage();
            });
    }

    /**
     * Show message when resume is available
     */
    function showAvailableMessage() {
        if (resumeNote) {
            resumeNote.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;margin-right:6px;vertical-align:middle"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Resume PDF is available and ready to download.
            `;
            resumeNote.style.color = 'var(--color-success)';
        }
        
        if (downloadBtn) {
            downloadBtn.style.opacity = '1';
            downloadBtn.style.pointerEvents = 'auto';
            downloadBtn.title = 'Download Resume PDF';
        }
    }

    /**
     * Show message when resume is missing
     */
    function showMissingMessage() {
        if (resumeNote) {
            resumeNote.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;margin-right:6px;vertical-align:middle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <strong>Resume not found:</strong> Please add your resume PDF as 
                <code>${resumePath}</code> to enable the download button.
            `;
            resumeNote.style.color = 'var(--color-text-muted)';
        }
        
        if (downloadBtn) {
            downloadBtn.style.opacity = '0.5';
            downloadBtn.style.pointerEvents = 'none';
            downloadBtn.title = 'Resume file not found. Add resume to resume/Chandan_Tiwari_Resume.pdf';
        }
    }

    /**
     * Handle download click
     * @param {Event} e - Click event
     */
    function handleDownload(e) {
        // The download attribute handles the actual download
        // This is just for any additional handling if needed
        console.log('Resume download initiated');
    }

    return { init };
})();

// ==========================================================================
// Profile Image Handler
// ==========================================================================
const ProfileImage = (function() {
    const profileImg = document.getElementById('profile-image');
    const placeholderSrc = 'assets/profile-placeholder.svg';

    /**
     * Initialize profile image handling
     */
    function init() {
        if (!profileImg) return;

        // Check if the profile image exists
        checkImageExists();
    }

    /**
     * Check if profile image exists
     */
    function checkImageExists() {
        // Create a test image to check if the file exists
        const testImg = new Image();
        
        testImg.onload = () => {
            // Image exists, keep it
            console.log('Profile image loaded successfully');
        };
        
        testImg.onerror = () => {
            // Image doesn't exist, use placeholder
            console.log('Profile image not found, using placeholder');
            profileImg.src = placeholderSrc;
            profileImg.alt = 'Profile placeholder - CT initials';
        };
        
        testImg.src = profileImg.src;
    }

    return { init };
})();

// ==========================================================================
// Current Year Update
// ==========================================================================
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    const graduationYearElement = document.getElementById('graduation-year');
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Also update graduation year if it's a placeholder
    if (graduationYearElement && graduationYearElement.textContent === '2029') {
        // Keep as is since user specified 2029
    }
}

// ==========================================================================
// Hero Section Animations
// ==========================================================================
const HeroAnimations = (function() {
    /**
     * Initialize hero section entrance animations
     */
    function init() {
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-text > *');
        
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + index * 150);
        });

        // Animate profile image
        const profileWrapper = document.querySelector('.profile-wrapper');
        if (profileWrapper) {
            profileWrapper.style.opacity = '0';
            profileWrapper.style.transform = 'scale(0.9)';
            profileWrapper.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                profileWrapper.style.opacity = '1';
                profileWrapper.style.transform = 'scale(1)';
            }, 500);
        }
    }

    return { init };
})();

// ==========================================================================
// Initialize All Modules
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    ThemeManager.init();
    Navigation.init();
    AnimationManager.init();
    ContactForm.init();
    ResumeDownload.init();
    ProfileImage.init();
    updateCurrentYear();
    HeroAnimations.init();

    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');

    console.log('Portfolio website initialized successfully!');
});

// ==========================================================================
// Export for testing (if needed)
// ==========================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        Navigation,
        AnimationManager,
        ContactForm,
        ResumeDownload,
        ProfileImage,
        debounce,
        throttle,
        isInViewport,
        smoothScrollTo
    };
}
/**
 * Main JavaScript for TCA-Infra Construction Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Smooth Scrolling for Anchor Links
    initSmoothScroll();
    
    // Initialize Animation on Scroll
    initScrollAnimations();
    
    // Initialize Form Validation
    initFormValidation();
    
    // Initialize FAQ Accordions
    initFaqAccordions();
});

/**
 * Initialize Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = mobileMenuButton.contains(event.target) || mobileMenu.contains(event.target);
            
            if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

/**
 * Initialize Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to target with offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Animation on Scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    if (animatedElements.length > 0) {
        // Initial check for elements in viewport
        checkElementsInViewport();
        
        // Check on scroll
        window.addEventListener('scroll', checkElementsInViewport);
        
        function checkElementsInViewport() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }
    }
}

/**
 * Initialize Form Validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Reset validation messages
            form.querySelectorAll('.validation-message').forEach(message => {
                message.remove();
            });
            
            // Check required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showValidationMessage(field, 'This field is required');
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    isValid = false;
                    showValidationMessage(field, 'Please enter a valid email address');
                }
            });
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would submit the form data to a server here
                showFormSuccess(form);
            }
        });
    });
    
    function showValidationMessage(field, message) {
        const validationMessage = document.createElement('p');
        validationMessage.className = 'validation-message text-red-500 text-sm mt-1';
        validationMessage.textContent = message;
        
        field.classList.add('border-red-500');
        field.parentNode.appendChild(validationMessage);
        
        field.addEventListener('input', function() {
            field.classList.remove('border-red-500');
            const message = field.parentNode.querySelector('.validation-message');
            if (message) {
                message.remove();
            }
        }, { once: true });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormSuccess(form) {
        // Hide the form
        form.style.display = 'none';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4';
        successMessage.innerHTML = `
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline">Your message has been sent successfully. We'll get back to you soon.</span>
        `;
        
        // Insert success message after the form
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        // Reset form after 5 seconds and show it again
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.remove();
        }, 5000);
    }
}

/**
 * Initialize FAQ Accordions
 */
function initFaqAccordions() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Toggle answer visibility
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.classList.add('hidden');
            } else {
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Utility function to format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Utility function to format date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
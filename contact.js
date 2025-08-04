/**
 * Contact Form JavaScript for TCA-Infra Construction Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Contact Form
    initContactForm();
    
    // Initialize FAQ Accordions
    initFaqAccordions();
    
    // Initialize Map (if available)
    initMap();
});

/**
 * Initialize Contact Form Validation and Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const phoneField = document.getElementById('phone');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Reset previous error messages
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.textContent = '');
            
            // Validate fields
            let isValid = true;
            
            // Name validation
            if (!nameField.value.trim()) {
                showError(nameField, 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            if (!validateEmail(emailField.value.trim())) {
                showError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation (optional)
            if (phoneField.value.trim() && !validatePhone(phoneField.value.trim())) {
                showError(phoneField, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Subject validation
            if (!subjectField.value.trim()) {
                showError(subjectField, 'Please enter a subject');
                isValid = false;
            }
            
            // Message validation
            if (!messageField.value.trim()) {
                showError(messageField, 'Please enter your message');
                isValid = false;
            } else if (messageField.value.trim().length < 10) {
                showError(messageField, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this demo, we'll simulate a successful submission
                
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
                
                // Simulate server request
                setTimeout(function() {
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    
                    // Show success message
                    showFormMessage('success', 'Your message has been sent successfully! We\'ll get back to you soon.');
                }, 1500);
            }
        });
        
        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                const errorElement = this.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = '';
                }
            });
        });
    }
    
    // Helper function to show error message
    function showError(field, message) {
        // Find or create error message element
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('p');
            errorElement.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        // Set error message
        errorElement.textContent = message;
        
        // Highlight field
        field.classList.add('border-red-500');
        field.classList.remove('border-gray-300');
        
        // Add event listener to remove highlight when focused
        field.addEventListener('focus', function onFocus() {
            field.classList.remove('border-red-500');
            field.classList.add('border-yellow-500');
            field.removeEventListener('focus', onFocus);
        });
    }
    
    // Helper function to show form message
    function showFormMessage(type, message) {
        // Find or create message element
        let messageElement = document.getElementById('form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'form-message';
            messageElement.classList.add('mt-4', 'p-4', 'rounded');
            contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
        }
        
        // Set message type and content
        if (type === 'success') {
            messageElement.classList.add('bg-green-100', 'text-green-700');
            messageElement.classList.remove('bg-red-100', 'text-red-700');
        } else {
            messageElement.classList.add('bg-red-100', 'text-red-700');
            messageElement.classList.remove('bg-green-100', 'text-green-700');
        }
        
        messageElement.textContent = message;
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide message after 5 seconds
        setTimeout(function() {
            messageElement.style.opacity = '0';
            messageElement.style.transition = 'opacity 0.5s ease';
            setTimeout(function() {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Phone validation helper
    function validatePhone(phone) {
        // Basic phone validation - allows different formats
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
}

/**
 * Initialize FAQ Accordions
 */
function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            const content = item.querySelector('.faq-content');
            
            // Set initial state
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
            
            header.addEventListener('click', function() {
                // Toggle active class
                this.classList.toggle('active');
                
                // Toggle icon
                const icon = this.querySelector('svg');
                if (this.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    icon.style.transform = 'rotate(0)';
                    content.style.maxHeight = '0';
                }
            });
            
            // Set transition for icon
            const icon = header.querySelector('svg');
            icon.style.transition = 'transform 0.3s ease';
        });
        
        // Open first FAQ item by default
        if (faqItems.length > 0) {
            const firstHeader = faqItems[0].querySelector('.faq-header');
            const firstContent = faqItems[0].querySelector('.faq-content');
            const firstIcon = firstHeader.querySelector('svg');
            
            firstHeader.classList.add('active');
            firstIcon.style.transform = 'rotate(180deg)';
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        }
    }
}

/**
 * Initialize Map
 */
function initMap() {
    const mapContainer = document.getElementById('location-map');
    
    if (mapContainer) {
        // In a real application, you would initialize a map service like Google Maps or Leaflet
        // For this demo, we'll just add a placeholder message
        
        mapContainer.innerHTML = `
            <div class="bg-gray-100 p-6 rounded-lg text-center">
                <svg class="w-12 h-12 mx-auto mb-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <p class="text-gray-700 mb-2">Interactive Map</p>
                <p class="text-sm text-gray-500">In a live website, an interactive map would be displayed here using Google Maps or another mapping service.</p>
            </div>
        `;
    }
}
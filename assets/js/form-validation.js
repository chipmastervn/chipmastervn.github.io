/**
 * Form Validation and Feedback
 * Handles real-time validation, error messages, and loading states
 * @version 2.0
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        AUTO_DISMISS_DELAY: 5000,
        FADE_OUT_DELAY: 150
    };
    
    // Email validation regex
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    /**
     * Initialize form handlers on DOM ready
     */
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initContactForm();
            initNewsletterForms();
            initFieldValidation();
            checkUrlParams();
        } catch (error) {
            console.error('Form initialization error:', error);
        }
    });
    
    /**
     * Contact form submit handler
     */
    function initContactForm() {
        const contactForm = document.querySelector('form[action*="formspree"]');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            try {
                const submitBtn = this.querySelector('input[type="submit"], button[type="submit"]');
                if (!submitBtn) return;
                
                submitBtn.disabled = true;
                const originalValue = submitBtn.value || submitBtn.textContent;
                submitBtn.value = originalValue === 'Gửi' ? 'Đang gửi...' : 'Submitting...';
                
                // Re-enable after timeout as fallback
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.value = originalValue;
                }, 10000);
            } catch (error) {
                console.error('Contact form submit error:', error);
            }
        });
    }
    
    /**
     * Newsletter forms submit handler
     */
    function initNewsletterForms() {
        const newsletterForms = document.querySelectorAll('form[name="mc-embedded-subscribe-form"]');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                try {
                    const submitBtn = this.querySelector('button[type="submit"]');
                    if (!submitBtn) return;
                    
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...';
                    
                    // Re-enable after timeout as fallback
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Subscribe';
                    }, 10000);
                } catch (error) {
                    console.error('Newsletter form submit error:', error);
                }
            });
        });
    }
    
    /**
     * Real-time field validation
     */
    function initFieldValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
            
            requiredInputs.forEach(input => {
                // Validate on blur
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                // Re-validate on input if previously invalid
                input.addEventListener('input', function() {
                    if (this.classList.contains('is-invalid')) {
                        validateField(this);
                    }
                });
            });
        });
    }
    
    /**
     * Validate single field
     * @param {HTMLElement} field - The input field to validate
     * @returns {boolean} - Validation result
     */
    function validateField(field) {
        try {
            const value = field.value.trim();
            const type = field.type;
            
            // Remove previous feedback
            removeFeedback(field);
            
            // Validation logic
            let isValid = true;
            let message = '';
            
            if (!value && field.hasAttribute('required')) {
                isValid = false;
                message = 'Trường này là bắt buộc.';
            } else if (type === 'email' && value) {
                if (!EMAIL_REGEX.test(value)) {
                    isValid = false;
                    message = 'Vui lòng nhập địa chỉ email hợp lệ.';
                }
            } else if (type === 'text' && value && field.hasAttribute('minlength')) {
                const minLength = parseInt(field.getAttribute('minlength'));
                if (value.length < minLength) {
                    isValid = false;
                    message = `Vui lòng nhập ít nhất ${minLength} ký tự.`;
                }
            }
            
            // Apply feedback
            if (!isValid) {
                field.classList.add('is-invalid');
                addFeedback(field, message, 'invalid');
            } else if (value) {
                field.classList.add('is-valid');
            }
            
            return isValid;
        } catch (error) {
            console.error('Field validation error:', error);
            return false;
        }
    }
    
    /**
     * Add validation feedback
     * @param {HTMLElement} field - Input field
     * @param {string} message - Feedback message
     * @param {string} type - Feedback type (invalid/valid)
     */
    function addFeedback(field, message, type) {
        const feedback = document.createElement('div');
        feedback.className = `${type}-feedback d-block`;
        feedback.textContent = message;
        field.parentElement.appendChild(feedback);
    }
    
    /**
     * Remove validation feedback
     * @param {HTMLElement} field - Input field
     */
    function removeFeedback(field) {
        const existingFeedback = field.parentElement.querySelector('.invalid-feedback, .valid-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        field.classList.remove('is-invalid', 'is-valid');
    }
    
    /**
     * Check URL parameters for success message
     */
    function checkUrlParams() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('success')) {
                showMessage('Cảm ơn bạn! Chúng tôi sẽ liên lạc sớm.', 'success');
            }
        } catch (error) {
            console.error('URL params check error:', error);
        }
    }
    
    /**
     * Show alert message
     * @param {string} message - Message to display
     * @param {string} type - Alert type (success, info, warning, danger)
     */
    function showMessage(message, type = 'info') {
        try {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} alert-dismissible fade show fixed-top m-3`;
            alertDiv.style.zIndex = '9999';
            alertDiv.setAttribute('role', 'alert');
            alertDiv.innerHTML = `
                ${escapeHtml(message)}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            `;
            
            document.body.insertBefore(alertDiv, document.body.firstChild);
            
            // Auto dismiss
            setTimeout(() => {
                alertDiv.classList.remove('show');
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.remove();
                    }
                }, CONFIG.FADE_OUT_DELAY);
            }, CONFIG.AUTO_DISMISS_DELAY);
        } catch (error) {
            console.error('Show message error:', error);
        }
    }
    
    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Export for potential external use
    window.FormValidator = {
        validateField: validateField,
        showMessage: showMessage
    };
    
})();

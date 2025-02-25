/**
 * @fileoverview Form validation class handling input validation and error display
 */

/**
 * Handles form validation including input validation and error message display
 * @class
 */
export class FormValidation {
    /**
     * Creates an instance of FormValidation
     * @param {Object} model - The model instance to validate against
     * @constructor
     */
    constructor(model) {
        /**
         * Reference to the model instance
         * @type {Object}
         * @private 
         */
        this.model = model;

        /**
         * Reference to the view instance
         * @type {Object|null}
         * @private
         */
        this.view = null;

        /**
         * Error messages for different validation scenarios
         * @type {Object.<string, {empty: string, invalid: string}>}
         * @private
         */
        this.errorMessages = {
            firstName: {
                empty: 'First Name is required',
                invalid: 'First Name cannot contain numbers'
            },
            lastName: {
                empty: 'Last Name is required',
                invalid: 'Last Name cannot contain numbers'
            },
            email: {
                empty: 'Email is required',
                invalid: 'Please enter a valid email address'
            },
            phoneNumber: {
                empty: 'Phone Number is required',
                invalid: 'Please enter a valid 10-digit phone number'
            },
            cardNumber: {
                empty: 'Card Number is required',
                invalid: 'Please enter a valid 16-digit card number'
            }
        };
    }

    /**
     * Sets the view instance for the validator
     * @param {Object} view - The view instance to be set
     * @returns {void}
     */
    setView(view) {
        this.view = view;
    }

    /**
     * Validates email format
     * @param {string} email - Email address to validate
     * @returns {boolean} True if email is valid
     */
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Validates credit card number format
     * @param {string} number - Card number to validate
     * @returns {boolean} True if card number is valid
     */
    validateCardNumber(number) {
        const cleaned = number.replace(/\s/g, '');
        return /^\d{16}$/.test(cleaned);
    }

    /**
     * Validates phone number format
     * @param {string} number - Phone number to validate
     * @returns {boolean} True if phone number is valid
     */
    validatePhoneNumber(number) {
        const cleaned = number.replace(/[^\d]/g, '');
        return /^\d{10}$/.test(cleaned);
    }

    /**
     * Validates name format
     * @param {string} name - Name to validate
     * @returns {boolean} True if name is valid
     */
    validateName(name) {
        return /^[A-Za-z\s-']+$/.test(name) && name.trim() !== '';
    }

    /**
     * Displays error message for an input
     * @param {HTMLInputElement} input - Input element to show error for
     * @param {string} message - Error message to display
     * @returns {void}
     */
    displayError(input, message) {
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
       
        input.style.borderColor = '#ff0000';
        input.insertAdjacentElement('afterend', errorDiv);
    }

    /**
     * Clears error message for an input
     * @param {HTMLInputElement} input - Input element to clear error for
     * @returns {void}
     */
    clearError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
        input.style.borderColor = '#444';
    }

    /**
     * Validates a single input field
     * @param {HTMLInputElement} input - Input element to validate
     * @returns {boolean} True if input is valid
     */
    validateInput(input) {
        let isValid = true;
        let errorMessage = '';
        this.clearError(input);

        if (input.value.trim() === '') {
            isValid = false;
            errorMessage = this.errorMessages[input.name].empty;
        } else {
            switch(input.name) {
                case 'firstName':
                case 'lastName':
                    if (!this.validateName(input.value)) {
                        isValid = false;
                        errorMessage = this.errorMessages[input.name].invalid;
                    }
                    break;
                case 'email':
                    if (!this.validateEmail(input.value)) {
                        isValid = false;
                        errorMessage = this.errorMessages[input.name].invalid;
                    }
                    break;
                case 'cardNumber':
                    if (!this.validateCardNumber(input.value)) {
                        isValid = false;
                        errorMessage = this.errorMessages[input.name].invalid;
                    }
                    break;
                case 'phoneNumber':
                    if (!this.validatePhoneNumber(input.value)) {
                        isValid = false;
                        errorMessage = this.errorMessages[input.name].invalid;
                    }
                    break;
            }
        }

        if (!isValid) {
            this.displayError(input, errorMessage);
        }
        return isValid;
    }

    /**
     * Validates all form inputs
     * @param {NodeList<HTMLInputElement>} inputs - Collection of input elements to validate
     * @returns {boolean} True if all inputs are valid
     */
    validateForm(inputs) {
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        return isValid;
    }
}
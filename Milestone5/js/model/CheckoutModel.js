/**
 * @fileoverview Model class for handling checkout data and form validation
 */

import { FormValidation } from '../validation/FormValidation.js';

/**
 * Manages checkout form data, validation, and storage
 * @class
 */
export class CheckoutModel {
    /**
     * Creates an instance of CheckoutModel and initializes form data
     * @constructor
     */
    constructor() {
        /**
         * Form validation instance
         * @type {FormValidation}
         * @private
         */
        this.validation = new FormValidation(this);

        /**
         * User's first name
         * @type {string}
         */
        this.firstName = "";

        /**
         * User's last name
         * @type {string}
         */
        this.lastName = "";

        /**
         * User's email address
         * @type {string}
         */
        this.email = "";

        /**
         * User's phone number
         * @type {string}
         */
        this.phoneNumber = "";

        /**
         * User's card number
         * @type {string}
         */
        this.cardNumber = "";

        /**
         * Selected warmup exercise
         * @type {string}
         */
        this.warmup = "";

        /**
         * Selected cardio exercise
         * @type {string}
         */
        this.cardio = "";

        /**
         * Selected recovery exercise
         * @type {string}
         */
        this.recovery = "";

        this.init();
    }
   
    /**
     * Initializes model data from localStorage
     * @private
     * @returns {void}
     */
    init() {
        const cardio = JSON.parse(localStorage.getItem('cardio'));
        if (cardio) {
            for (let property in cardio) {
                this[property] = cardio[property];
            }
        }
    }
 
    /**
     * Gets all input data excluding validation instance
     * @returns {Object} Object containing all form data
     */
    getInputData() {
        const { validation, ...data } = this;
        return data;
    }
 
    /**
     * Stores current model state in localStorage
     * @returns {void}
     */
    store() {
        
        localStorage.setItem('cardio', JSON.stringify(this.getInputData()));
    }

    /**
     * Handles input change events and validates input
     * @param {HTMLInputElement} input - The input element that changed
     * @returns {boolean} True if input is valid and was stored successfully
     */
    handleInputChange(input) {
        if (this.validation.validateInput(input)) {
            this[input.name] = input.value;
            this.store();
            return true;
        }
        return false;
    }
}
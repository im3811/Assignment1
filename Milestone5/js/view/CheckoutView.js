/**
 * @fileoverview View class for handling the checkout page interface and form elements
 */

/**
 * Represents the checkout view handling form creation and preview elements
 * @class
 */
export class CheckoutView {
    /**
     * Creates an instance of CheckoutView and initializes form elements and previews
     * @constructor
     */
    constructor() {
        /**
         * Array to store input elements
         * @type {Array<HTMLInputElement>}
         * @private
         */
        this.inputs = [];

        /**
         * Main checkout form element
         * @type {HTMLFormElement}
         * @private
         */
        this.form = document.querySelector("#form-checkout");

        /**
         * Warmup preview image element
         * @type {HTMLImageElement}
         * @private
         */
        this.warmup = document.querySelector("#warmup");

        /**
         * Cardio preview image element
         * @type {HTMLImageElement}
         * @private
         */
        this.cardio = document.querySelector("#cardio");

        /**
         * Recovery preview image element
         * @type {HTMLImageElement}
         * @private
         */
        this.recovery = document.querySelector("#recovery");

        /**
         * Object containing references to all preview elements
         * @type {Object.<string, HTMLImageElement>}
         * @private
         */
        this.previews = {
            warmup: this.warmup,
            cardio: this.cardio,
            recovery: this.recovery
        };
    }
 
    /**
     * Creates input fields and preview elements based on provided data
     * @param {Object} data - The data object containing form field values
     * @param {string} [data.firstName] - User's first name
     * @param {string} [data.lastName] - User's last name
     * @param {string} [data.phoneNumber] - User's phone number
     * @param {string} [data.cardNumber] - User's card number
     * @param {string} [data.warmup] - Selected warmup exercise
     * @param {string} [data.cardio] - Selected cardio exercise
     * @param {string} [data.recovery] - Selected recovery exercise
     * @returns {void}
     */
    createInputs(data) {
        for (let property in data) {
            // Extract display value from exercise names (remove prefix)
            let displayValue = data[property];
            if (displayValue.includes('-')) {
                displayValue = displayValue.split('-').pop();
            }
           
            // Determine if field is a workout selection
            const isWorkoutField = ['warmup', 'cardio', 'recovery'].includes(property);
            const readOnlyAttr = isWorkoutField ? 'readonly' : '';
           
            // Create input field with label
            this.form.querySelector('fieldset').insertAdjacentHTML("beforeend", `
                <label>${property === 'firstName' ? 'First Name' :
                        property === 'lastName' ? 'Last Name' :
                        property === 'phoneNumber' ? 'Phone Number' :
                        property === 'cardNumber' ? 'Card Number' :
                        property.charAt(0).toUpperCase() + property.slice(1)}: </label>
                <input type="text"
                       name="${property}"
                       value="${displayValue}"
                       size="30"
                       ${readOnlyAttr}
                />
                <br>
            `);
        }
 
        // Store references to all input elements
        this.inputs = this.form.querySelectorAll('input[type=text]');
       
        // Update preview images for workout selections
        Object.entries(this.previews).forEach(([type, preview]) => {
            if (data[type]) {
                preview.src = `images/${data[type]}.gif`;
            }
        });
    }
}
/**
 * @fileoverview Controller class handling checkout form interactions and data flow
 */

/**
 * Controls interactions between checkout model and view
 * @class
 */
export class CheckoutController {
    /**
     * Creates an instance of CheckoutController and initializes event listeners
     * @param {Object} model - The checkout model instance
     * @param {Object} view - The checkout view instance
     * @constructor
     */
    constructor(model, view) {
        /**
         * Reference to the checkout model
         * @type {Object}
         * @private
         */
        this.model = model;

        /**
         * Reference to the checkout view
         * @type {Object}
         * @private
         */
        this.view = view;

        // Initialize view with model data and set up validation
        this.model.validation.setView(view);
        this.view.createInputs(this.model.getInputData());

        // Set up event listeners
        this.view.inputs.forEach((input) => {
            input.addEventListener("change", this.handleInputChange);
        });
        this.view.form.addEventListener("submit", this.handleFormSubmit);
    }

    /**
     * Handles input change events by updating model
     * @param {Event} event - The change event object
     * @returns {void}
     * @private
     */
    handleInputChange = (event) => {
        this.model.handleInputChange(event.target);
    }

    /**
     * Handles form submission and validates all inputs
     * @param {Event} event - The submit event object
     * @returns {void}
     * @private
     */
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.model.validation.validateForm(this.view.inputs)) {
            console.log('Form submitted successfully');
        }
    }
}
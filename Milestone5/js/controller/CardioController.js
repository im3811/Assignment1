/**
 * @fileoverview Controller handling cardio workout selection and view updates
 */

/**
 * Controller class for managing cardio workout selections and view updates
 * @class
 */
export class CardioController {
    /**
     * Creates an instance of CardioController
     * @param {CardioModel} model - The model instance for cardio data
     * @param {CardioView} view - The view instance for cardio UI
     * @constructor
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
   
        let properties = this.model.getProperties();
        properties.forEach((property) => {
            this.view.createSelect(property, this.model.getOptions(property));
        });
   
        this.view.renderWorkout(this.model.getValues());
   
        this.view.selects.forEach((select) => {
            if (this.model[select.id] !== "transparent_placeholder") {
                select.value = this.model[select.id];
            }
            select.addEventListener('change', this.handleSelectChange);
        });
       
        this.view.toggleSubmitButton();
    }

    /**
     * Handles changes to workout selection dropdowns
     * @param {Event} event - The change event from the select element
     * @private
     */
    handleSelectChange = (event) => {
        let select = event.target;
        this.model[select.id] = select.value;
        this.model.store();
        this.view.renderWorkout(this.model.getValues());
        this.view.toggleSubmitButton();
    }
}
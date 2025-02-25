/**
 * @fileoverview View handling cardio workout UI elements and animations
 */

/**
 * View class for managing cardio workout interface
 * @class
 */
export class CardioView {
    /**
     * Creates an instance of CardioView
     * @constructor
     */
    constructor() {
        this.warmup = document.querySelector("#warmup");
        this.cardio = document.querySelector("#cardio");
        this.recovery = document.querySelector("#recovery");
        this.selects = [];
        this.previousSrcs = {};
        this.submitButton = document.querySelector('button[type="submit"]');
    }

    /**
     * Creates a select dropdown for workout options
     * @param {string} selectID - ID for the select element
     * @param {Array<string>} options - Array of options for the select
     */
    createSelect(selectID, options) {
        let selectsDiv = document.querySelector("#div-selects");
       
        if (!selectsDiv.querySelector(`#${selectID}`)) {
            selectsDiv.insertAdjacentHTML("beforeend", `
                <select id="${selectID}">
                    <option value="undefined"> -- Select a ${selectID} -- </option>
                </select>`);
           
            let select = selectsDiv.querySelector(`#${selectID}`);
           
            options.forEach((option) => {
                let displayName = option.split('-').pop();
                select.insertAdjacentHTML("beforeend",
                    `<option value="${option}">${displayName}</option>`);
            });
           
            this.selects.push(select);
        }
    }

    /**
     * Renders workout previews with animations
     * @param {Array<string>} data - Array of workout selections
     */
    renderWorkout(data) {
        const previews = [this.warmup, this.cardio, this.recovery];
       
        data.forEach((value, index) => {
            let imgSrc = 'images/';
            let currentPreview = previews[index];
           
            if (value && value !== "transparent_placeholder") {
                imgSrc += value + '.gif';
                if (this.previousSrcs[index] !== imgSrc) {
                    currentPreview.src = '';
                    requestAnimationFrame(() => {
                        currentPreview.src = imgSrc;
                    });
                    this.previousSrcs[index] = imgSrc;
                }
            } else {
                imgSrc = 'images/transparent_placeholder.gif';
                currentPreview.src = imgSrc;
                this.previousSrcs[index] = imgSrc;
            }
        });
    }

    /**
     * Toggles submit button state based on selections
     */
    toggleSubmitButton() {
        let disabled = false;
        this.selects.forEach((select) => {
            if (select.value === "undefined") {
                disabled = true;
            }
        });
   
        this.submitButton.disabled = disabled;
    }
}
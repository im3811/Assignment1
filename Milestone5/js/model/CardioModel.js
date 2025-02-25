/**
 * @fileoverview Model handling cardio workout data and storage
 * @requires ../../data/selectData
 */

import { selectData } from '../data/selectData.js';

/**
 * Model class for managing cardio workout data
 * @class
 */
export class CardioModel {
    /** @private */
    #options = null;
   
    /**
     * Creates an instance of CardioModel
     * @constructor
     */
    constructor() {
        this.#options = selectData;
   
        let properties = Object.keys(this.#options);
        let savedWorkout = JSON.parse(localStorage.getItem('cardio'));
   
        properties.forEach((property) => {
            this[property] = savedWorkout && savedWorkout[property]
                ? savedWorkout[property]
                : "transparent_placeholder";
        });
    }

    /**
     * Gets the list of property names
     * @returns {Array<string>} Array of property names
     */
    getProperties() {
        return Object.keys(this);
    }

    /**
     * Gets the values of all properties
     * @returns {Array<any>} Array of property values
     */
    getValues() {
        return Object.values(this);
    }

    /**
     * Gets options for a specific select field
     * @param {string} selectID - The ID of the select field
     * @returns {Array<string>} Array of options for the select
     */
    getOptions(selectID) {
        let options = this.#options[selectID];
        return options;
    }

    /**
     * Stores the current state in localStorage
     */
    store() {
        localStorage.setItem('cardio', JSON.stringify(this));
    }
}
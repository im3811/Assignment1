/**
 * @fileoverview Main application entry point that handles routing between cardio and checkout pages
 * @requires ./model/cardioModel
 * @requires ./view/cardioView
 * @requires ./controller/cardioController
 * @requires ./model/CheckoutModel
 * @requires ./view/CheckoutView
 * @requires ./controller/CheckoutController
 */

import { CardioModel } from './model/CardioModel.js';
import { CardioView } from './view/CardioView.js';
import { CardioController } from './controller/CardioController.js';
import { CheckoutModel } from './model/CheckoutModel.js';
import { CheckoutView } from './view/CheckoutView.js';
import { CheckoutController } from './controller/CheckoutController.js';

/**
 * Main application class that handles page routing and component initialization
 * @class
 */
class App {
    /**
     * Creates an instance of App and initializes the appropriate controller based on the current page
     * @constructor
     */
    constructor() {
        const url = window.location.href;
        const page = url.match(/[a-z]+.html/)?.[0] || 'index.html';
       
        switch(page) {
            case 'index.html':
                new CardioController(new CardioModel(), new CardioView());
                break;
            case 'checkout.html':
                new CheckoutController(new CheckoutModel(), new CheckoutView());
                break;
        }
    }
}

const app = new App();
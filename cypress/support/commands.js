import 'cypress-file-upload';
import {
	NAV_LOGIN_REGISTER_BUTTON,
	NAV_DELETE_USER_BUTTON,
	NAV_LOGOUT_USER_BUTTON,
	SIGNIN_EMAIL_FIELD,
	SIGNIN_PASSWORD_FIELD,
	SIGNIN_LOGIN_BUTTON,
} from './selectors';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.get(NAV_LOGIN_REGISTER_BUTTON).click();
    cy.contains('Login to your account').should('be.visible');

    cy.get(SIGNIN_EMAIL_FIELD).type(email);
    cy.get(SIGNIN_PASSWORD_FIELD).type(password);
    cy.get(SIGNIN_LOGIN_BUTTON).click();
});

Cypress.Commands.add('logout', () => {
	cy.get(NAV_LOGOUT_USER_BUTTON).click();
});

Cypress.Commands.add('deleteAccount', (email, password) => {
	cy.login(email, password);

    cy.get(NAV_DELETE_USER_BUTTON).click();
    cy.contains('Account Deleted!').should('be.visible');
});

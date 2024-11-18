export default {
    emailInput() {
        return cy.get('[data-cy=email-input]');
    },
    emailPassword() {
        return cy.get('[data-cy=password-input]');
    },
    signinSubmit() {
        return cy.get('[data-cy=signin-submit]');
    },
    signupButton() {
        return cy.get('[data-cy=signup-button]');
    },
    helperText(input: Cypress.Chainable<JQuery<HTMLElement>>) {
        return input
            .parent()
            .parent()
            .find('span');

    },
    alert() {
        return cy.get('.ui-alert')
            .first();
    }
};
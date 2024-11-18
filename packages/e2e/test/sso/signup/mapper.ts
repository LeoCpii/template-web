export default {
    nameInput() {
        return cy.get('[data-cy=name-input]');
    },
    emailInput() {
        return cy.get('[data-cy=email-input]');
    },
    passwordInput() {
        return cy.get('[data-cy=password-input]');
    },
    confirmPasswordInput() {
        return cy.get('[data-cy=confirm-password-input]');
    },
    signupSubmit() {
        return cy.get('[data-cy=signup-submit]');
    },
    signinButton() {
        return cy.get('[data-cy=signin-button]');
    },
    helperText(input: Cypress.Chainable<JQuery<HTMLElement>>) {
        return input
            .parent()
            .parent()
            .find('span');

    },
};
// <reference types='cypress' />

import { USER } from '@support/mockeUser';

import mapper from './mapper';

describe('Signup', () => {
    beforeEach(() => { cy.signup(); });

    it('Should visit signup page', () => {
        cy.url().should('match', /signup/);
    });

    it.skip('Should signup', () => {
    });

    it('Should show message error when passwords are differents', () => {
        mapper.nameInput().type(USER.name);
        mapper.emailInput().type(USER.email);
        mapper.passwordInput().type(USER.password);

        const confirmPasswordInput = mapper.confirmPasswordInput();

        confirmPasswordInput.type('different-password');

        mapper.helperText(confirmPasswordInput)
            .should('have.text', 'As senhas devem ser iguais');
    });

    it('Should redirect to signin page when click on signin button', () => {
        mapper.signinButton().click();

        cy.url().should('match', /signin/);
    });
});
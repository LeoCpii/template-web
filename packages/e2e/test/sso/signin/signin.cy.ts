// <reference types='cypress' />

import mapper from './mapper';

describe('Signin', () => {
    beforeEach(() => { cy.signin(); });

    it('should visit signin page', () => {
        cy.url().should('match', /signin/);
    });

    it('should show error message when login fails', () => {
        const email = mapper.emailInput();
        const password = mapper.emailPassword();

        email.type('teste@teste.com');
        password.type('12345678');

        mapper.signinSubmit().click();

        cy.wait(500);

        mapper.alert().should('have.text', 'Email ou senha inválidos');
    });

    it.skip('should redirect to manager page when login succeeds', () => {

    });

    it('Should redirect to signup page when click on signup button', () => {
        mapper.signupButton().click();

        cy.url().should('match', /signup/);
    });

    it('Should show alert when has status error 401', () => {
        cy.visit('/signin?status=401');

        mapper.alert().should('have.text', 'Sessão expirada, faça login novamente.');
    });

    it('Should show alert when has status error 403', () => {
        cy.visit('/signin?status=403');

        mapper.alert().should('have.text', 'Você não tem permissão para acessar esta página.');
    });
});
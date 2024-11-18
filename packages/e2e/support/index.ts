import { openPage } from './commands';
import { USER } from './mockeUser';

// VISIT PAGES
Cypress.Commands.add('signin', () => { openPage('signin'); });
Cypress.Commands.add('signup', () => { openPage('signup'); });

// Firebase
Cypress.Commands.add('login', () => {
    // eslint-disable-next-line max-len
    cy.request('POST', 'http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake-api-key', {
        email: USER.email,
        password: USER.password,
        returnSecureToken: true
    }).then((response) => {
        const idToken = response.body.idToken;
        cy.setCookie('access_token', idToken);
    });
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            // SSO
            signin(): void;
            signup(): void;

            // UTILS
            setToken(): void;

            // FIREBASE
            login(): void;
        }
    }
}

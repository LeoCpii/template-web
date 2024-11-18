import '@4tw/cypress-drag-drop';

export const openPage = (path: string, options: Partial<Cypress.VisitOptions> = {}) => {
    const url = [Cypress.config('baseUrl'), path].join('/');

    cy.visit(url, options);
};
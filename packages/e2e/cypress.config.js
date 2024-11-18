import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        specPattern: 'test/**/*.cy.ts',
        supportFile: 'support/index.ts'
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 15000,
    fixturesFolder: false,
    pageLoadTimeout: 20000,
    requestTimeout: 20000,
    screenshotsFolder: 'assets/screenshots',
    viewportWidth: 1300,
    retries: {
        runMode: 2,
        openMode: 0
    }
});

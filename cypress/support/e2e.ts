// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Set sensible defaults for ConvertMorph testing
beforeEach(() => {
  // Set default viewport for consistent testing
  cy.viewport(1280, 800)
  
  // Set reasonable timeouts
  Cypress.config('defaultCommandTimeout', 10000)
  Cypress.config('requestTimeout', 15000)
  Cypress.config('responseTimeout', 15000)
  
  // Configure retries for flaky tests
  Cypress.config('retries', {
    runMode: 2,
    openMode: 0
  })
})

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore certain errors that don't affect functionality
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  // Let other errors fail the test
  return true
})

// Custom assertions can be added here if needed

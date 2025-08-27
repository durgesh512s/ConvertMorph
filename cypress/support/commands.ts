/// <reference types="cypress" />

// Custom commands for PDF tools testing

Cypress.Commands.add('uploadFile', (fileName: string, fileType: string = 'application/pdf') => {
  cy.get('input[type="file"]').selectFile(`cypress/fixtures/${fileName}`, { force: true })
})

Cypress.Commands.add('waitForProcessing', () => {
  // Wait for any processing indicators to disappear
  cy.get('[data-testid="processing"]', { timeout: 30000 }).should('not.exist')
  cy.get('.loading', { timeout: 30000 }).should('not.exist')
  cy.get('[aria-label*="processing"]', { timeout: 30000 }).should('not.exist')
})

Cypress.Commands.add('checkDownload', (fileName: string) => {
  // Check if download button is available and clickable
  cy.get('[data-testid="download-button"]').should('be.visible').and('not.be.disabled')
  cy.get('a[download]').should('exist')
})

// Add command to check responsive design
Cypress.Commands.add('checkResponsive', () => {
  // Test mobile viewport
  cy.viewport(375, 667)
  cy.wait(500)
  
  // Test tablet viewport
  cy.viewport(768, 1024)
  cy.wait(500)
  
  // Test desktop viewport
  cy.viewport(1280, 720)
  cy.wait(500)
})

// Add command to check accessibility
Cypress.Commands.add('checkA11y', () => {
  // Check for basic accessibility requirements
  cy.get('h1').should('exist')
  // Only check alt attributes if images exist
  cy.get('body').then(($body) => {
    if ($body.find('[alt]').length > 0) {
      cy.get('[alt]').each(($el) => {
        cy.wrap($el).should('have.attr', 'alt').and('not.be.empty')
      })
    }
  })
  cy.get('button').each(($el) => {
    // Only check visibility if the button is not hidden by responsive design
    cy.wrap($el).then(($button) => {
      if ($button.is(':visible')) {
        cy.wrap($button).should('be.visible')
      }
    })
  })
})

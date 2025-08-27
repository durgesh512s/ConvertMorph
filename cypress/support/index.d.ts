/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // New commands for comprehensive testing
    upload(fileInputSelector: string, filePaths: string[]): Chainable<Element>
    expectDownload(labelTextOrSelector: string): Chainable<Element>
    assertVisibleText(text: string): Chainable<Element>
    
    // Legacy commands for backward compatibility
    uploadFile(fileName: string, fileType?: string): Chainable<Element>
    waitForProcessing(): Chainable<Element>
    checkDownload(fileName: string): Chainable<Element>
    checkResponsive(): Chainable<Element>
    checkA11y(): Chainable<Element>
  }
}

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    uploadFile(fileName: string, fileType?: string): Chainable<Element>
    waitForProcessing(): Chainable<Element>
    checkDownload(fileName: string): Chainable<Element>
    checkResponsive(): Chainable<Element>
    checkA11y(): Chainable<Element>
  }
}

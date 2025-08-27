describe('PDF Compress Tool - Dynamic UI Testing', () => {
  beforeEach(() => {
    cy.visit('/tools/pdf-compress')
    cy.wait(1000) // Allow page to fully load
  })

  it('should upload file and show compress button', () => {
    // Upload a test file first
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true })
    cy.wait(2000)
    
    // After upload, compress button should appear - use contains
    cy.contains('Compress').should('be.visible')
    cy.contains('Compress').click()
    
    // Wait for processing to complete
    cy.contains('Download', { timeout: 30000 }).should('be.visible')
  })

  it('should change compression level and compress', () => {
    // Select different compression level using contains
    cy.contains('Strong Compression').click()
    
    // Upload file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true })
    cy.wait(2000)
    
    // Click compress button
    cy.contains('Compress').click()
    
    // Wait for completion
    cy.contains('Download', { timeout: 30000 }).should('be.visible')
  })

  it('should handle multiple files', () => {
    // Upload multiple files
    cy.get('input[type="file"]').selectFile([
      'cypress/fixtures/small-test.pdf',
      'cypress/fixtures/large-test.pdf'
    ], { force: true })
    cy.wait(3000)
    
    // Click compress button
    cy.contains('Compress').click()
    
    // Wait for completion
    cy.contains('Download', { timeout: 30000 }).should('be.visible')
    cy.contains('Download All').should('be.visible')
  })

  it('should complete compression process', () => {
    // Upload file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true })
    cy.wait(2000)
    
    // Start compression
    cy.contains('Compress').click()
    
    // Wait for completion - the main goal is that compression works
    cy.contains('Download', { timeout: 30000 }).should('be.visible')
  })

  it('should handle download functionality', () => {
    // Upload and compress
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true })
    cy.wait(2000)
    cy.contains('Compress').click()
    cy.contains('Download', { timeout: 30000 }).should('be.visible')
    
    // Test download button
    cy.contains('Download').click()
  })
})

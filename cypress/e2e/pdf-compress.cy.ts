describe('PDF Compress Tool', () => {
  beforeEach(() => {
    cy.visit('/tools/pdf-compress');
  });

  it('should load the PDF compress page', () => {
    cy.contains('PDF Compressor').should('be.visible');
    cy.get('[role="button"][aria-label="Upload files"]').should('be.visible');
  });

  it('should upload and compress a PDF file', () => {
    // Upload a sample PDF
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true });
    
    // Wait for file to be uploaded
    cy.contains('small-test.pdf').should('be.visible');
    
    // Select compression level
    cy.get('select').select('medium');
    
    // Start compression
    cy.contains('Compress PDF').click();
    
    // Wait for processing to complete and download link to appear
    cy.contains('Download', { timeout: 30000 }).should('be.visible');
    
    // Verify download link is functional
    cy.contains('Download').should('have.attr', 'href').and('include', 'blob:');
  });

  it('should handle file upload errors gracefully', () => {
    // Try to upload an invalid file type
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image-1.png', { force: true });
    
    // Should show error message for invalid file type
    cy.contains('File type must be').should('be.visible');
  });

  it('should be accessible via keyboard', () => {
    // Test keyboard navigation
    cy.get('body').type('{tab}');
    cy.focused().should('have.attr', 'role', 'button');
    
    // Test keyboard activation
    cy.focused().type('{enter}');
    // File dialog should open (we can't test the actual dialog, but no errors should occur)
  });
});

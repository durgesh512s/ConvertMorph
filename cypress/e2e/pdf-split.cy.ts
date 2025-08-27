describe('PDF Split Tool', () => {
  beforeEach(() => {
    cy.visit('/tools/pdf-split');
  });

  it('should load the PDF split page', () => {
    cy.contains('PDF Splitter').should('be.visible');
    cy.get('[role="button"][aria-label="Upload files"]').should('be.visible');
  });

  it('should upload and split a PDF file by page ranges', () => {
    // Upload a PDF file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/large-test.pdf', { force: true });
    cy.contains('large-test.pdf').should('be.visible');
    
    // Enter page range
    cy.get('input[placeholder*="page"]').type('1-2');
    
    // Start split process
    cy.contains('Split PDF').click();
    
    // Wait for processing to complete and download link to appear
    cy.contains('Download', { timeout: 30000 }).should('be.visible');
    
    // Verify download link is functional (should be a ZIP file)
    cy.contains('Download').should('have.attr', 'href').and('include', 'blob:');
  });

  it('should validate page range input', () => {
    // Upload a PDF file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true });
    cy.contains('small-test.pdf').should('be.visible');
    
    // Enter invalid page range
    cy.get('input[placeholder*="page"]').type('999');
    
    // Try to split
    cy.contains('Split PDF').click();
    
    // Should show error for invalid range
    cy.contains('Out of range').should('be.visible');
  });

  it('should handle various page range formats', () => {
    // Upload a PDF file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/large-test.pdf', { force: true });
    cy.contains('large-test.pdf').should('be.visible');
    
    // Test different range formats
    const ranges = ['1', '1,3', '1-2,4'];
    
    ranges.forEach((range) => {
      cy.get('input[placeholder*="page"]').clear().type(range);
      // Should not show validation errors for valid ranges
      cy.get('input[placeholder*="page"]').should('not.have.class', 'error');
    });
  });

  it('should require a file before splitting', () => {
    // Try to split without uploading a file
    cy.get('input[placeholder*="page"]').type('1-2');
    
    // Split button should be disabled
    cy.contains('Split PDF').should('be.disabled');
  });

  it('should require page range input', () => {
    // Upload a PDF file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true });
    cy.contains('small-test.pdf').should('be.visible');
    
    // Try to split without entering page range
    cy.contains('Split PDF').click();
    
    // Should show validation error
    cy.contains('No ranges provided').should('be.visible');
  });
});

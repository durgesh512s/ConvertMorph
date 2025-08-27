describe('PDF Merge Tool', () => {
  beforeEach(() => {
    cy.visit('/tools/pdf-merge');
  });

  it('should load the PDF merge page', () => {
    cy.contains('PDF Merger').should('be.visible');
    cy.get('[role="button"][aria-label="Upload files"]').should('be.visible');
  });

  it('should upload and merge multiple PDF files', () => {
    // Upload first PDF
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true });
    cy.contains('small-test.pdf').should('be.visible');
    
    // Upload second PDF
    cy.get('input[type="file"]').selectFile('cypress/fixtures/large-test.pdf', { force: true });
    cy.contains('large-test.pdf').should('be.visible');
    
    // Verify both files are listed
    cy.get('[data-testid="uploaded-files"]').should('contain', 'small-test.pdf');
    cy.get('[data-testid="uploaded-files"]').should('contain', 'large-test.pdf');
    
    // Start merge process
    cy.contains('Merge PDFs').click();
    
    // Wait for processing to complete and download link to appear
    cy.contains('Download', { timeout: 30000 }).should('be.visible');
    
    // Verify download link is functional
    cy.contains('Download').should('have.attr', 'href').and('include', 'blob:');
  });

  it('should require at least 2 files for merging', () => {
    // Upload only one file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/small-test.pdf', { force: true });
    cy.contains('small-test.pdf').should('be.visible');
    
    // Merge button should be disabled or show error
    cy.contains('Merge PDFs').should('be.disabled');
  });

  it('should allow reordering of files', () => {
    // Upload multiple files
    cy.get('input[type="file"]').selectFile(['cypress/fixtures/small-test.pdf', 'cypress/fixtures/large-test.pdf'], { force: true });
    
    // Wait for files to be uploaded
    cy.contains('small-test.pdf').should('be.visible');
    cy.contains('large-test.pdf').should('be.visible');
    
    // Test drag and drop reordering (if implemented)
    // This is a placeholder - actual implementation would depend on the drag-and-drop library used
    cy.get('[data-testid="file-item"]').should('have.length', 2);
  });
});

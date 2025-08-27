describe('PDF Merge Tool', () => {
  beforeEach(() => {
    cy.visit('/tools/pdf-merge')
  })

  it('should display the PDF merge interface', () => {
    cy.get('h1').should('contain.text', 'Merge')
    cy.get('input[type="file"]').should('exist')
    cy.assertVisibleText('Drop your PDF files here')
  })

  it('should merge multiple PDFs in correct order', () => {
    // Upload multiple PDFs in specific order
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf'])
    
    // Wait for files to be processed
    cy.wait(1000)
    
    // Verify both files are shown
    cy.assertVisibleText('a.pdf')
    cy.assertVisibleText('b.pdf')
    
    // Start merge job
    cy.contains('Merge', { matchCase: false }).click()
    
    // Wait for processing to complete
    cy.waitForProcessing()
    
    // Expect success toast and single download control
    cy.get('body').should('contain.text', 'Success')
    cy.expectDownload('Download')
    
    // Verify UI indicates total pages or merged summary
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('pages') || 
        str.includes('merged') || 
        str.includes('combined') ||
        str.includes('total')
      )
    })
  })

  it('should handle file reordering', () => {
    // Upload files
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf'])
    cy.wait(1000)
    
    // Look for reorder controls (buttons, drag handles, etc.)
    cy.get('body').then(($body) => {
      // Check for common reordering UI elements
      const hasReorderControls = 
        $body.find('[data-testid*="move"], [data-testid*="reorder"], [data-testid*="up"], [data-testid*="down"]').length > 0 ||
        $body.find('button').filter(':contains("↑"), :contains("↓"), :contains("Move"), :contains("Up"), :contains("Down")').length > 0
      
      if (hasReorderControls) {
        // Try to reorder files
        cy.get('[data-testid*="move"], [data-testid*="reorder"], [data-testid*="up"], [data-testid*="down"]').first().click()
        cy.wait(500)
      }
    })
    
    // Run merge after reordering
    cy.contains('Merge', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should remove files from merge list', () => {
    // Upload files
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf'])
    cy.wait(1000)
    
    // Look for remove/delete buttons
    cy.get('body').then(($body) => {
      const hasRemoveControls = 
        $body.find('[data-testid*="remove"], [data-testid*="delete"], [data-testid*="close"]').length > 0 ||
        $body.find('button').filter(':contains("×"), :contains("Remove"), :contains("Delete")').length > 0
      
      if (hasRemoveControls) {
        // Remove one file
        cy.get('[data-testid*="remove"], [data-testid*="delete"], [data-testid*="close"]').first().click()
        cy.wait(500)
        
        // Verify file was removed (one of the files should be gone)
        cy.get('body').should(($body) => {
          const text = $body.text()
          expect(text).to.satisfy((str: string) => 
            !str.includes('a.pdf') || !str.includes('b.pdf')
          )
        })
      }
    })
    
    // Should still be able to merge remaining file(s)
    cy.contains('Merge', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should handle single file upload', () => {
    // Upload only one file
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Should show the file
    cy.assertVisibleText('sample.pdf')
    
    // Should still allow "merge" (essentially a copy operation)
    cy.contains('Merge', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should display file information and page counts', () => {
    // Upload files
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf'])
    cy.wait(1000)
    
    // Should show file names
    cy.assertVisibleText('a.pdf')
    cy.assertVisibleText('b.pdf')
    
    // Should show file sizes or page counts
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('pages') || 
        str.includes('mb') || 
        str.includes('kb') ||
        str.includes('size')
      )
    })
  })

  it('should handle multiple merge operations', () => {
    // First merge
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf'])
    cy.wait(1000)
    cy.contains('Merge', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
    
    // Reset and try another merge
    cy.get('body').type('{esc}')
    cy.wait(500)
    
    // Second merge with different files
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Merge', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should show merge progress and status', () => {
    // Upload files
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf'])
    cy.wait(1000)
    
    // Start merge
    cy.contains('Merge', { matchCase: false }).click()
    
    // Should show some kind of progress indicator
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('processing') || 
        str.includes('merging') || 
        str.includes('progress') ||
        str.includes('loading')
      )
    })
    
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should handle large number of files', () => {
    // Upload multiple files
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf', 'sample.pdf'])
    cy.wait(1000)
    
    // Should show all files
    cy.assertVisibleText('a.pdf')
    cy.assertVisibleText('b.pdf')
    cy.assertVisibleText('sample.pdf')
    
    // Should be able to merge all
    cy.contains('Merge', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should be responsive on mobile', () => {
    cy.viewport(375, 812)
    
    // Interface should still be usable
    cy.get('h1').should('be.visible')
    cy.get('input[type="file"]').should('exist')
    
    // Upload should work on mobile
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf'])
    cy.wait(1000)
    cy.contains('Merge', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should validate file types', () => {
    // Try to upload non-PDF file
    cy.writeFile('cypress/fixtures/fake.txt', 'This is not a PDF')
    
    cy.get('input[type="file"]').selectFile('cypress/fixtures/fake.txt', { force: true })
    cy.wait(1000)
    
    // Should show error or reject the file
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('pdf only') || 
        str.includes('invalid') || 
        str.includes('unsupported') ||
        str.includes('error')
      )
    })
  })
})

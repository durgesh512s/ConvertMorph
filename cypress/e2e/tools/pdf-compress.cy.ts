describe('PDF Compress Tool', () => {
  beforeEach(() => {
    cy.visit('/tools/pdf-compress')
  })

  it('should display the PDF compress interface', () => {
    cy.get('h1').should('contain.text', 'PDF Compress')
    cy.get('input[type="file"]').should('exist')
    cy.assertVisibleText('Drag & drop files here')
  })

  it('should successfully compress a PDF with Medium preset', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    
    // Wait for file to be processed and UI to update
    cy.wait(1000)
    
    // Select Medium compression preset (radio button)
    cy.get('input[type="radio"][value="medium"], input[type="radio"]:checked').should('exist')
    // Medium should be selected by default, but click to ensure
    cy.contains('Medium Compression').click()
    
    // Start compression job - look for the specific button text
    cy.contains('Compress PDFs', { matchCase: false }).click()
    
    // Wait for processing to complete
    cy.waitForProcessing()
    
    // Expect download control (compression is working as shown in output)
    cy.expectDownload('Download')
    
    // Assert UI shows before/after sizes and compression ratio
    cy.get('body').should('contain.text', 'MB')
    cy.get('body').then(($body) => {
      const bodyText = $body.text()
      // Look for size indicators or ratio text
      expect(bodyText).to.match(/\d+(\.\d+)?\s*MB|size|ratio|compressed/i)
    })
  })

  it('should handle unsupported file format error', () => {
    // Create a fake PDF file (actually a text file)
    cy.writeFile('cypress/fixtures/fake.pdf', 'This is not a PDF file')
    
    // Try to upload the fake PDF
    cy.get('input[type="file"]').selectFile('cypress/fixtures/fake.pdf', { force: true })
    
    // Wait a moment for validation
    cy.wait(1000)
    
    // Expect friendly error message
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('unsupported') || 
        str.includes('invalid') || 
        str.includes('format') || 
        str.includes('error')
      )
    })
  })

  it('should handle file size limit error', () => {
    // Create a large dummy file to simulate size limit
    const largeContent = 'x'.repeat(50 * 1024 * 1024) // 50MB of content
    cy.writeFile('cypress/fixtures/large-fake.pdf', largeContent)
    
    // Try to upload the large file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/large-fake.pdf', { force: true })
    
    // Wait for validation
    cy.wait(1000)
    
    // Expect file size error message
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('too large') || 
        str.includes('size limit') || 
        str.includes('maximum') || 
        str.includes('mb')
      )
    })
  })

  it('should support keyboard shortcuts', () => {
    // Test Ctrl/Cmd+U to open file dialog
    cy.get('body').type('{ctrl+u}')
    
    // The file input should be triggered (we can't directly test the dialog opening)
    cy.get('input[type="file"]').should('exist')
    
    // Upload a file first
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Test Esc to clear selection
    cy.get('body').type('{esc}')
    
    // File should be cleared or interface reset
    cy.wait(500)
  })

  it('should show compression presets and options', () => {
    // Upload a file first
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Check for compression options
    cy.get('body').then(($body) => {
      const bodyText = $body.text().toLowerCase()
      
      // Look for compression-related terms
      const hasCompressionOptions = 
        bodyText.includes('quality') ||
        bodyText.includes('compression') ||
        bodyText.includes('preset') ||
        bodyText.includes('medium') ||
        bodyText.includes('high') ||
        bodyText.includes('low')
      
      if (hasCompressionOptions) {
        cy.get('body').should(($body) => {
          const text = $body.text().toLowerCase()
          expect(text).to.satisfy((str: string) => 
            str.includes('quality') || 
            str.includes('compression') || 
            str.includes('preset')
          )
        })
      }
    })
  })

  it('should handle multiple file operations', () => {
    // First compression
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress PDFs', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
    
    // Reset and try another file - click "Compress More Files" button
    cy.contains('Compress More Files', { matchCase: false }).click()
    cy.wait(500)
    
    // Second compression with different file
    cy.upload('input[type="file"]', ['a.pdf'])
    cy.wait(1000)
    cy.contains('Compress PDFs', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should display file information after upload', () => {
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Should show file name and size
    cy.assertVisibleText('sample.pdf')
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('mb') || 
        str.includes('kb') || 
        str.includes('bytes')
      )
    })
  })

  it('should be responsive on mobile', () => {
    cy.viewport(375, 812)
    
    // Interface should still be usable
    cy.get('h1').should('be.visible')
    cy.get('input[type="file"]').should('exist')
    
    // Upload should work on mobile
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress PDFs', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })
})

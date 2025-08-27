describe('PDF to Images Tool', () => {
  beforeEach(() => {
    cy.visit('/tools/pdf-to-images')
  })

  it('should display the PDF to images interface', () => {
    cy.get('h1').should('contain.text', 'PDF to Images')
    cy.get('input[type="file"]').should('exist')
    cy.assertVisibleText('Drop your PDF file here')
  })

  it('should convert PDF to PNG images', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Select PNG format
    cy.get('body').then(($body) => {
      // Look for format selection (radio buttons, dropdown, etc.)
      const hasFormatSelection = 
        $body.find('[data-testid*="format"], select, input[type="radio"]').length > 0 ||
        $body.text().toLowerCase().includes('png') ||
        $body.text().toLowerCase().includes('format')
      
      if (hasFormatSelection) {
        // Try to select PNG format
        cy.get('body').contains('PNG', { matchCase: false }).click()
      }
    })
    
    // Start conversion
    cy.contains('Convert', { matchCase: false }).click()
    
    // Wait for processing
    cy.waitForProcessing()
    
    // Expect success and batch download (ZIP)
    cy.get('body').should('contain.text', 'Success')
    cy.expectDownload('Download')
    
    // Check for PNG naming pattern in success message or download info
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('png') || 
        str.includes('page') || 
        str.includes('images') ||
        str.includes('zip')
      )
    })
  })

  it('should convert PDF to JPG images', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Select JPG format
    cy.get('body').then(($body) => {
      const hasFormatSelection = 
        $body.find('[data-testid*="format"], select, input[type="radio"]').length > 0 ||
        $body.text().toLowerCase().includes('jpg') ||
        $body.text().toLowerCase().includes('jpeg')
      
      if (hasFormatSelection) {
        // Try to select JPG format
        cy.get('body').then(($body) => {
          if ($body.text().includes('JPG')) {
            cy.contains('JPG', { matchCase: false }).click()
          } else if ($body.text().includes('JPEG')) {
            cy.contains('JPEG', { matchCase: false }).click()
          }
        })
      }
    })
    
    // Start conversion
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Should succeed with JPG format
    cy.expectDownload('Download')
    cy.get('body').should('contain.text', 'Success')
    
    // Check for JPG naming pattern
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('jpg') || 
        str.includes('jpeg') || 
        str.includes('page') ||
        str.includes('images')
      )
    })
  })

  it('should show page count and conversion info', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Should show PDF information
    cy.assertVisibleText('sample.pdf')
    
    // Should show page count or document info
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('pages') || 
        str.includes('page count') || 
        /\d+\s*page/.test(str) ||
        str.includes('document')
      )
    })
  })

  it('should handle single page PDF', () => {
    // Upload single page PDF
    cy.upload('input[type="file"]', ['a.pdf'])
    cy.wait(1000)
    
    // Convert to images
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Should succeed even with single page
    cy.expectDownload('Download')
    cy.get('body').should('contain.text', 'Success')
  })

  it('should handle multi-page PDF conversion', () => {
    // Upload multi-page PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Convert all pages
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Should create multiple images (ZIP download)
    cy.expectDownload('Download')
    cy.get('body').should('contain.text', 'Success')
    
    // Should indicate multiple pages converted
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('pages') || 
        str.includes('images') || 
        str.includes('zip') ||
        /\d+/.test(str) // some number indicating count
      )
    })
  })

  it('should show conversion progress', () => {
    // Upload PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Start conversion
    cy.contains('Convert', { matchCase: false }).click()
    
    // Should show progress indicator
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('processing') || 
        str.includes('converting') || 
        str.includes('extracting') ||
        str.includes('loading')
      )
    })
    
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should handle quality settings if available', () => {
    // Upload PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Look for quality settings
    cy.get('body').then(($body) => {
      const hasQualitySettings = 
        $body.find('[data-testid*="quality"], input[type="range"], select').length > 0 ||
        $body.text().toLowerCase().includes('quality') ||
        $body.text().toLowerCase().includes('resolution')
      
      if (hasQualitySettings) {
        // Try to adjust quality if available
        cy.get('[data-testid*="quality"], input[type="range"]').first().click()
      }
    })
    
    // Convert with quality settings
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should validate file type', () => {
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

  it('should handle page range selection if supported', () => {
    // Upload PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Look for page range options
    cy.get('body').then(($body) => {
      const hasPageRange = 
        $body.find('input[placeholder*="range"], input[placeholder*="page"]').length > 0 ||
        $body.text().toLowerCase().includes('page range') ||
        $body.text().toLowerCase().includes('specific pages')
      
      if (hasPageRange) {
        // Try to specify page range
        cy.get('input[placeholder*="range"], input[placeholder*="page"]').type('1-2')
      }
    })
    
    // Convert with or without page range
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should be responsive on mobile', () => {
    cy.viewport(375, 812)
    
    // Interface should still be usable
    cy.get('h1').should('be.visible')
    cy.get('input[type="file"]').should('exist')
    
    // Upload and convert should work on mobile
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should handle multiple conversion operations', () => {
    // First conversion
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
    
    // Reset and try another conversion
    cy.get('body').type('{esc}')
    cy.wait(500)
    
    // Second conversion with different file
    cy.upload('input[type="file"]', ['a.pdf'])
    cy.wait(1000)
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should show format options clearly', () => {
    // Check that format options are visible
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('png') || 
        str.includes('jpg') || 
        str.includes('jpeg') ||
        str.includes('format')
      )
    })
  })

  it('should handle large PDF files', () => {
    // Upload larger PDF (sample.pdf should be multi-page)
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Should show file size or page count
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('mb') || 
        str.includes('kb') || 
        str.includes('pages') ||
        str.includes('size')
      )
    })
    
    // Should still convert successfully
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })
})

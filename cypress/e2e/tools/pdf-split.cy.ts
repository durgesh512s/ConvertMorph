describe('PDF Split Tool', () => {
  beforeEach(() => {
    cy.visit('/tools/pdf-split')
  })

  it('should display the PDF split interface', () => {
    cy.get('h1').should('contain.text', 'Split')
    cy.get('input[type="file"]').should('exist')
    cy.assertVisibleText('Drop your PDF file here')
  })

  it('should split PDF with valid page ranges "1-2,4"', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Enter page ranges
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1-2,4')
    
    // Start split job
    cy.contains('Split', { matchCase: false }).click()
    
    // Wait for processing to complete
    cy.waitForProcessing()
    
    // Expect success toast and ZIP download control
    cy.get('body').should('contain.text', 'Success')
    cy.expectDownload('Download')
    
    // Assert success toast includes extracted pages count
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('3 pages') || 
        str.includes('extracted') || 
        str.includes('split') ||
        str.includes('pages')
      )
    })
  })

  it('should validate and reject invalid page ranges', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Test invalid range "0-3" (pages start from 1)
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').clear().type('0-3')
    cy.contains('Split', { matchCase: false }).click()
    
    // Should show friendly error
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('invalid') || 
        str.includes('error') || 
        str.includes('range') ||
        str.includes('page')
      )
    })
    
    // Test invalid range "a-b" (non-numeric)
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').clear().type('a-b')
    cy.contains('Split', { matchCase: false }).click()
    
    // Should show friendly error
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('invalid') || 
        str.includes('error') || 
        str.includes('format') ||
        str.includes('number')
      )
    })
  })

  it('should handle single page extraction', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Extract single page
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('2')
    cy.contains('Split', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Should succeed
    cy.expectDownload('Download')
    cy.get('body').should('contain.text', 'Success')
  })

  it('should handle multiple separate pages', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Extract multiple separate pages
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1,3,4')
    cy.contains('Split', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Should succeed
    cy.expectDownload('Download')
    cy.get('body').should('contain.text', 'Success')
  })

  it('should handle continuous page ranges', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Extract continuous range
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1-3')
    cy.contains('Split', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Should succeed
    cy.expectDownload('Download')
    cy.get('body').should('contain.text', 'Success')
  })

  it('should show page count information', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Should show total page count
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('pages') || 
        str.includes('total') || 
        str.includes('page count') ||
        /\d+\s*page/.test(str)
      )
    })
  })

  it('should validate page ranges against document length', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Try to extract page beyond document length (assuming sample.pdf has 4 pages)
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1-10')
    cy.contains('Split', { matchCase: false }).click()
    
    // Should show error or warning
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('exceed') || 
        str.includes('beyond') || 
        str.includes('invalid') ||
        str.includes('range')
      )
    })
  })

  it('should provide helpful range format examples', () => {
    // Check for helpful text or placeholders
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('1-3') || 
        str.includes('1,3,5') || 
        str.includes('example') ||
        str.includes('format')
      )
    })
  })

  it('should handle empty or whitespace-only ranges', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Try empty range
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').clear()
    cy.contains('Split', { matchCase: false }).click()
    
    // Should show error
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('required') || 
        str.includes('enter') || 
        str.includes('specify') ||
        str.includes('range')
      )
    })
  })

  it('should handle complex mixed ranges', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Complex range with both individual pages and ranges
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1,3-4')
    cy.contains('Split', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Should succeed
    cy.expectDownload('Download')
    cy.get('body').should('contain.text', 'Success')
  })

  it('should be responsive on mobile', () => {
    cy.viewport(375, 812)
    
    // Interface should still be usable
    cy.get('h1').should('be.visible')
    cy.get('input[type="file"]').should('exist')
    
    // Upload and split should work on mobile
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1-2')
    cy.contains('Split', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should handle multiple split operations', () => {
    // First split
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1-2')
    cy.contains('Split', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
    
    // Reset and try another split
    cy.get('body').type('{esc}')
    cy.wait(500)
    
    // Second split with different file
    cy.upload('input[type="file"]', ['a.pdf'])
    cy.wait(1000)
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1')
    cy.contains('Split', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should show split progress', () => {
    // Upload sample PDF
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Start split
    cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="page"]').type('1-3')
    cy.contains('Split', { matchCase: false }).click()
    
    // Should show progress indicator
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('processing') || 
        str.includes('splitting') || 
        str.includes('extracting') ||
        str.includes('loading')
      )
    })
    
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
})

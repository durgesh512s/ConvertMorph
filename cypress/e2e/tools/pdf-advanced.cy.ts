describe('Advanced PDF Tools', () => {
  
  describe('PDF Organize Tool', () => {
    beforeEach(() => {
      cy.visit('/tools/pdf-organize')
    })

    it('should display the PDF organize interface', () => {
      cy.get('h1').should('contain.text', 'Organize')
      cy.get('input[type="file"]').should('exist')
      cy.assertVisibleText('Drop your PDF file here')
    })

    it('should reorder pages and create organized PDF', () => {
      // Upload sample PDF
      cy.upload('input[type="file"]', ['sample.pdf'])
      cy.wait(1000)
      
      // Should show page thumbnails or list
      cy.get('body').should(($body) => {
        const text = $body.text().toLowerCase()
        expect(text).to.satisfy((str: string) => 
          str.includes('pages') || 
          str.includes('page') || 
          str.includes('reorder') ||
          str.includes('organize')
        )
      })
      
      // Look for reorder controls and try to reorder
      cy.get('body').then(($body) => {
        const hasReorderControls = 
          $body.find('[data-testid*="move"], [data-testid*="reorder"], [data-testid*="up"], [data-testid*="down"]').length > 0 ||
          $body.find('button').filter(':contains("↑"), :contains("↓"), :contains("Move")').length > 0
        
        if (hasReorderControls) {
          // Try to reorder a couple of pages
          cy.get('[data-testid*="move"], [data-testid*="reorder"], [data-testid*="up"], [data-testid*="down"]').first().click()
          cy.wait(500)
        }
      })
      
      // Run organize operation
      cy.contains('Organize', { matchCase: false }).click()
      cy.waitForProcessing()
      
      // Expect download with organized/merged naming
      cy.expectDownload('Download')
      cy.get('body').should('contain.text', 'Success')
      
      // Check for organized filename pattern
      cy.get('body').should(($body) => {
        const text = $body.text().toLowerCase()
        expect(text).to.satisfy((str: string) => 
          str.includes('organized') || 
          str.includes('merged') || 
          str.includes('reordered')
        )
      })
    })
  })

  describe('PDF Watermark Tool', () => {
    beforeEach(() => {
      cy.visit('/tools/pdf-watermark')
    })

    it('should display the PDF watermark interface', () => {
      cy.get('h1').should('contain.text', 'Watermark')
      cy.get('input[type="file"]').should('exist')
      cy.assertVisibleText('Drop your PDF file here')
    })

    it('should add text watermark to PDF', () => {
      // Upload sample PDF
      cy.upload('input[type="file"]', ['sample.pdf'])
      cy.wait(1000)
      
      // Set watermark text
      cy.get('input[type="text"], input[placeholder*="watermark"], input[placeholder*="text"]').type('CONFIDENTIAL')
      
      // Look for position presets
      cy.get('body').then(($body) => {
        const hasPositionOptions = 
          $body.find('[data-testid*="position"], select, input[type="radio"]').length > 0 ||
          $body.text().toLowerCase().includes('position') ||
          $body.text().toLowerCase().includes('center') ||
          $body.text().toLowerCase().includes('corner')
        
        if (hasPositionOptions) {
          // Try to select a position preset
          cy.get('[data-testid*="position"], select').first().click()
        }
      })
      
      // Run watermark operation
      cy.contains('Add Watermark', { matchCase: false }).click()
      cy.waitForProcessing()
      
      // Expect download with watermarked naming
      cy.expectDownload('Download')
      cy.get('body').should('contain.text', 'Success')
      
      // Check for watermarked filename pattern
      cy.get('body').should(($body) => {
        const text = $body.text().toLowerCase()
        expect(text).to.satisfy((str: string) => 
          str.includes('watermarked') || 
          str.includes('watermark')
        )
      })
    })

    it('should handle watermark customization options', () => {
      // Upload PDF
      cy.upload('input[type="file"]', ['sample.pdf'])
      cy.wait(1000)
      
      // Set watermark text
      cy.get('input[type="text"], input[placeholder*="watermark"], input[placeholder*="text"]').type('DRAFT')
      
      // Look for customization options (opacity, size, color, etc.)
      cy.get('body').then(($body) => {
        const hasCustomOptions = 
          $body.find('input[type="range"], input[type="color"]').length > 0 ||
          $body.text().toLowerCase().includes('opacity') ||
          $body.text().toLowerCase().includes('size') ||
          $body.text().toLowerCase().includes('color')
        
        if (hasCustomOptions) {
          // Try to adjust settings
          cy.get('input[type="range"]').first().click()
        }
      })
      
      // Apply watermark
      cy.contains('Add Watermark', { matchCase: false }).click()
      cy.waitForProcessing()
      cy.expectDownload('Download')
    })
  })

  describe('PDF Page Numbers Tool', () => {
    beforeEach(() => {
      cy.visit('/tools/pdf-pagenum')
    })

    it('should display the PDF page numbers interface', () => {
      cy.get('h1').should('contain.text', 'Page Numbers')
      cy.get('input[type="file"]').should('exist')
      cy.assertVisibleText('Drop your PDF file here')
    })

    it('should add page numbers to PDF', () => {
      // Upload sample PDF
      cy.upload('input[type="file"]', ['sample.pdf'])
      cy.wait(1000)
      
      // Look for position options (bottom-right, etc.)
      cy.get('body').then(($body) => {
        const hasPositionOptions = 
          $body.find('[data-testid*="position"], select, input[type="radio"]').length > 0 ||
          $body.text().toLowerCase().includes('bottom') ||
          $body.text().toLowerCase().includes('right') ||
          $body.text().toLowerCase().includes('position')
        
        if (hasPositionOptions) {
          // Try to choose bottom-right position
          cy.get('body').then(($body) => {
            if ($body.text().toLowerCase().includes('bottom')) {
              cy.contains('bottom', { matchCase: false }).click()
            } else if ($body.text().toLowerCase().includes('right')) {
              cy.contains('right', { matchCase: false }).click()
            }
          })
        }
      })
      
      // Run page numbering operation
      cy.contains('Add Page Numbers', { matchCase: false }).click()
      cy.waitForProcessing()
      
      // Expect download with page numbered naming
      cy.expectDownload('Download')
      cy.get('body').should('contain.text', 'Success')
      
      // Check for page numbered filename pattern
      cy.get('body').should(($body) => {
        const text = $body.text().toLowerCase()
        expect(text).to.satisfy((str: string) => 
          str.includes('pagenum') || 
          str.includes('numbered') || 
          str.includes('page numbers')
        )
      })
    })

    it('should handle page numbering options', () => {
      // Upload PDF
      cy.upload('input[type="file"]', ['sample.pdf'])
      cy.wait(1000)
      
      // Look for numbering format options
      cy.get('body').then(($body) => {
        const hasFormatOptions = 
          $body.find('select, input[type="radio"]').length > 0 ||
          $body.text().toLowerCase().includes('format') ||
          $body.text().toLowerCase().includes('style') ||
          $body.text().toLowerCase().includes('start')
        
        if (hasFormatOptions) {
          // Try to adjust format settings
          cy.get('select').first().click()
        }
      })
      
      // Apply page numbers
      cy.contains('Add Page Numbers', { matchCase: false }).click()
      cy.waitForProcessing()
      cy.expectDownload('Download')
    })
  })

  describe('PDF Sign Tool', () => {
    beforeEach(() => {
      cy.visit('/tools/pdf-sign')
    })

    it('should display the PDF sign interface', () => {
      cy.get('h1').should('contain.text', 'Sign')
      cy.get('input[type="file"]').should('exist')
      cy.assertVisibleText('Drop your PDF file here')
    })

    it('should add signature to PDF', () => {
      // Upload sample PDF
      cy.upload('input[type="file"]', ['sample.pdf'])
      cy.wait(1000)
      
      // Look for signature drawing area or upload option
      cy.get('body').then(($body) => {
        const hasSignatureArea = 
          $body.find('canvas, [data-testid*="signature"], [data-testid*="draw"]').length > 0 ||
          $body.text().toLowerCase().includes('draw') ||
          $body.text().toLowerCase().includes('signature') ||
          $body.text().toLowerCase().includes('sign')
        
        if (hasSignatureArea) {
          // Try to draw a basic signature (simulate drawing)
          cy.get('canvas, [data-testid*="signature"], [data-testid*="draw"]').first().click()
          
          // If it's a canvas, try to draw on it
          cy.get('canvas').then(($canvas) => {
            if ($canvas.length > 0) {
              // Simulate drawing a signature
              cy.wrap($canvas).trigger('mousedown', { which: 1, pageX: 100, pageY: 100 })
              cy.wrap($canvas).trigger('mousemove', { which: 1, pageX: 150, pageY: 120 })
              cy.wrap($canvas).trigger('mouseup')
            }
          })
        }
      })
      
      // Look for placement options
      cy.get('body').then(($body) => {
        const hasPlacementOptions = 
          $body.text().toLowerCase().includes('place') ||
          $body.text().toLowerCase().includes('position') ||
          $body.find('button').filter(':contains("Place"), :contains("Add")').length > 0
        
        if (hasPlacementOptions) {
          // Try to place signature on page
          cy.contains('Place', { matchCase: false }).click()
        }
      })
      
      // Run signing operation
      cy.contains('Sign', { matchCase: false }).click()
      cy.waitForProcessing()
      
      // Expect download with signed naming
      cy.expectDownload('Download')
      cy.get('body').should('contain.text', 'Success')
      
      // Check for signed filename pattern
      cy.get('body').should(($body) => {
        const text = $body.text().toLowerCase()
        expect(text).to.satisfy((str: string) => 
          str.includes('signed') || 
          str.includes('signature')
        )
      })
    })

    it('should handle signature customization', () => {
      // Upload PDF
      cy.upload('input[type="file"]', ['sample.pdf'])
      cy.wait(1000)
      
      // Look for signature options (text signature, upload, draw)
      cy.get('body').then(($body) => {
        const hasSignatureOptions = 
          $body.find('input[type="text"], input[type="file"]').length > 0 ||
          $body.text().toLowerCase().includes('type') ||
          $body.text().toLowerCase().includes('upload') ||
          $body.text().toLowerCase().includes('draw')
        
        if (hasSignatureOptions) {
          // Try text signature if available
          cy.get('input[type="text"]').first().type('John Doe')
        }
      })
      
      // Apply signature
      cy.contains('Sign', { matchCase: false }).click()
      cy.waitForProcessing()
      cy.expectDownload('Download')
    })
  })

  // Cross-tool responsive test
  it('should work on mobile for all advanced tools', () => {
    cy.viewport(375, 812)
    
    const tools = [
      '/tools/pdf-organize',
      '/tools/pdf-watermark', 
      '/tools/pdf-pagenum',
      '/tools/pdf-sign'
    ]
    
    tools.forEach(tool => {
      cy.visit(tool)
      
      // Interface should be usable
      cy.get('h1').should('be.visible')
      cy.get('input[type="file"]').should('exist')
      
      // Upload should work
      cy.upload('input[type="file"]', ['sample.pdf'])
      cy.wait(500)
      
      // Should show file uploaded
      cy.assertVisibleText('sample.pdf')
    })
  })
})

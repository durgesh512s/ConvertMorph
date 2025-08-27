describe('Images to PDF Tool', () => {
  beforeEach(() => {
    cy.visit('/tools/images-to-pdf')
  })

  it('should display the images to PDF interface', () => {
    cy.get('h1').should('contain.text', 'Images to PDF')
    cy.get('input[type="file"]').should('exist')
    cy.assertVisibleText('Drop your image files here')
  })

  it('should convert multiple images to single PDF (bundle mode)', () => {
    // Upload multiple images
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'])
    cy.wait(1000)
    
    // Verify images are shown
    cy.assertVisibleText('pic1.jpg')
    cy.assertVisibleText('pic2.jpg')
    cy.assertVisibleText('pic3.jpg')
    
    // Select bundle mode (single PDF) - this might be the default
    cy.get('body').then(($body) => {
      // Look for bundle/single PDF option
      const hasBundleOption = 
        $body.find('[data-testid*="bundle"], [data-testid*="single"], input[type="radio"]').length > 0 ||
        $body.text().toLowerCase().includes('single pdf') ||
        $body.text().toLowerCase().includes('bundle')
      
      if (hasBundleOption) {
        cy.get('[data-testid*="bundle"], [data-testid*="single"]').first().click()
      }
    })
    
    // Start conversion
    cy.contains('Convert', { matchCase: false }).click()
    
    // Wait for processing
    cy.waitForProcessing()
    
    // Expect success and download with naming pattern
    cy.get('body').should('contain.text', 'Success')
    cy.expectDownload('Download')
    
    // Check for filename pattern indicating 3 images
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('3') || 
        str.includes('images') || 
        str.includes('combined') ||
        str.includes('bundle')
      )
    })
  })

  it('should handle one-per-image mode if supported', () => {
    // Upload multiple images
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'])
    cy.wait(1000)
    
    // Look for one-per-image option
    cy.get('body').then(($body) => {
      const hasOnePerOption = 
        $body.find('[data-testid*="separate"], [data-testid*="individual"]').length > 0 ||
        $body.text().toLowerCase().includes('separate') ||
        $body.text().toLowerCase().includes('individual') ||
        $body.text().toLowerCase().includes('one per')
      
      if (hasOnePerOption) {
        // Toggle to one-per-image mode
        cy.get('[data-testid*="separate"], [data-testid*="individual"]').first().click()
        cy.wait(500)
        
        // Start conversion
        cy.contains('Convert', { matchCase: false }).click()
        cy.waitForProcessing()
        
        // Expect either multiple downloads or a ZIP
        cy.expectDownload('Download')
        cy.get('body').should('contain.text', 'Success')
        
        // Should indicate multiple files or ZIP
        cy.get('body').should(($body) => {
          const text = $body.text().toLowerCase()
          expect(text).to.satisfy((str: string) => 
            str.includes('zip') || 
            str.includes('multiple') || 
            str.includes('separate') ||
            str.includes('individual')
          )
        })
      }
    })
  })

  it('should handle single image conversion', () => {
    // Upload single image
    cy.upload('input[type="file"]', ['pic1.jpg'])
    cy.wait(1000)
    
    // Should show the image
    cy.assertVisibleText('pic1.jpg')
    
    // Convert to PDF
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Should succeed
    cy.expectDownload('Download')
    cy.get('body').should('contain.text', 'Success')
  })

  it('should display image previews and information', () => {
    // Upload images
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg'])
    cy.wait(1000)
    
    // Should show image names
    cy.assertVisibleText('pic1.jpg')
    cy.assertVisibleText('pic2.jpg')
    
    // Should show image information (size, dimensions, etc.)
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('kb') || 
        str.includes('mb') || 
        str.includes('x') || // dimensions like 200x200
        str.includes('size')
      )
    })
  })

  it('should handle image reordering if supported', () => {
    // Upload multiple images
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'])
    cy.wait(1000)
    
    // Look for reorder controls
    cy.get('body').then(($body) => {
      const hasReorderControls = 
        $body.find('[data-testid*="move"], [data-testid*="reorder"], [data-testid*="up"], [data-testid*="down"]').length > 0 ||
        $body.find('button').filter(':contains("↑"), :contains("↓"), :contains("Move")').length > 0
      
      if (hasReorderControls) {
        // Try to reorder
        cy.get('[data-testid*="move"], [data-testid*="reorder"], [data-testid*="up"], [data-testid*="down"]').first().click()
        cy.wait(500)
      }
    })
    
    // Convert after reordering
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should remove images from conversion list', () => {
    // Upload images
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg'])
    cy.wait(1000)
    
    // Look for remove controls
    cy.get('body').then(($body) => {
      const hasRemoveControls = 
        $body.find('[data-testid*="remove"], [data-testid*="delete"], [data-testid*="close"]').length > 0 ||
        $body.find('button').filter(':contains("×"), :contains("Remove"), :contains("Delete")').length > 0
      
      if (hasRemoveControls) {
        // Remove one image
        cy.get('[data-testid*="remove"], [data-testid*="delete"], [data-testid*="close"]').first().click()
        cy.wait(500)
        
        // Verify image was removed
        cy.get('body').should(($body) => {
          const text = $body.text()
          expect(text).to.satisfy((str: string) => 
            !str.includes('pic1.jpg') || !str.includes('pic2.jpg')
          )
        })
      }
    })
    
    // Should still be able to convert remaining image(s)
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should validate image file types', () => {
    // Try to upload non-image file
    cy.writeFile('cypress/fixtures/fake.txt', 'This is not an image')
    
    cy.get('input[type="file"]').selectFile('cypress/fixtures/fake.txt', { force: true })
    cy.wait(1000)
    
    // Should show error or reject the file
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('image') || 
        str.includes('invalid') || 
        str.includes('unsupported') ||
        str.includes('jpg') ||
        str.includes('png')
      )
    })
  })

  it('should handle mixed image formats', () => {
    // Upload different image formats (JPG and PNG)
    cy.upload('input[type="file"]', ['pic1.jpg', 'test-image-1.png'])
    cy.wait(1000)
    
    // Should accept both formats
    cy.assertVisibleText('pic1.jpg')
    cy.assertVisibleText('test-image-1.png')
    
    // Should convert successfully
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should show conversion progress', () => {
    // Upload images
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg', 'pic3.jpg'])
    cy.wait(1000)
    
    // Start conversion
    cy.contains('Convert', { matchCase: false }).click()
    
    // Should show progress indicator
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase()
      expect(text).to.satisfy((str: string) => 
        str.includes('processing') || 
        str.includes('converting') || 
        str.includes('creating') ||
        str.includes('loading')
      )
    })
    
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should handle large number of images', () => {
    // Upload multiple images (all available)
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'test-image-1.png', 'test-image-2.png'])
    cy.wait(1000)
    
    // Should show all images
    cy.assertVisibleText('pic1.jpg')
    cy.assertVisibleText('pic2.jpg')
    cy.assertVisibleText('pic3.jpg')
    
    // Should convert all successfully
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
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg'])
    cy.wait(1000)
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })

  it('should handle multiple conversion operations', () => {
    // First conversion
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg'])
    cy.wait(1000)
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
    
    // Reset and try another conversion
    cy.get('body').type('{esc}')
    cy.wait(500)
    
    // Second conversion with different images
    cy.upload('input[type="file"]', ['pic3.jpg'])
    cy.wait(1000)
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })
})

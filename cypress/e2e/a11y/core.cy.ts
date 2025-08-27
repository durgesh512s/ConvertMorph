describe('Accessibility Core Tests', () => {
  
  it('should have accessible dropzone with proper ARIA attributes', () => {
    cy.visit('/tools/pdf-compress')
    
    // Check dropzone accessibility
    cy.get('[role="button"], [data-testid*="dropzone"], .dropzone').should(($el) => {
      const element = $el[0]
      
      // Should have role="button" or be a button
      expect(element.getAttribute('role') === 'button' || element.tagName === 'BUTTON').to.be.true
      
      // Should be focusable (tabIndex 0 or naturally focusable)
      const tabIndex = element.getAttribute('tabindex')
      expect(tabIndex === '0' || element.tagName === 'BUTTON' || element.tagName === 'INPUT').to.be.true
      
      // Should have aria-label or accessible name
      const hasAccessibleName = 
        element.getAttribute('aria-label') ||
        element.getAttribute('aria-labelledby') ||
        element.textContent?.trim()
      expect(hasAccessibleName).to.exist
    })
    
    // Test keyboard focus
    cy.get('[role="button"], [data-testid*="dropzone"], .dropzone').first().focus()
    cy.focused().should('be.visible')
    
    // Test keyboard activation (Enter/Space)
    cy.focused().type('{enter}')
    // File dialog should be triggered (we can't test the actual dialog, but no errors should occur)
    
    cy.focused().type(' ')
    // Space should also trigger file dialog
  })

  it('should support global keyboard shortcuts', () => {
    cy.visit('/tools/pdf-compress')
    
    // Test Ctrl/Cmd+U to open file dialog
    cy.get('body').type('{ctrl+u}')
    
    // Should not cause any errors and file input should exist
    cy.get('input[type="file"]').should('exist')
    
    // Upload a file to test other shortcuts
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Process the file
    cy.contains('Compress', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Test D key for download (if download is available)
    cy.get('body').then(($body) => {
      if ($body.find('a[download], [data-testid*="download"]').length > 0) {
        cy.get('body').type('d')
        // Should trigger download or focus download button
      }
    })
    
    // Test Esc to clear selection
    cy.get('body').type('{esc}')
    cy.wait(500)
    // Should reset or clear the interface
  })

  it('should have visible focus indicators', () => {
    cy.visit('/')
    
    // Test focus visibility on interactive elements
    const interactiveSelectors = [
      'button',
      'a[href]',
      'input',
      '[role="button"]',
      '[tabindex="0"]'
    ]
    
    interactiveSelectors.forEach(selector => {
      cy.get(selector).then(($elements) => {
        if ($elements.length > 0) {
          cy.wrap($elements.first()).focus()
          
          // Check for focus indicators
          cy.focused().should(($el) => {
            const styles = window.getComputedStyle($el[0])
            const hasVisibleFocus = 
              styles.outline !== 'none' ||
              styles.boxShadow !== 'none' ||
              $el.hasClass('focus-visible') ||
              $el.hasClass('focus') ||
              styles.border !== styles.borderColor // border change on focus
            
            // At least one focus indicator should be present
            expect(hasVisibleFocus).to.be.true
          })
        }
      })
    })
  })

  it('should have proper heading structure', () => {
    const pages = ['/', '/tools', '/tools/pdf-compress', '/tools/pdf-merge']
    
    pages.forEach(page => {
      cy.visit(page)
      
      // Should have at least one h1
      cy.get('h1').should('have.length.at.least', 1)
      
      // Check heading hierarchy (no skipping levels)
      cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
        const headingLevels = Array.from($headings).map(h => parseInt(h.tagName.charAt(1)))
        
        for (let i = 1; i < headingLevels.length; i++) {
          const current = headingLevels[i]
          const previous = headingLevels[i - 1]
          
          // Should not skip more than one level
          expect(current - previous).to.be.at.most(1)
        }
      })
    })
  })

  it('should have accessible form labels', () => {
    cy.visit('/tools/pdf-compress')
    
    // Check that form inputs have proper labels
    cy.get('input, select, textarea').each(($input) => {
      const input = $input[0] as HTMLInputElement
      const id = input.getAttribute('id')
      const ariaLabel = input.getAttribute('aria-label')
      const ariaLabelledBy = input.getAttribute('aria-labelledby')
      
      // Should have one of: associated label, aria-label, or aria-labelledby
      const hasLabel = 
        (id && Cypress.$(`label[for="${id}"]`).length > 0) ||
        ariaLabel ||
        ariaLabelledBy ||
        input.type === 'file' // File inputs often have implicit labeling
      
      if (input.type !== 'hidden') {
        expect(hasLabel).to.exist
      }
    })
  })

  it('should have accessible navigation', () => {
    cy.visit('/')
    
    // Navigation should be in a nav element or have role="navigation"
    cy.get('nav, [role="navigation"]').should('exist')
    
    // Navigation links should be keyboard accessible
    cy.get('nav a, [role="navigation"] a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href')
      
      // Should be focusable
      cy.wrap($link).focus()
      cy.focused().should('be.visible')
    })
    
    // Test keyboard navigation through nav items
    cy.get('nav a, [role="navigation"] a').first().focus()
    
    // Tab through navigation items
    for (let i = 0; i < 3; i++) {
      cy.focused().should('be.visible')
      cy.focused().type('{tab}')
    }
  })

  it('should have accessible buttons and controls', () => {
    cy.visit('/tools/pdf-compress')
    
    // All buttons should have accessible names
    cy.get('button, [role="button"]').each(($button) => {
      const button = $button[0]
      const hasAccessibleName = 
        button.textContent?.trim() ||
        button.getAttribute('aria-label') ||
        button.getAttribute('aria-labelledby') ||
        button.getAttribute('title')
      
      expect(hasAccessibleName).to.exist
    })
    
    // Buttons should be keyboard accessible
    cy.get('button').first().focus()
    cy.focused().should('be.visible')
    
    // Should respond to Enter and Space
    cy.focused().type('{enter}')
    cy.wait(100)
    cy.focused().type(' ')
  })

  it('should have accessible error messages', () => {
    cy.visit('/tools/pdf-compress')
    
    // Try to trigger an error by uploading invalid file
    cy.writeFile('cypress/fixtures/invalid.pdf', 'Not a real PDF')
    cy.get('input[type="file"]').selectFile('cypress/fixtures/invalid.pdf', { force: true })
    cy.wait(1000)
    
    // Check if error message appears and is accessible
    cy.get('body').then(($body) => {
      const hasError = $body.text().toLowerCase().includes('error') ||
                      $body.text().toLowerCase().includes('invalid') ||
                      $body.find('[role="alert"], .error, .alert').length > 0
      
      if (hasError) {
        // Error should be announced to screen readers
        cy.get('[role="alert"], .error, .alert').should('be.visible')
        
        // Error should be associated with the input if possible
        cy.get('[aria-describedby], [aria-invalid="true"]').should('exist')
      }
    })
  })

  it('should have accessible loading states', () => {
    cy.visit('/tools/pdf-compress')
    
    // Upload file and start processing
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress', { matchCase: false }).click()
    
    // Check for accessible loading indicators
    cy.get('body').should(($body) => {
      const hasLoadingIndicator = 
        $body.find('[role="status"], [aria-live], .loading, [aria-busy="true"]').length > 0 ||
        $body.text().toLowerCase().includes('processing') ||
        $body.text().toLowerCase().includes('loading')
      
      expect(hasLoadingIndicator).to.be.true
    })
    
    cy.waitForProcessing()
  })

  it('should have accessible download controls', () => {
    cy.visit('/tools/pdf-compress')
    
    // Process a file to get download
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Download button should be accessible
    cy.get('a[download], [data-testid*="download"], button').then(($downloads) => {
      if ($downloads.length > 0) {
        const download = $downloads[0]
        
        // Should have accessible name
        const hasAccessibleName = 
          download.textContent?.trim() ||
          download.getAttribute('aria-label') ||
          download.getAttribute('title')
        
        expect(hasAccessibleName).to.exist
        
        // Should be keyboard accessible
        cy.wrap(download).focus()
        cy.focused().should('be.visible')
      }
    })
  })

  it('should work with keyboard-only navigation', () => {
    cy.visit('/tools/pdf-compress')
    
    // Navigate entire interface using only keyboard
    cy.get('body').type('{tab}') // Focus first interactive element
    
    // Should be able to reach file input
    let foundFileInput = false
    for (let i = 0; i < 10; i++) {
      cy.focused().then(($el) => {
        if ($el.attr('type') === 'file' || $el.closest('[data-testid*="dropzone"]').length > 0) {
          foundFileInput = true
        }
      })
      
      if (!foundFileInput) {
        cy.focused().type('{tab}')
      } else {
        break
      }
    }
    
    // Should be able to upload file via keyboard
    cy.focused().type('{enter}')
    
    // Upload file programmatically since we can't control file dialog
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Should be able to find and activate process button
    cy.contains('Compress', { matchCase: false }).focus()
    cy.focused().type('{enter}')
    
    cy.waitForProcessing()
    cy.expectDownload('Download')
  })
})

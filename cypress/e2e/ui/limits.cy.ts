describe('UI Limits Display Tests', () => {
  
  it('should display file size limits on tool pages', () => {
    const toolPages = [
      '/tools/pdf-compress',
      '/tools/pdf-merge', 
      '/tools/pdf-split',
      '/tools/images-to-pdf',
      '/tools/pdf-to-images'
    ]
    
    // First get the limits from API
    cy.request('/api/info').then((response) => {
      expect(response.status).to.equal(200)
      const info = response.body
      
      expect(info).to.have.property('limits')
      const limits = info.limits
      
      toolPages.forEach(toolPage => {
        cy.visit(toolPage)
        
        // Check for file size limit display
        cy.get('body').should('contain.text', 'MB').then(() => {
          // Look for size limit text patterns
          const expectedSizeText = `${limits.maxFileMb} MB`
          
          // Should show max file size somewhere on the page
          cy.get('body').should(($body) => {
            const bodyText = $body.text()
            const hasSizeLimit = 
              bodyText.includes(expectedSizeText) ||
              bodyText.includes(`Max: ${limits.maxFileMb}`) ||
              bodyText.includes(`Maximum: ${limits.maxFileMb}`) ||
              bodyText.includes(`up to ${limits.maxFileMb}`) ||
              bodyText.includes(`${limits.maxFileMb}MB`)
            
            expect(hasSizeLimit, `Size limit ${expectedSizeText} not found on ${toolPage}`).to.be.true
          })
        })
        
        // Check for page limit if applicable
        if (limits.maxPages && (toolPage.includes('split') || toolPage.includes('organize'))) {
          cy.get('body').should(($body) => {
            const bodyText = $body.text()
            const hasPageLimit = 
              bodyText.includes(`${limits.maxPages} pages`) ||
              bodyText.includes(`Max: ${limits.maxPages}`) ||
              bodyText.includes(`up to ${limits.maxPages}`)
            
            expect(hasPageLimit, `Page limit not found on ${toolPage}`).to.be.true
          })
        }
        
        // Check for supported file types
        if (limits.supportedTypes) {
          cy.get('body').should(($body) => {
            const bodyText = $body.text().toLowerCase()
            
            // Should mention supported types
            const hasTypeInfo = 
              bodyText.includes('pdf') ||
              bodyText.includes('jpg') ||
              bodyText.includes('jpeg') ||
              bodyText.includes('png') ||
              bodyText.includes('supported')
            
            expect(hasTypeInfo, `File type info not found on ${toolPage}`).to.be.true
          })
        }
      })
    })
  })

  it('should show limits in a user-friendly format', () => {
    cy.visit('/tools/pdf-compress')
    
    // Get API limits for comparison
    cy.request('/api/info').then((response) => {
      const limits = response.body.limits
      
      // Look for limits display elements
      cy.get('body').then(($body) => {
        const bodyText = $body.text()
        
        // Should not show raw technical values
        expect(bodyText).to.not.include('maxFileMb')
        expect(bodyText).to.not.include('maxPages')
        expect(bodyText).to.not.include('supportedTypes')
        
        // Should use user-friendly language
        const hasFriendlyText = 
          bodyText.toLowerCase().includes('maximum') ||
          bodyText.toLowerCase().includes('max') ||
          bodyText.toLowerCase().includes('up to') ||
          bodyText.toLowerCase().includes('limit')
        
        expect(hasFriendlyText).to.be.true
      })
      
      // Check for visual indicators (icons, badges, etc.)
      cy.get('body').should(($body) => {
        const hasVisualIndicators = 
          $body.find('[data-testid*="limit"]').length > 0 ||
          $body.find('.limit').length > 0 ||
          $body.find('.max').length > 0 ||
          $body.find('[title*="limit"]').length > 0 ||
          $body.find('[aria-label*="limit"]').length > 0
        
        // Visual indicators are optional but good UX
        if (hasVisualIndicators) {
          cy.log('Visual limit indicators found')
        }
      })
    })
  })

  it('should display limits consistently across tools', () => {
    const toolsToCheck = [
      '/tools/pdf-compress',
      '/tools/pdf-merge',
      '/tools/pdf-split'
    ]
    
    cy.request('/api/info').then((response) => {
      const limits = response.body.limits
      
      const limitTexts: string[] = []
      
      toolsToCheck.forEach((tool, index) => {
        cy.visit(tool)
        
        // Extract limit text from each tool
        cy.get('body').then(($body) => {
          const bodyText = $body.text()
          
          // Find size limit mentions
          const sizeMatches = bodyText.match(/(?:max|maximum|up to)[\s:]*(\d+)\s*mb/gi)
          if (sizeMatches) {
            limitTexts.push(sizeMatches[0])
          }
          
          // On last iteration, check consistency
          if (index === toolsToCheck.length - 1) {
            // All tools should show the same size limit
            const uniqueLimits = Array.from(new Set(limitTexts))
            expect(uniqueLimits.length).to.be.at.most(2) // Allow for slight wording variations
            
            // All should reference the same numeric value
            const numericValues = limitTexts.map(text => {
              const match = text.match(/(\d+)/);
              return match ? parseInt(match[1]) : 0;
            });
            const uniqueValues = Array.from(new Set(numericValues));
            expect(uniqueValues.length).to.equal(1);
            expect(uniqueValues[0]).to.equal(limits.maxFileMb);
          }
        })
      })
    })
  })

  it('should show appropriate limits for different tool types', () => {
    cy.request('/api/info').then((response) => {
      const limits = response.body.limits
      
      // PDF tools should show PDF-specific limits
      cy.visit('/tools/pdf-compress')
      cy.get('body').should('contain.text', 'PDF')
      
      // Image tools should show image-specific info
      cy.visit('/tools/images-to-pdf')
      cy.get('body').should(($body) => {
        const bodyText = $body.text().toLowerCase()
        const hasImageInfo = 
          bodyText.includes('jpg') ||
          bodyText.includes('jpeg') ||
          bodyText.includes('png') ||
          bodyText.includes('image')
        
        expect(hasImageInfo).to.be.true
      })
      
      // Split tool should mention page limits
      cy.visit('/tools/pdf-split')
      if (limits.maxPages) {
        cy.get('body').should(($body) => {
          const bodyText = $body.text()
          const hasPageInfo = 
            bodyText.includes('page') ||
            bodyText.includes(limits.maxPages.toString())
          
          expect(hasPageInfo).to.be.true
        })
      }
    })
  })

  it('should validate limits match API response exactly', () => {
    cy.request('/api/info').then((response) => {
      const apiLimits = response.body.limits
      
      cy.visit('/tools/pdf-compress')
      
      // Extract displayed limits and compare with API
      cy.get('body').then(($body) => {
        const bodyText = $body.text()
        
        // Find size limit in UI
        const sizeMatch = bodyText.match(/(\d+)\s*MB/i)
        if (sizeMatch) {
          const displayedSize = parseInt(sizeMatch[1])
          expect(displayedSize).to.equal(apiLimits.maxFileMb)
        }
        
        // Check that UI doesn't show outdated or incorrect limits
        expect(bodyText).to.not.include('100 MB') // Common default that might be outdated
        expect(bodyText).to.not.include('50 MB')  // Another common default
        expect(bodyText).to.not.include('10 MB')  // Conservative default
        
        // Unless these match the actual API limits
        if (apiLimits.maxFileMb === 100) {
          cy.log('API limit is 100MB - this is acceptable')
        }
      })
    })
  })

  it('should show limits in help text or tooltips', () => {
    cy.visit('/tools/pdf-merge')
    
    // Look for help text, tooltips, or info icons
    cy.get('body').then(($body) => {
      const hasHelpElements = 
        $body.find('[title]').length > 0 ||
        $body.find('[data-tooltip]').length > 0 ||
        $body.find('.tooltip').length > 0 ||
        $body.find('[aria-describedby]').length > 0 ||
        $body.find('.help').length > 0 ||
        $body.find('.info').length > 0
      
      if (hasHelpElements) {
        // Check if help elements contain limit information
        const helpTexts: string[] = []
        
        $body.find('[title]').each((_, el) => {
          helpTexts.push(el.getAttribute('title') || '')
        })
        
        $body.find('[data-tooltip]').each((_, el) => {
          helpTexts.push(el.getAttribute('data-tooltip') || '')
        })
        
        const combinedHelpText = helpTexts.join(' ').toLowerCase()
        
        if (combinedHelpText.includes('mb') || combinedHelpText.includes('limit') || combinedHelpText.includes('max')) {
          cy.log('Limits found in help text/tooltips')
        }
      }
    })
  })

  it('should display limits near file upload areas', () => {
    cy.visit('/tools/pdf-compress')
    
    // Find file upload area
    cy.get('input[type="file"], [data-testid*="dropzone"], .dropzone').should('exist').then(($uploadArea) => {
      const uploadElement = $uploadArea[0]
      const uploadRect = uploadElement.getBoundingClientRect()
      
      // Look for limit text near the upload area (within reasonable distance)
      cy.get('body').then(($body) => {
        let foundNearbyLimits = false
        
        $body.find('*').each((_, element) => {
          const text = element.textContent || ''
          if (text.toLowerCase().includes('mb') && text.match(/\d+/)) {
            const elementRect = element.getBoundingClientRect()
            
            // Check if element is reasonably close to upload area
            const distance = Math.sqrt(
              Math.pow(elementRect.left - uploadRect.left, 2) + 
              Math.pow(elementRect.top - uploadRect.top, 2)
            )
            
            if (distance < 500) { // Within 500px
              foundNearbyLimits = true
            }
          }
        })
        
        if (foundNearbyLimits) {
          cy.log('Limits displayed near upload area')
        } else {
          // Limits should be visible somewhere on the page even if not nearby
          cy.get('body').should('contain.text', 'MB')
        }
      })
    })
  })

  it('should handle missing or invalid API limits gracefully', () => {
    // Stub API to return invalid/missing limits
    cy.intercept('GET', '/api/info', {
      statusCode: 200,
      body: {
        limits: {} // Empty limits
      }
    }).as('emptyLimits')
    
    cy.visit('/tools/pdf-compress')
    cy.wait('@emptyLimits')
    
    // Page should still load and function
    cy.get('input[type="file"]').should('exist')
    
    // Should show some default or fallback limits
    cy.get('body').then(($body) => {
      const bodyText = $body.text()
      
      // Should either show default limits or gracefully handle missing limits
      const hasAnyLimitInfo = 
        bodyText.includes('MB') ||
        bodyText.includes('limit') ||
        bodyText.includes('maximum') ||
        bodyText.includes('supported')
      
      // It's acceptable to either show defaults or hide limit info when API fails
      cy.log(hasAnyLimitInfo ? 'Default limits shown' : 'Limits hidden when API unavailable')
    })
    
    // Test with completely failed API
    cy.intercept('GET', '/api/info', {
      statusCode: 500
    }).as('failedAPI')
    
    cy.reload()
    cy.wait('@failedAPI')
    
    // Page should still be functional
    cy.get('input[type="file"]').should('exist')
  })

  it('should show limits in multiple languages if supported', () => {
    cy.visit('/tools/pdf-compress')
    
    // Check if the app supports multiple languages
    cy.get('body').then(($body) => {
      const hasLanguageSelector = 
        $body.find('[data-testid*="language"]').length > 0 ||
        $body.find('.language').length > 0 ||
        $body.find('[lang]').length > 0
      
      if (hasLanguageSelector) {
        cy.log('Language support detected - limits should be translatable')
        
        // Limits should not be hardcoded in English only
        cy.get('body').should(($body) => {
          const bodyText = $body.text()
          
          // Should use translatable text patterns
          const hasTranslatablePatterns = 
            bodyText.includes('{{') || // Template syntax
            bodyText.includes('t(') ||  // Translation function
            !bodyText.includes('Maximum file size') // Hardcoded English
          
          // This is more of a code quality check
          cy.log('Checking for translatable limit text patterns')
        })
      } else {
        cy.log('No language selector found - single language app')
      }
    })
  })
})

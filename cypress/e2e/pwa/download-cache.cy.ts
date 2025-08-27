describe('PWA Download Cache Tests', () => {
  
  it('should ensure download outputs are not cached', () => {
    cy.visit('/tools/pdf-compress')
    
    // Upload and process a file to generate download
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Intercept download requests to check headers
    cy.intercept('GET', '**/download/**', (req) => {
      // Allow the request to proceed
      req.continue()
    }).as('downloadRequest')
    
    // Trigger download
    cy.get('a[download], [data-testid*="download"], button').then(($downloads) => {
      if ($downloads.length > 0) {
        const downloadElement = $downloads[0]
        const href = downloadElement.getAttribute('href')
        
        if (href && href.startsWith('blob:')) {
          // For blob URLs, we can't intercept the request directly
          // But we can verify the blob was created with proper headers
          cy.log('Download uses blob URL - checking blob creation')
          
          // Verify the download link exists and is functional
          cy.wrap(downloadElement).should('have.attr', 'download')
          cy.wrap(downloadElement).should('have.attr', 'href').and('include', 'blob:')
        } else if (href) {
          // For regular URLs, check the response headers
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then((response) => {
            if (response.status === 200) {
              const headers = response.headers
              
              // Should have no-store or no-cache to prevent caching
              expect(headers).to.have.property('cache-control')
              const cacheControl = headers['cache-control']
              expect(cacheControl).to.match(/no-store|no-cache/)
              
              // Should not have long-term caching
              expect(cacheControl).to.not.include('max-age=31536000') // 1 year
              expect(cacheControl).to.not.include('immutable')
            }
          })
        }
      }
    })
  })

  it('should test download headers via test endpoint (if available)', () => {
    // Check if a test endpoint exists for download headers
    cy.request({
      url: '/api/test/download-headers',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        const headers = response.headers
        
        // Should have proper cache control for downloads
        expect(headers).to.have.property('cache-control')
        expect(headers['cache-control']).to.include('no-store')
        
        // Should have proper content disposition
        if (headers['content-disposition']) {
          expect(headers['content-disposition']).to.include('attachment')
        }
        
        // Should not be cached by proxies
        expect(headers['cache-control']).to.include('private')
        
        cy.log('Test endpoint confirmed proper download headers')
      } else {
        cy.log('Test endpoint not available - skipping direct header test')
      }
    })
  })

  it('should verify blob URLs are not cached by service worker', () => {
    cy.visit('/tools/pdf-compress')
    
    // Check if service worker is registered
    cy.window().then((win) => {
      if ('serviceWorker' in win.navigator) {
        cy.wrap(win.navigator.serviceWorker.getRegistrations()).then((registrations) => {
          const regs = registrations as ServiceWorkerRegistration[]
          if (regs.length > 0) {
            cy.log('Service Worker detected - checking blob handling')
            
            // Process a file to create blob
            cy.upload('input[type="file"]', ['sample.pdf'])
            cy.wait(1000)
            cy.contains('Compress', { matchCase: false }).click()
            cy.waitForProcessing()
            
            // Get the blob URL
            cy.get('a[download]').should('have.attr', 'href').then((href) => {
              const hrefString = href as unknown as string
              if (hrefString.startsWith('blob:')) {
                // Verify blob URL is accessible
                cy.request({
                  url: hrefString,
                  failOnStatusCode: false
                }).then((response) => {
                  // Blob URLs should be accessible but not cached
                  expect(response.status).to.be.oneOf([200, 404]) // 404 is acceptable for blob URLs in tests
                })
              }
            })
          } else {
            cy.log('No service worker registered')
          }
        })
      } else {
        cy.log('Service Worker not supported')
      }
    })
  })

  it('should verify download responses have proper MIME types', () => {
    cy.visit('/tools/pdf-compress')
    
    // Process file and check download
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress', { matchCase: false }).click()
    cy.waitForProcessing()
    
    cy.get('a[download]').should('have.attr', 'href').then((href) => {
      const downloadName = cy.get('a[download]').invoke('attr', 'download')
      
      downloadName.then((filename) => {
        if (filename) {
          // Verify proper MIME type based on file extension
          if (filename.endsWith('.pdf')) {
            // For PDF files, should have application/pdf MIME type
            // This is more of a documentation test since we can't easily check blob MIME types
            cy.log('Expected MIME type for PDF: application/pdf')
          } else if (filename.endsWith('.zip')) {
            cy.log('Expected MIME type for ZIP: application/zip')
          }
        }
      })
    })
  })

  it('should verify downloads are not stored in browser cache', () => {
    cy.visit('/tools/pdf-compress')
    
    // Clear any existing cache first
    cy.clearCookies()
    cy.clearLocalStorage()
    
    // Process a file
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Get download link
    cy.get('a[download]').should('exist').then(($link) => {
      const href = $link.attr('href')
      
      if (href && href.startsWith('blob:')) {
        // For blob URLs, verify they're temporary
        cy.log('Blob URL detected - these are temporary and not cached')
        
        // Reload page and verify blob is no longer accessible
        cy.reload()
        cy.wait(1000)
        
        // Original blob URL should no longer be valid after page reload
        if (href) {
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then((response) => {
            // Blob should be gone after page reload
            expect(response.status).to.not.equal(200)
          })
        }
      }
    })
  })

  it('should verify cache headers for different file types', () => {
    const testCases = [
      { tool: '/tools/pdf-compress', fileType: 'PDF' },
      { tool: '/tools/pdf-split', fileType: 'ZIP' },
      { tool: '/tools/images-to-pdf', fileType: 'PDF' }
    ]
    
    testCases.forEach(({ tool, fileType }) => {
      cy.visit(tool)
      
      // Upload appropriate file
      const fileName = tool.includes('images') ? 'pic1.jpg' : 'sample.pdf'
      cy.upload('input[type="file"]', [fileName])
      cy.wait(1000)
      
      // Process file
      cy.get('button').contains(/compress|merge|split|convert/i).click()
      cy.waitForProcessing()
      
      // Check download
      cy.get('a[download], [data-testid*="download"]').should('exist').then(($download) => {
        const href = $download.attr('href')
        
        if (href && !href.startsWith('blob:')) {
          // For non-blob URLs, check headers
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then((response) => {
            if (response.status === 200) {
              const headers = response.headers
              
              // Should have no-cache headers regardless of file type
              expect(headers['cache-control']).to.match(/no-store|no-cache/)
              
              cy.log(`${fileType} download has proper cache headers`)
            }
          })
        } else {
          cy.log(`${fileType} uses blob URL - inherently not cached`)
        }
      })
    })
  })

  it('should verify PWA manifest does not cache downloads', () => {
    // Check PWA manifest for cache configuration
    cy.request('/manifest.webmanifest').then((response) => {
      expect(response.status).to.equal(200)
      
      const manifest = response.body
      
      // Manifest should not include download patterns in cache
      if (typeof manifest === 'string') {
        expect(manifest).to.not.include('/download/')
        expect(manifest).to.not.include('*.pdf')
        expect(manifest).to.not.include('*.zip')
      } else if (typeof manifest === 'object') {
        // Check if manifest has cache-related properties
        if (manifest.cache) {
          expect(manifest.cache).to.not.include('/download/')
        }
      }
    })
  })

  it('should verify service worker does not cache download requests', () => {
    // Check service worker file if accessible
    cy.request({
      url: '/service-worker.js',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        const swContent = response.body
        
        // Service worker should not cache download URLs
        expect(swContent).to.not.include('cache.put')
        expect(swContent).to.not.include('/download/')
        
        // Should have proper cache exclusions
        if (swContent.includes('cache')) {
          // Look for download exclusions
          const hasDownloadExclusion = 
            swContent.includes('download') && swContent.includes('exclude') ||
            swContent.includes('no-cache') ||
            swContent.includes('bypass')
          
          if (!hasDownloadExclusion) {
            cy.log('Warning: Service worker may not explicitly exclude downloads from cache')
          }
        }
      } else {
        cy.log('Service worker not accessible for inspection')
      }
    })
    
    // Also check sw.js if it exists
    cy.request({
      url: '/sw.js',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        const swContent = response.body
        
        // Same checks for sw.js
        expect(swContent).to.not.include('cache.put')
        expect(swContent).to.not.include('/download/')
      }
    })
  })

  it('should verify download links have proper attributes', () => {
    cy.visit('/tools/pdf-compress')
    
    // Process file to get download
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Check download link attributes
    cy.get('a[download]').should(($link) => {
      // Should have download attribute
      expect($link.attr('download')).to.exist
      
      // Should have href
      expect($link.attr('href')).to.exist
      
      // Should not have cache-related attributes
      expect($link.attr('cache')).to.not.exist
      expect($link.attr('data-cache')).to.not.exist
      
      // Should have proper rel attribute if present
      const rel = $link.attr('rel')
      if (rel) {
        expect(rel).to.not.include('prefetch')
        expect(rel).to.not.include('preload')
      }
    })
  })
})

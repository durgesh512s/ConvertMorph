describe('SEO & JSON-LD Schema Tests', () => {
  
  it('should have SoftwareApplication JSON-LD on tool pages', () => {
    const toolPages = [
      '/tools/pdf-compress',
      '/tools/pdf-merge',
      '/tools/pdf-split',
      '/tools/images-to-pdf',
      '/tools/pdf-to-images'
    ]
    
    toolPages.forEach(page => {
      cy.visit(page)
      
      // Check for JSON-LD script with SoftwareApplication
      cy.get('script[type="application/ld+json"]').should('exist').then(($scripts) => {
        let foundSoftwareApp = false
        
        $scripts.each((index, script) => {
          try {
            const jsonData = JSON.parse(script.textContent || '')
            if (jsonData['@type'] === 'SoftwareApplication' || 
                (Array.isArray(jsonData) && jsonData.some(item => item['@type'] === 'SoftwareApplication'))) {
              foundSoftwareApp = true
            }
          } catch (e) {
            // Skip invalid JSON
          }
        })
        
        expect(foundSoftwareApp, `SoftwareApplication JSON-LD not found on ${page}`).to.be.true
      })
      
      // Verify the JSON-LD contains expected SoftwareApplication properties
      cy.get('script[type="application/ld+json"]').then(($scripts) => {
        $scripts.each((index, script) => {
          try {
            const jsonData = JSON.parse(script.textContent || '')
            const softwareApp = jsonData['@type'] === 'SoftwareApplication' ? jsonData :
                              Array.isArray(jsonData) ? jsonData.find(item => item['@type'] === 'SoftwareApplication') : null
            
            if (softwareApp) {
              // Should have required properties
              expect(softwareApp).to.have.property('name')
              expect(softwareApp).to.have.property('description')
              expect(softwareApp).to.have.property('url')
              expect(softwareApp).to.have.property('applicationCategory')
              
              // Should have proper schema.org context
              expect(jsonData['@context'] || softwareApp['@context']).to.include('schema.org')
            }
          } catch (e) {
            // Skip invalid JSON
          }
        })
      })
    })
  })

  it('should have FAQPage JSON-LD with Q&A content', () => {
    const pagesWithFAQ = [
      '/tools/pdf-compress',
      '/tools/pdf-merge',
      '/tools/pdf-split'
    ]
    
    pagesWithFAQ.forEach(page => {
      cy.visit(page)
      
      // Check for FAQPage JSON-LD
      cy.get('script[type="application/ld+json"]').should('exist').then(($scripts) => {
        let foundFAQPage = false
        let questionCount = 0
        
        $scripts.each((index, script) => {
          try {
            const jsonData = JSON.parse(script.textContent || '')
            const faqPage = jsonData['@type'] === 'FAQPage' ? jsonData :
                           Array.isArray(jsonData) ? jsonData.find(item => item['@type'] === 'FAQPage') : null
            
            if (faqPage) {
              foundFAQPage = true
              
              // Should have mainEntity with questions
              expect(faqPage).to.have.property('mainEntity')
              expect(faqPage.mainEntity).to.be.an('array')
              
              // Count questions
              questionCount = faqPage.mainEntity.length
              
              // Each question should have proper structure
              faqPage.mainEntity.forEach((qa: { '@type': string; name: string; acceptedAnswer: { '@type': string; text: string } }) => {
                expect(qa['@type']).to.equal('Question')
                expect(qa).to.have.property('name') // Question text
                expect(qa).to.have.property('acceptedAnswer')
                expect(qa.acceptedAnswer['@type']).to.equal('Answer')
                expect(qa.acceptedAnswer).to.have.property('text') // Answer text
              })
            }
          } catch (e) {
            // Skip invalid JSON
          }
        })
        
        if (foundFAQPage) {
          expect(questionCount, `Should have at least 2 Q&A pairs on ${page}`).to.be.at.least(2)
        }
      })
    })
  })

  it('should have proper meta tags on tool pages', () => {
    const toolPages = [
      { path: '/tools/pdf-compress', toolName: 'PDF Compress' },
      { path: '/tools/pdf-merge', toolName: 'PDF Merge' },
      { path: '/tools/pdf-split', toolName: 'PDF Split' },
      { path: '/tools/images-to-pdf', toolName: 'Images to PDF' },
      { path: '/tools/pdf-to-images', toolName: 'PDF to Images' }
    ]
    
    toolPages.forEach(({ path, toolName }) => {
      cy.visit(path)
      
      // Title should include tool name
      cy.title().should('include', toolName)
      
      // Should have meta description
      cy.get('meta[name="description"]').should('exist').and('have.attr', 'content').and('not.be.empty')
      
      // Meta description should be meaningful (not just tool name)
      cy.get('meta[name="description"]').should(($meta) => {
        const content = $meta.attr('content') || ''
        expect(content.length).to.be.at.least(50) // Should be descriptive
        expect(content.toLowerCase()).to.include('pdf') // Should mention PDF
      })
      
      // Should have canonical link
      cy.get('link[rel="canonical"]').should('exist').and('have.attr', 'href').then((href) => {
        expect(href).to.include(path)
      })
      
      // Should have Open Graph tags
      cy.get('meta[property="og:title"]').should('exist').and('have.attr', 'content').and('include', toolName)
      cy.get('meta[property="og:description"]').should('exist').and('have.attr', 'content').and('not.be.empty')
      cy.get('meta[property="og:type"]').should('exist').and('have.attr', 'content', 'website')
      cy.get('meta[property="og:url"]').should('exist').and('have.attr', 'content').and('include', path)
      
      // Should have Twitter Card tags
      cy.get('meta[name="twitter:card"]').should('exist').and('have.attr', 'content', 'summary_large_image')
      cy.get('meta[name="twitter:title"]').should('exist').and('have.attr', 'content').and('include', toolName)
      cy.get('meta[name="twitter:description"]').should('exist').and('have.attr', 'content').and('not.be.empty')
    })
  })

  it('should have proper meta tags on main pages', () => {
    const mainPages = [
      { path: '/', title: 'ConvertMorph' },
      { path: '/tools', title: 'Tools' },
      { path: '/about', title: 'About' },
      { path: '/privacy', title: 'Privacy' }
    ]
    
    mainPages.forEach(({ path, title }) => {
      cy.visit(path)
      
      // Title should include page identifier
      cy.title().should('include', title)
      
      // Should have meta description
      cy.get('meta[name="description"]').should('exist').and('have.attr', 'content').and('not.be.empty')
      
      // Should have canonical link
      cy.get('link[rel="canonical"]').should('exist').and('have.attr', 'href')
      
      // Should have viewport meta tag
      cy.get('meta[name="viewport"]').should('exist').and('have.attr', 'content').and('include', 'width=device-width')
      
      // Should have charset meta tag
      cy.get('meta[charset]').should('exist')
    })
  })

  it('should have structured data for breadcrumbs on tool pages', () => {
    const toolPages = [
      '/tools/pdf-compress',
      '/tools/pdf-merge',
      '/tools/pdf-split'
    ]
    
    toolPages.forEach(page => {
      cy.visit(page)
      
      // Check for BreadcrumbList JSON-LD (optional but good for SEO)
      cy.get('script[type="application/ld+json"]').then(($scripts) => {
        let foundBreadcrumbs = false
        
        $scripts.each((index, script) => {
          try {
            const jsonData = JSON.parse(script.textContent || '')
            const breadcrumbList = jsonData['@type'] === 'BreadcrumbList' ? jsonData :
                                 Array.isArray(jsonData) ? jsonData.find(item => item['@type'] === 'BreadcrumbList') : null
            
            if (breadcrumbList) {
              foundBreadcrumbs = true
              
              // Should have itemListElement
              expect(breadcrumbList).to.have.property('itemListElement')
              expect(breadcrumbList.itemListElement).to.be.an('array')
              expect(breadcrumbList.itemListElement.length).to.be.at.least(2) // Home + Tools + Current
              
              // Each breadcrumb should have proper structure
              breadcrumbList.itemListElement.forEach((item: { '@type': string; position: number; item: { name: string; '@id': string } }, index: number) => {
                expect(item['@type']).to.equal('ListItem')
                expect(item).to.have.property('position', index + 1)
                expect(item).to.have.property('item')
                expect(item.item).to.have.property('name')
                expect(item.item).to.have.property('@id')
              })
            }
          } catch (e) {
            // Skip invalid JSON - breadcrumbs are optional
          }
        })
        
        // Breadcrumbs are optional, so we just log if found
        if (foundBreadcrumbs) {
          cy.log(`Breadcrumb structured data found on ${page}`)
        }
      })
    })
  })

  it('should have proper language and locale meta tags', () => {
    cy.visit('/')
    
    // Should have html lang attribute
    cy.get('html').should('have.attr', 'lang').and('not.be.empty')
    
    // Should have proper locale meta tags
    cy.get('meta[property="og:locale"]').should('exist').and('have.attr', 'content')
    
    // Language should be valid (en, en-US, etc.)
    cy.get('html').should(($html) => {
      const lang = $html.attr('lang') || ''
      expect(lang).to.match(/^[a-z]{2}(-[A-Z]{2})?$/) // ISO language code format
    })
  })

  it('should have proper JSON-LD validation', () => {
    const pages = ['/', '/tools', '/tools/pdf-compress']
    
    pages.forEach(page => {
      cy.visit(page)
      
      // All JSON-LD scripts should be valid JSON
      cy.get('script[type="application/ld+json"]').each(($script) => {
        const content = $script.text()
        expect(() => JSON.parse(content), `Invalid JSON-LD on ${page}`).to.not.throw()
        
        // Should have @context
        const jsonData = JSON.parse(content)
        if (Array.isArray(jsonData)) {
          jsonData.forEach(item => {
            expect(item).to.have.property('@context')
          })
        } else {
          expect(jsonData).to.have.property('@context')
        }
      })
    })
  })

  it('should have proper meta robots tags', () => {
    const pages = [
      { path: '/', robots: 'index,follow' },
      { path: '/tools', robots: 'index,follow' },
      { path: '/tools/pdf-compress', robots: 'index,follow' },
      { path: '/privacy', robots: 'index,follow' }
    ]
    
    pages.forEach(({ path, robots }) => {
      cy.visit(path)
      
      // Should have robots meta tag or default to indexable
      cy.get('head').then(($head) => {
        const robotsMeta = $head.find('meta[name="robots"]')
        if (robotsMeta.length > 0) {
          const content = robotsMeta.attr('content') || ''
          expect(content).to.include('index') // Should be indexable
        }
        // If no robots meta tag, that's fine - defaults to index,follow
      })
    })
  })
})

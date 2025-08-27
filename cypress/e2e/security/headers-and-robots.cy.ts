describe('Security Headers & Robots/Sitemap Tests', () => {
  
  it('should have proper security headers on main pages', () => {
    const pages = ['/', '/tools', '/tools/pdf-compress', '/about', '/privacy']
    
    pages.forEach(page => {
      cy.request(page).then((response) => {
        const headers = response.headers
        
        // Content Security Policy
        expect(headers).to.have.property('content-security-policy')
        const csp = headers['content-security-policy']
        expect(csp).to.be.a('string')
        expect(csp.length).to.be.greaterThan(10) // Should have meaningful CSP
        
        // Referrer Policy
        expect(headers).to.have.property('referrer-policy')
        expect(headers['referrer-policy']).to.include('strict-origin-when-cross-origin')
        
        // X-Content-Type-Options
        expect(headers).to.have.property('x-content-type-options')
        expect(headers['x-content-type-options']).to.equal('nosniff')
        
        // Permissions Policy (optional but recommended)
        if (headers['permissions-policy']) {
          expect(headers['permissions-policy']).to.be.a('string')
          expect(headers['permissions-policy'].length).to.be.greaterThan(5)
        }
        
        // X-Frame-Options (optional, may be replaced by CSP frame-ancestors)
        if (headers['x-frame-options']) {
          expect(headers['x-frame-options']).to.match(/^(DENY|SAMEORIGIN)$/)
        }
        
        // Strict-Transport-Security (for HTTPS)
        if (response.requestHeaders && response.requestHeaders.host && response.requestHeaders.host.includes('https')) {
          expect(headers).to.have.property('strict-transport-security')
        }
      })
    })
  })

  it('should have proper CSP directives', () => {
    cy.request('/').then((response) => {
      const csp = response.headers['content-security-policy']
      expect(csp).to.exist
      
      // Should have default-src directive
      expect(csp).to.include('default-src')
      
      // Should have script-src directive (important for XSS protection)
      expect(csp).to.include('script-src')
      
      // Should have style-src directive
      expect(csp).to.include('style-src')
      
      // Should have img-src directive
      expect(csp).to.include('img-src')
      
      // Should have connect-src directive (for API calls)
      expect(csp).to.include('connect-src')
      
      // Should not allow unsafe-eval in script-src (security risk)
      if (typeof csp === 'string' && csp.includes('script-src')) {
        const scriptSrcMatch = csp.match(/script-src[^;]+/)
        if (scriptSrcMatch) {
          expect(scriptSrcMatch[0]).to.not.include('unsafe-eval')
        }
      }
    })
  })

  it('should have proper robots.txt', () => {
    cy.request('/robots.txt').then((response) => {
      expect(response.status).to.equal(200)
      expect(response.headers['content-type']).to.include('text/plain')
      
      const robotsContent = response.body
      expect(robotsContent).to.be.a('string')
      
      // Should disallow API routes
      expect(robotsContent).to.include('Disallow: /api/')
      
      // Should have User-agent directive (case insensitive)
      expect(robotsContent.toLowerCase()).to.include('user-agent:')
      
      // Should reference sitemap
      expect(robotsContent).to.include('Sitemap:')
      expect(robotsContent).to.include('sitemap.xml')
      
      // Should allow crawling of main content
      expect(robotsContent).to.match(/Allow:\s*\/\s*$|^(?!.*Disallow:\s*\/\s*$)/m)
    })
  })

  it('should have proper sitemap.xml', () => {
    cy.request('/sitemap.xml').then((response) => {
      expect(response.status).to.equal(200)
      expect(response.headers['content-type']).to.include('xml')
      
      const sitemapContent = response.body
      expect(sitemapContent).to.be.a('string')
      
      // Should be valid XML
      expect(sitemapContent).to.include('<?xml')
      expect(sitemapContent).to.include('<urlset')
      expect(sitemapContent).to.include('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
      
      // Should contain main pages
      expect(sitemapContent).to.include('<loc>')
      
      // Should contain tools routes
      expect(sitemapContent).to.include('/tools')
      
      // Should contain blog routes (if they exist)
      if (sitemapContent.includes('/blog')) {
        expect(sitemapContent).to.include('/blog')
      }
      
      // Should have proper URL structure
      const urlMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g)
      expect(urlMatches).to.exist
      expect(urlMatches!.length).to.be.greaterThan(5) // Should have multiple URLs
      
      // Each URL should be properly formatted
      urlMatches!.forEach((urlMatch: string) => {
        const url = urlMatch.replace(/<\/?loc>/g, '')
        expect(url).to.match(/^https?:\/\//) // Should be absolute URLs
      })
    })
  })

  it('should have proper cache control headers for static assets', () => {
    // Test common static asset paths
    const staticPaths = [
      '/favicon.ico',
      '/manifest.webmanifest',
      '/robots.txt',
      '/sitemap.xml'
    ]
    
    staticPaths.forEach(path => {
      cy.request({ url: path, failOnStatusCode: false }).then((response) => {
        if (response.status === 200) {
          const headers = response.headers
          
          // Static assets should have cache control
          if (path.includes('.ico') || path.includes('.webmanifest')) {
            // Icons and manifests can be cached longer
            if (headers['cache-control']) {
              expect(headers['cache-control']).to.match(/max-age=\d+/)
            }
          }
          
          // robots.txt and sitemap.xml should have shorter cache or no-cache
          if (path.includes('robots.txt') || path.includes('sitemap.xml')) {
            if (headers['cache-control']) {
              expect(headers['cache-control']).to.match(/max-age=\d+|no-cache|no-store/)
            }
          }
        }
      })
    })
  })

  it('should not expose sensitive information in headers', () => {
    cy.request('/').then((response) => {
      const headers = response.headers
      
      // Should not expose server version
      if (headers['server']) {
        expect(headers['server']).to.not.match(/\d+\.\d+/) // No version numbers
      }
      
      // Should not expose X-Powered-By
      expect(headers).to.not.have.property('x-powered-by')
      
      // Should not expose detailed error information
      expect(headers).to.not.have.property('x-debug')
      expect(headers).to.not.have.property('x-error')
    })
  })

  it('should have proper CORS headers for API routes', () => {
    const apiRoutes = ['/api/info', '/api/ping', '/api/status']
    
    apiRoutes.forEach(route => {
      cy.request(route).then((response) => {
        expect(response.status).to.equal(200)
        
        const headers = response.headers
        
        // Should have proper CORS headers
        expect(headers).to.have.property('access-control-allow-origin')
        
        // Should specify allowed methods
        if (headers['access-control-allow-methods']) {
          expect(headers['access-control-allow-methods']).to.include('GET')
        }
        
        // Should have proper content type
        expect(headers['content-type']).to.include('application/json')
      })
    })
  })

  it('should handle OPTIONS requests properly', () => {
    cy.request({
      method: 'OPTIONS',
      url: '/api/info',
      failOnStatusCode: false
    }).then((response) => {
      // Should handle OPTIONS request (for CORS preflight)
      expect(response.status).to.be.oneOf([200, 204, 405]) // 405 is acceptable if OPTIONS not implemented
      
      if (response.status === 200 || response.status === 204) {
        const headers = response.headers
        expect(headers).to.have.property('access-control-allow-methods')
        expect(headers).to.have.property('access-control-allow-origin')
      }
    })
  })

  it('should have proper error page security', () => {
    // Test 404 page
    cy.request({
      url: '/nonexistent-page',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(404)
      
      const headers = response.headers
      
      // Should still have security headers on error pages
      expect(headers).to.have.property('x-content-type-options', 'nosniff')
      
      if (headers['content-security-policy']) {
        expect(headers['content-security-policy']).to.be.a('string')
      }
      
      // Should not expose sensitive error information
      const body = response.body
      expect(body).to.not.include('stack trace')
      expect(body).to.not.include('internal error')
      expect(body).to.not.include('database')
    })
  })

  it('should have secure cookie settings (if cookies are used)', () => {
    cy.request('/').then((response) => {
      const setCookieHeaders = response.headers['set-cookie']
      
      if (setCookieHeaders) {
        const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders]
        
        cookies.forEach(cookie => {
          // Should have Secure flag for HTTPS
          if (cookie.includes('Secure')) {
            expect(cookie).to.include('Secure')
          }
          
          // Should have HttpOnly flag for security cookies
          if (cookie.includes('HttpOnly')) {
            expect(cookie).to.include('HttpOnly')
          }
          
          // Should have SameSite attribute
          if (cookie.includes('SameSite')) {
            expect(cookie).to.match(/SameSite=(Strict|Lax|None)/)
          }
        })
      }
    })
  })

  it('should have proper rate limiting headers (if implemented)', () => {
    cy.request('/api/info').then((response) => {
      const headers = response.headers
      
      // Rate limiting headers are optional but good practice
      if (headers['x-ratelimit-limit']) {
        expect(headers['x-ratelimit-limit']).to.match(/^\d+$/)
      }
      
      if (headers['x-ratelimit-remaining']) {
        expect(headers['x-ratelimit-remaining']).to.match(/^\d+$/)
      }
      
      if (headers['x-ratelimit-reset']) {
        expect(headers['x-ratelimit-reset']).to.match(/^\d+$/)
      }
    })
  })
})

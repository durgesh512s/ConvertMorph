/// <reference types="cypress" />

describe('Complete Homepage Testing', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.get('h1').should('be.visible')
    cy.title().should('not.be.empty')
  })

  it('should have proper meta tags', () => {
    cy.get('meta[name="viewport"]').should('exist')
    cy.title().should('contain', 'ConvertMorph')
  })

  it('should display the main navigation', () => {
    cy.get('nav').should('be.visible')
    cy.get('nav a').should('have.length.greaterThan', 0)
  })

  it('should have a footer', () => {
    cy.get('footer').should('be.visible')
  })

  it('should navigate to tools page', () => {
    cy.contains('Tools').click()
    cy.url().should('include', '/tools')
    cy.go('back')
  })

  it('should navigate to about page', () => {
    cy.contains('About').click()
    cy.url().should('include', '/about')
    cy.go('back')
  })

  it('should navigate to contact page', () => {
    cy.contains('Contact').click()
    cy.url().should('include', '/contact')
    cy.go('back')
  })

  it('should navigate to blog page', () => {
    cy.contains('Blog').click()
    cy.url().should('include', '/blog')
    cy.go('back')
  })

  it('should have links to PDF tools', () => {
    cy.contains(/compress|merge|split|convert/i).should('be.visible')
  })

  it('should navigate to tools page from Open Tools button', () => {
    cy.contains('Open Tools').click()
    cy.url().should('include', '/tools')
    cy.go('back')
  })

  it('should have clickable elements for PDF tools', () => {
    cy.get('a, button').contains(/pdf|compress|merge|split/i).should('exist')
  })

  it('should work on mobile devices', () => {
    cy.viewport(375, 667)
    cy.get('h1').should('be.visible')
    cy.get('nav').should('be.visible')
  })

  it('should work on tablet devices', () => {
    cy.viewport(768, 1024)
    cy.get('h1').should('be.visible')
    cy.get('nav').should('be.visible')
  })

  it('should work on desktop devices', () => {
    cy.viewport(1280, 720)
    cy.get('h1').should('be.visible')
    cy.get('nav').should('be.visible')
  })

  it('should have proper heading structure', () => {
    cy.get('h1').should('exist')
    cy.get('h1').should('have.length', 1)
  })

  it('should have alt text for images', () => {
    cy.get('body').then(($body) => {
      if ($body.find('img').length > 0) {
        cy.get('img').each(($img) => {
          cy.wrap($img).should('have.attr', 'alt')
        })
      } else {
        cy.log('No images found on homepage')
      }
    })
  })

  it('should have focusable elements', () => {
    cy.get('a, button, input').should('have.length.greaterThan', 0)
  })

  it('should load within reasonable time', () => {
    const start = Date.now()
    cy.reload().then(() => {
      const loadTime = Date.now() - start
      expect(loadTime).to.be.lessThan(5000) // 5 seconds
    })
  })

  it('should have proper title', () => {
    cy.title().should('include', 'ConvertMorph')
  })

  it('should have meta description (optional)', () => {
    cy.get('head').then(($head) => {
      if ($head.find('meta[name="description"]').length > 0) {
        cy.get('head meta[name="description"]')
          .should('have.attr', 'content')
          .and('not.be.empty')
      } else {
        cy.log('Meta description not found - this is optional')
      }
    })
  })

  it('should have canonical URL (optional)', () => {
    cy.get('head').then(($head) => {
      if ($head.find('link[rel="canonical"]').length > 0) {
        cy.get('head link[rel="canonical"]').should('exist')
      } else {
        cy.log('Canonical URL not found - this is optional')
      }
    })
  })
})

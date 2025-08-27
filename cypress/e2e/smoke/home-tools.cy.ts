describe('Smoke Tests: Home & Tools Index', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display hero section with CTA buttons and top 5 tool cards', () => {
    // Check hero text
    cy.get('h1').should('be.visible').and('contain.text', 'PDF')
    cy.assertVisibleText('ConvertMorph')
    
    // Check CTA buttons
    cy.contains('Get Started').should('be.visible')
    cy.contains('View All Tools').should('be.visible')
    
    // Check that at least 5 tool cards are visible on homepage
    cy.get('[data-testid="tool-card"], .tool-card, [href*="/tools/"]').should('have.length.at.least', 5)
  })

  it('should navigate to tools page and display all 9 tools', () => {
    // Navigate to tools page
    cy.contains('View All Tools').click()
    cy.url().should('include', '/tools')
    
    // Verify tools page content
    cy.get('h1').should('contain.text', 'Tools')
    
    // Check that 9 tools are listed with titles
    cy.get('[data-testid="tool-card"], .tool-card, [href*="/tools/"]').should('have.length', 9)
    
    // Verify specific tools exist
    const expectedTools = [
      'PDF Compress',
      'PDF Merge', 
      'PDF Split',
      'Images to PDF',
      'PDF to Images',
      'PDF Organize',
      'PDF Watermark',
      'PDF Page Numbers',
      'PDF Sign'
    ]
    
    expectedTools.forEach(tool => {
      cy.assertVisibleText(tool)
    })
  })

  it('should have working navigation and footer links', () => {
    // Check navigation links exist and are reachable
    cy.get('nav').should('be.visible')
    
    // Test About link
    cy.contains('About').click()
    cy.url().should('include', '/about')
    cy.go('back')
    
    // Test Privacy link
    cy.contains('Privacy').click()
    cy.url().should('include', '/privacy')
    cy.go('back')
    
    // Test Contact link
    cy.contains('Contact').click()
    cy.url().should('include', '/contact')
    cy.go('back')
    
    // Check footer exists
    cy.get('footer').should('be.visible')
  })

  it('should be responsive on mobile viewport', () => {
    // Test mobile viewport (375x812)
    cy.viewport(375, 812)
    
    // Check that header is responsive (may collapse to hamburger menu)
    cy.get('nav, header').should('be.visible')
    
    // Check that tools grid is responsive
    cy.contains('View All Tools').click()
    cy.url().should('include', '/tools')
    
    // Tools should still be visible and properly arranged
    cy.get('[data-testid="tool-card"], .tool-card, [href*="/tools/"]').should('have.length', 9)
    
    // Check that content doesn't overflow
    cy.get('body').then(($body) => {
      const bodyWidth = $body.width()
      expect(bodyWidth).to.be.at.most(375)
    })
  })

  it('should have accessible navigation', () => {
    // Check basic accessibility
    cy.checkA11y()
    
    // Test keyboard navigation
    cy.get('body').type('{tab}')
    cy.focused().should('be.visible')
    
    // Test that interactive elements are focusable
    cy.contains('Get Started').focus().should('be.focused')
    cy.contains('View All Tools').focus().should('be.focused')
  })
})

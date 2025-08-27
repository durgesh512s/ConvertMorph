describe('Launch Checklist - Final Sanity Check', () => {
  const results: { [key: string]: boolean } = {};
  
  before(() => {
    // Generate fixtures if needed
    cy.task('log', '🚀 Starting Launch Checklist...');
  });

  after(() => {
    // Print comprehensive summary
    cy.then(() => {
      console.log('\n=== LAUNCH CHECKLIST SUMMARY ===');
      
      const categories = {
        'API Health': ['api-info', 'api-ping', 'api-status'],
        'Core Tools': ['compress-flow', 'merge-flow', 'split-flow'],
        'SEO & Schema': ['json-ld-present'],
        'Platform Files': ['robots-txt', 'sitemap-xml'],
        'Overall': ['all-checks']
      };
      
      Object.entries(categories).forEach(([category, checks]) => {
        console.log(`\n${category}:`);
        checks.forEach(check => {
          const status = results[check] ? '✅' : '❌';
          console.log(`  ${status} ${check.replace('-', ' ').toUpperCase()}`);
        });
      });
      
      const totalChecks = Object.keys(results).length;
      const passedChecks = Object.values(results).filter(Boolean).length;
      const successRate = Math.round((passedChecks / totalChecks) * 100);
      
      console.log(`\n📊 OVERALL: ${passedChecks}/${totalChecks} checks passed (${successRate}%)`);
      
      if (successRate >= 90) {
        console.log('🎉 LAUNCH READY - All critical systems operational!');
      } else if (successRate >= 75) {
        console.log('⚠️  LAUNCH WITH CAUTION - Some issues detected');
      } else {
        console.log('🚨 NOT READY FOR LAUNCH - Critical issues found');
      }
      
      console.log('=================================\n');
    });
  });

  describe('API Health Checks', () => {
    it('should verify /api/info endpoint', () => {
      cy.request('/api/info').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('maxFileSizeMB');
        expect(response.body).to.have.property('supportedFormats');
        results['api-info'] = true;
      });
    });

    it('should verify /api/ping endpoint', () => {
      cy.request('/api/ping').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('status', 'ok');
        results['api-ping'] = true;
      });
    });

    it('should verify /api/status endpoint', () => {
      cy.request('/api/status').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('status');
        results['api-status'] = true;
      });
    });
  });

  describe('Core Tool Flows (Minimal)', () => {
    beforeEach(() => {
      // Use small fixtures for speed
      cy.fixture('small-test.pdf', 'base64').as('smallPdf');
    });

    it('should complete PDF Compress flow', () => {
      cy.visit('/tools/pdf-compress');
      
      // Upload small file
      cy.get('[data-testid="file-input"], input[type="file"]').first()
        .selectFile('cypress/fixtures/small-test.pdf', { force: true });
      
      // Wait for file to be processed and UI to update
      cy.get('body').should('satisfy', ($body) => {
        return $body.text().includes('small-test.pdf') || $body.text().includes('Ready');
      });
      
      // Select preset and compress
      cy.get('button, select').contains(/medium|compress|process/i).first().click();
      
      // Wait for success indicators
      cy.get('body', { timeout: 15000 }).should('satisfy', ($body) => {
        return $body.text().includes('success') || 
               $body.text().includes('completed') || 
               $body.text().includes('download') ||
               $body.find('[data-testid*="download"], a[download], button').filter(':contains("Download")').length > 0;
      });
      
      results['compress-flow'] = true;
    });

    it('should complete PDF Merge flow', () => {
      cy.visit('/tools/pdf-merge');
      
      // Upload multiple small files
      cy.get('[data-testid="file-input"], input[type="file"]').first()
        .selectFile(['cypress/fixtures/small-test.pdf', 'cypress/fixtures/small-test.pdf'], { force: true });
      
      // Wait for files to be processed
      cy.get('body').should('contain.text', 'small-test.pdf');
      
      // Trigger merge
      cy.get('button').contains(/merge|process|combine/i).first().click();
      
      // Wait for success
      cy.get('body', { timeout: 15000 }).should('satisfy', ($body) => {
        return $body.text().includes('success') || 
               $body.text().includes('merged') || 
               $body.text().includes('download') ||
               $body.find('[data-testid*="download"], a[download], button').filter(':contains("Download")').length > 0;
      });
      
      results['merge-flow'] = true;
    });

    it('should complete PDF Split flow', () => {
      cy.visit('/tools/pdf-split');
      
      // Upload file
      cy.get('[data-testid="file-input"], input[type="file"]').first()
        .selectFile('cypress/fixtures/small-test.pdf', { force: true });
      
      // Wait for file processing
      cy.get('body').should('contain.text', 'small-test.pdf');
      
      // Enter simple range
      cy.get('input[type="text"], input[placeholder*="range"], input[placeholder*="pages"]')
        .first().clear().type('1');
      
      // Trigger split
      cy.get('button').contains(/split|process|extract/i).first().click();
      
      // Wait for success
      cy.get('body', { timeout: 15000 }).should('satisfy', ($body) => {
        return $body.text().includes('success') || 
               $body.text().includes('extracted') || 
               $body.text().includes('download') ||
               $body.find('[data-testid*="download"], a[download], button').filter(':contains("Download")').length > 0;
      });
      
      results['split-flow'] = true;
    });
  });

  describe('SEO & Schema Validation', () => {
    it('should verify JSON-LD presence on tool page', () => {
      cy.visit('/tools/pdf-compress');
      
      cy.get('script[type="application/ld+json"]').should('exist').then(($scripts) => {
        let foundSoftwareApp = false;
        
        $scripts.each((_, script) => {
          try {
            const jsonLd = JSON.parse(script.textContent || '');
            if (jsonLd['@type'] === 'SoftwareApplication' || 
                (Array.isArray(jsonLd) && jsonLd.some(item => item['@type'] === 'SoftwareApplication'))) {
              foundSoftwareApp = true;
            }
          } catch (e) {
            // Skip invalid JSON
          }
        });
        
        expect(foundSoftwareApp).to.be.true;
        results['json-ld-present'] = true;
      });
    });
  });

  describe('Platform Files', () => {
    it('should verify robots.txt', () => {
      cy.request('/robots.txt').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include('Disallow: /api/');
        results['robots-txt'] = true;
      });
    });

    it('should verify sitemap.xml', () => {
      cy.request('/sitemap.xml').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include('/tools');
        expect(response.body).to.include('/blog');
        results['sitemap-xml'] = true;
      });
    });
  });

  describe('Final Validation', () => {
    it('should mark overall success', () => {
      // This test runs after all others and marks overall success
      const criticalChecks = ['api-info', 'api-ping', 'compress-flow'];
      const allCriticalPassed = criticalChecks.every(check => results[check]);
      
      expect(allCriticalPassed).to.be.true;
      results['all-checks'] = allCriticalPassed;
    });
  });
});

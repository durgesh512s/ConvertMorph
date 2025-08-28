describe('Blog SEO Validation', () => {
  const blogPosts = [
    'how-to-compress-pdf-files',
    'merge-pdf-files-online',
    'split-pdf-pages',
    'convert-images-to-pdf',
    'convert-pdf-to-images'
  ];

  blogPosts.forEach((slug) => {
    describe(`Blog Post: ${slug}`, () => {
      beforeEach(() => {
        cy.visit(`/blog/${slug}`);
      });

      it('should have proper meta tags', () => {
        // Title tag
        cy.get('title').should('exist').and('not.be.empty');
        cy.get('title').invoke('text').should('have.length.at.most', 60);

        // Meta description
        cy.get('meta[name="description"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('not.be.empty');
        
        cy.get('meta[name="description"]')
          .invoke('attr', 'content')
          .should('have.length.at.least', 120)
          .and('have.length.at.most', 160);

        // Keywords
        cy.get('meta[name="keywords"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('not.be.empty');

        // Canonical URL
        cy.get('link[rel="canonical"]')
          .should('exist')
          .and('have.attr', 'href')
          .and('include', `/blog/${slug}`);
      });

      it('should have proper Open Graph tags', () => {
        // OG title
        cy.get('meta[property="og:title"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('not.be.empty');

        // OG description
        cy.get('meta[property="og:description"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('not.be.empty');

        // OG type
        cy.get('meta[property="og:type"]')
          .should('exist')
          .and('have.attr', 'content', 'article');

        // OG image
        cy.get('meta[property="og:image"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('include', `/og/blog/${slug}.png`);

        // OG URL
        cy.get('meta[property="og:url"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('include', `/blog/${slug}`);

        // Article published time
        cy.get('meta[property="article:published_time"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('not.be.empty');

        // Article author
        cy.get('meta[property="article:author"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('not.be.empty');
      });

      it('should have proper Twitter Card tags', () => {
        // Twitter card type
        cy.get('meta[name="twitter:card"]')
          .should('exist')
          .and('have.attr', 'content', 'summary_large_image');

        // Twitter title
        cy.get('meta[name="twitter:title"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('not.be.empty');

        // Twitter description
        cy.get('meta[name="twitter:description"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('not.be.empty');

        // Twitter image
        cy.get('meta[name="twitter:image"]')
          .should('exist')
          .and('have.attr', 'content')
          .and('include', `/og/blog/${slug}.png`);
      });

      it('should have proper heading structure', () => {
        // Should have exactly one H1
        cy.get('h1').should('have.length', 1);

        // H1 should not be empty
        cy.get('h1').should('not.be.empty');

        // Should have H2 headings
        cy.get('h2').should('have.length.at.least', 2);

        // Headings should be in proper order (no H3 before H2, etc.)
        cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
          let previousLevel = 0;
          $headings.each((index, heading) => {
            const currentLevel = parseInt(heading.tagName.charAt(1));
            if (index === 0) {
              expect(currentLevel).to.equal(1); // First heading should be H1
            } else {
              expect(currentLevel).to.be.at.most(previousLevel + 1); // No skipping levels
            }
            previousLevel = currentLevel;
          });
        });
      });

      it('should have JSON-LD structured data', () => {
        // Article schema
        cy.get('script[type="application/ld+json"]')
          .should('exist')
          .and('contain', '"@type":"Article"');

        // Should contain required Article properties
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
          const articleSchema = JSON.parse($scripts[0].textContent);
          expect(articleSchema).to.have.property('@context', 'https://schema.org');
          expect(articleSchema).to.have.property('@type', 'Article');
          expect(articleSchema).to.have.property('headline');
          expect(articleSchema).to.have.property('description');
          expect(articleSchema).to.have.property('author');
          expect(articleSchema).to.have.property('publisher');
          expect(articleSchema).to.have.property('datePublished');
          expect(articleSchema).to.have.property('dateModified');
          expect(articleSchema).to.have.property('image');
        });
      });

      it('should have FAQ schema if FAQs are present', () => {
        cy.get('body').then(($body) => {
          // Check if FAQ section exists
          if ($body.find('.faq-section, [data-testid="faq"]').length > 0) {
            // Should have FAQ schema
            cy.get('script[type="application/ld+json"]')
              .should('contain', '"@type":"FAQPage"');
          }
        });
      });

      it('should have breadcrumb schema', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', '"@type":"BreadcrumbList"');
      });

      it('should have proper internal links', () => {
        // Should link to at least one tool page
        cy.get('a[href^="/tools/"]').should('have.length.at.least', 1);

        // Should link to other blog posts
        cy.get('a[href^="/blog/"]').should('have.length.at.least', 2);

        // All internal links should be absolute paths
        cy.get('a[href^="/"]').each(($link) => {
          const href = $link.attr('href');
          expect(href).to.match(/^\/[^\/]/); // Should start with / but not //
        });
      });

      it('should have proper image optimization', () => {
        cy.get('img').each(($img) => {
          // Should have alt text
          cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');

          // Should have width and height attributes for layout stability
          cy.wrap($img).should('have.attr', 'width');
          cy.wrap($img).should('have.attr', 'height');

          // Should have loading="lazy" for performance (except hero images)
          cy.wrap($img).then(($el) => {
            const isHeroImage = $el.closest('header, .hero').length > 0;
            if (!isHeroImage) {
              cy.wrap($el).should('have.attr', 'loading', 'lazy');
            }
          });
        });
      });

      it('should have proper content length', () => {
        // Count words in main content
        cy.get('article, main, .blog-prose').then(($content) => {
          const text = $content.text();
          const wordCount = text.trim().split(/\s+/).length;
          expect(wordCount).to.be.at.least(900); // Minimum word count
          expect(wordCount).to.be.at.most(1400); // Maximum word count
        });
      });

      it('should have reading time indicator', () => {
        cy.contains(/\d+\s+min\s+read/i).should('exist');
      });

      it('should have publication date', () => {
        cy.get('time[datetime]').should('exist');
        cy.get('time[datetime]').should('have.attr', 'datetime').and('not.be.empty');
      });

      it('should have CTA buttons linking to tools', () => {
        // Should have at least one CTA button
        cy.get('a').contains(/try|get started|compress|merge|split|convert/i)
          .should('have.length.at.least', 1);

        // CTA should link to relevant tool
        cy.get('a[href^="/tools/"]').should('have.length.at.least', 1);
      });

      it('should be mobile responsive', () => {
        // Test mobile viewport
        cy.viewport(375, 667);
        
        // Content should be readable
        cy.get('h1').should('be.visible');
        cy.get('p').first().should('be.visible');

        // Navigation should work
        cy.get('nav, .navbar').should('be.visible');

        // Images should not overflow
        cy.get('img').each(($img) => {
          cy.wrap($img).should('have.css', 'max-width', '100%');
        });
      });

      it('should have proper robots meta tag', () => {
        // Should allow indexing
        cy.get('meta[name="robots"]').then(($meta) => {
          if ($meta.length > 0) {
            const content = $meta.attr('content');
            expect(content).to.not.include('noindex');
            expect(content).to.not.include('nofollow');
          }
        });
      });

      it('should validate OG image exists and has correct dimensions', () => {
        cy.get('meta[property="og:image"]')
          .invoke('attr', 'content')
          .then((imageUrl) => {
            if (imageUrl) {
              // Extract the path from the full URL
              const imagePath = imageUrl.replace(/^https?:\/\/[^\/]+/, '');
              
              // Check if image exists by making a request
              cy.request({
                url: imagePath,
                failOnStatusCode: false
              }).then((response) => {
                expect(response.status).to.equal(200);
              });
            }
          });

        // Check OG image dimensions in meta tags
        cy.get('meta[property="og:image:width"]')
          .should('exist')
          .and('have.attr', 'content', '1200');

        cy.get('meta[property="og:image:height"]')
          .should('exist')
          .and('have.attr', 'content', '630');
      });
    });
  });

  describe('Blog Index Page', () => {
    beforeEach(() => {
      cy.visit('/blog');
    });

    it('should have proper meta tags', () => {
      cy.get('title').should('contain', 'Blog');
      cy.get('meta[name="description"]').should('exist');
      cy.get('link[rel="canonical"]').should('have.attr', 'href').and('include', '/blog');
    });

    it('should list all blog posts', () => {
      blogPosts.forEach((slug) => {
        cy.get(`a[href="/blog/${slug}"]`).should('exist');
      });
    });

    it('should have proper structured data for blog listing', () => {
      cy.get('script[type="application/ld+json"]').should('exist');
    });
  });
});

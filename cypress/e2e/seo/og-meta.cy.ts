describe('OG meta', () => {
  it('has OG/Twitter tags on compress tool', () => {
    cy.request('/tools/pdf-compress').then((res) => {
      const html = res.body as string;
      
      // Check Open Graph tags
      expect(html).to.include('property="og:title"');
      expect(html).to.include('property="og:description"');
      expect(html).to.include('property="og:image"');
      expect(html).to.include('/og/og-compress');
      expect(html).to.include('property="og:type"');
      expect(html).to.include('property="og:url"');
      
      // Check Twitter tags
      expect(html).to.include('name="twitter:card"');
      expect(html).to.include('name="twitter:title"');
      expect(html).to.include('name="twitter:description"');
      expect(html).to.include('name="twitter:image"');
      
      // Verify specific content
      expect(html).to.include('Compress PDF');
      expect(html).to.include('summary_large_image');
    });
  });

  it('has OG/Twitter tags on merge tool', () => {
    cy.request('/tools/pdf-merge').then((res) => {
      const html = res.body as string;
      
      expect(html).to.include('property="og:image"');
      expect(html).to.include('/og/og-merge');
      expect(html).to.include('name="twitter:image"');
      expect(html).to.include('Merge PDF');
    });
  });

  it('has OG/Twitter tags on split tool', () => {
    cy.request('/tools/pdf-split').then((res) => {
      const html = res.body as string;
      
      expect(html).to.include('property="og:image"');
      expect(html).to.include('/og/og-split');
      expect(html).to.include('name="twitter:image"');
      expect(html).to.include('Split PDF');
    });
  });

  it('has OG/Twitter tags on images-to-pdf tool', () => {
    cy.request('/tools/images-to-pdf').then((res) => {
      const html = res.body as string;
      
      expect(html).to.include('property="og:image"');
      expect(html).to.include('/og/og-images-to-pdf');
      expect(html).to.include('name="twitter:image"');
      expect(html).to.include('Images to PDF');
    });
  });

  it('og-debug route shows meta tags', () => {
    cy.request('/og-debug').then((res) => {
      const html = res.body as string;
      
      // Check that debug page contains meta tags
      expect(html).to.include('property="og:title"');
      expect(html).to.include('property="og:image"');
      expect(html).to.include('name="twitter:card"');
      expect(html).to.include('ConvertMorph');
      expect(html).to.include('Base URL:');
    });
  });

  it('validates OG image dimensions in meta tags', () => {
    cy.request('/tools/pdf-compress').then((res) => {
      const html = res.body as string;
      
      // Check for proper OG image dimensions
      expect(html).to.include('property="og:image:width"');
      expect(html).to.include('property="og:image:height"');
      expect(html).to.include('content="1200"');
      expect(html).to.include('content="630"');
    });
  });
});

export function softwareAppLd({ name, url }: { name: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'Utility',
    operatingSystem: 'Web',
    url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export function faqLd(qas: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qas.map(x => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: x.a
      }
    }))
  };
}

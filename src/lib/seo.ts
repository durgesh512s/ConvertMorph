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

// Enhanced SEO utilities for blog posts
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://convertmorph.com';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  slug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  author: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  ogImage?: string;
}

export function buildPostMetadata(post: BlogPostMetadata) {
  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const ogImageUrl = post.ogImage || absoluteUrl(`/og/blog/${post.slug}.png`);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.focusKeyword, ...post.secondaryKeywords].join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'article:published_time': post.datePublished,
      'article:modified_time': post.dateModified,
      'article:author': post.author,
      'article:section': 'PDF Tools',
      'article:tag': [post.focusKeyword, ...post.secondaryKeywords].join(','),
    },
  };
}

export function articleJsonLd(post: BlogPostMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.ogImage || absoluteUrl(`/og/blog/${post.slug}.png`),
    author: {
      '@type': 'Organization',
      name: post.author,
      url: absoluteUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'ConvertMorph',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo/logo-mark.svg'),
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${post.slug}`),
    },
    keywords: [post.focusKeyword, ...post.secondaryKeywords],
    articleSection: 'PDF Tools',
    wordCount: calculateWordCount(post.excerpt), // Approximate
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbsJsonLd(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.url),
    })),
  };
}

// Utility functions
export function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

export function calculateReadingTime(wordCount: number): string {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const levelStr = match[1];
    const textStr = match[2];
    
    if (!levelStr || !textStr) continue;
    
    const level = levelStr.length;
    const text = textStr.trim();
    const id = generateSlug(text);
    headings.push({ id, text, level });
  }

  return headings;
}

// SEO validation functions
export function validateSEO(post: BlogPostMetadata, content: string) {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Title validation
  if (post.title.length > 60) {
    issues.push(`Title too long (${post.title.length} chars). Keep under 60 characters.`);
  }
  if (post.title.length < 30) {
    suggestions.push(`Title could be longer (${post.title.length} chars). Consider 30-60 characters.`);
  }

  // Meta description validation
  if (post.excerpt.length > 160) {
    issues.push(`Meta description too long (${post.excerpt.length} chars). Keep under 160 characters.`);
  }
  if (post.excerpt.length < 120) {
    suggestions.push(`Meta description could be longer (${post.excerpt.length} chars). Consider 120-160 characters.`);
  }

  // Content length validation
  const wordCount = calculateWordCount(content);
  if (wordCount < 900) {
    suggestions.push(`Content is short (${wordCount} words). Consider expanding to 900-1400 words.`);
  }
  if (wordCount > 1400) {
    suggestions.push(`Content is long (${wordCount} words). Consider breaking into multiple posts.`);
  }

  // Keyword density check
  const focusKeywordCount = (content.toLowerCase().match(new RegExp(post.focusKeyword.toLowerCase(), 'g')) || []).length;
  const keywordDensity = (focusKeywordCount / wordCount) * 100;
  if (keywordDensity < 0.5) {
    suggestions.push(`Focus keyword density low (${keywordDensity.toFixed(1)}%). Consider 0.5-2.5%.`);
  }
  if (keywordDensity > 2.5) {
    issues.push(`Focus keyword density high (${keywordDensity.toFixed(1)}%). Reduce to under 2.5%.`);
  }

  // Heading structure validation
  const headings = extractHeadings(content);
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    issues.push('Missing H1 heading.');
  }
  if (h1Count > 1) {
    issues.push(`Multiple H1 headings (${h1Count}). Use only one H1 per page.`);
  }

  return { issues, suggestions, wordCount, keywordDensity: keywordDensity.toFixed(1) };
}

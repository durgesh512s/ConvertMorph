import { memo } from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

function JsonLd({ data, id }: JsonLdProps) {
  // Use the data as-is to prevent hydration mismatches
  return (
    <script 
      id={id}
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(data, null, 0) 
      }} 
    />
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(JsonLd);

// Additional structured data generators for specific use cases
export const generateToolJsonLd = (tool: {
  name: string;
  description: string;
  url: string;
  category: string;
  features?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": tool.name,
  "description": tool.description,
  "url": tool.url,
  "applicationCategory": tool.category,
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires JavaScript. Works with Chrome, Firefox, Safari, Edge.",
  "softwareVersion": "1.0",
  "datePublished": "2024-01-01",
  "dateModified": "2024-01-01T00:00:00.000Z",
  "author": {
    "@type": "Organization",
    "name": "ConvertMorph",
    "url": "https://convertmorph.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ConvertMorph",
    "url": "https://convertmorph.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": tool.features || [],
  "screenshot": `https://convertmorph.com/og/${tool.name.toLowerCase().replace(/\s+/g, '-')}.png`,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const generateBlogPostJsonLd = (post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  category?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.description,
  "url": post.url,
  "datePublished": post.datePublished,
  "dateModified": post.dateModified || post.datePublished,
  "author": {
    "@type": "Person",
    "name": post.author || "ConvertMorph Team",
    "url": "https://convertmorph.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ConvertMorph",
    "url": "https://convertmorph.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://convertmorph.com/logo/logo-full.svg",
      "width": 300,
      "height": 100
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": post.url
  },
  "image": post.image || "https://convertmorph.com/og/blog-default.png",
  "articleSection": post.category || "Digital Tools",
  "inLanguage": "en-US",
  "isAccessibleForFree": true
});

export const generateHowToJsonLd = (howTo: {
  name: string;
  description: string;
  url: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string;
  tool?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.name,
  "description": howTo.description,
  "url": howTo.url,
  "image": `https://convertmorph.com/og/${howTo.tool || 'how-to'}.png`,
  "totalTime": howTo.totalTime || "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Web Browser"
    },
    {
      "@type": "HowToSupply", 
      "name": "Internet Connection"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "ConvertMorph",
      "url": "https://convertmorph.com"
    }
  ],
  "step": howTo.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "image": step.image,
    "url": `${howTo.url}#step-${index + 1}`
  }))
});

export const generateVideoJsonLd = (video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.name,
  "description": video.description,
  "thumbnailUrl": video.thumbnailUrl,
  "uploadDate": video.uploadDate,
  "duration": video.duration,
  "contentUrl": video.url,
  "embedUrl": video.url,
  "publisher": {
    "@type": "Organization",
    "name": "ConvertMorph",
    "url": "https://convertmorph.com"
  },
  "potentialAction": {
    "@type": "SeekToAction",
    "target": `${video.url}?t={seek_to_second_number}`,
    "startOffset-input": "required name=seek_to_second_number"
  }
});

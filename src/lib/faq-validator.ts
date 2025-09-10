interface FAQItem {
  question: string;
  answer: string;
}

export function validateFAQs(faqs: FAQItem[]): FAQItem[] {
  return faqs.filter(faq => {
    // Check if question and answer exist and are not empty
    if (!faq.question || !faq.answer) {
      console.warn('FAQ item missing question or answer:', faq);
      return false;
    }
    
    // Check if question and answer are strings
    if (typeof faq.question !== 'string' || typeof faq.answer !== 'string') {
      console.warn('FAQ item question or answer is not a string:', faq);
      return false;
    }
    
    // Check if question and answer are not just whitespace
    if (faq.question.trim().length === 0 || faq.answer.trim().length === 0) {
      console.warn('FAQ item question or answer is empty or whitespace:', faq);
      return false;
    }
    
    // Check for reasonable length limits
    if (faq.question.length > 500) {
      console.warn('FAQ question too long (>500 chars):', faq.question.substring(0, 100) + '...');
      return false;
    }
    
    if (faq.answer.length > 2000) {
      console.warn('FAQ answer too long (>2000 chars):', faq.answer.substring(0, 100) + '...');
      return false;
    }
    
    return true;
  }).map(faq => ({
    // Sanitize and clean the FAQ data
    question: faq.question.trim().replace(/\s+/g, ' '),
    answer: faq.answer.trim().replace(/\s+/g, ' ')
  }));
}

export function createValidatedFAQJsonLd(faqs: FAQItem[]) {
  const validatedFAQs = validateFAQs(faqs);
  
  if (validatedFAQs.length === 0) {
    console.warn('No valid FAQ items found');
    return null;
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validatedFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

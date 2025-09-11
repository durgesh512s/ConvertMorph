// Server-side tool data - can be easily replaced with database/API calls
export interface Tool {
  title: string;
  description: string;
  icon: string;
  href: string;
  accentColor: string;
  comingSoon: boolean;
}

export interface ToolCategory {
  title: string;
  description: string;
  tools: Tool[];
}

export const toolCategories: Record<string, ToolCategory> = {
  pdf: {
    title: 'PDF Tools',
    description: 'Fast, private utilities for everyday PDF tasks.',
    tools: [
      {
        title: 'PDF Compress',
        description: 'Reduce PDF file size while maintaining quality. Choose from light, medium, or strong compression levels.',
        icon: 'Archive',
        href: '/tools/pdf-compress',
        accentColor: '#3b82f6',
        comingSoon: false,
      },
      {
        title: 'PDF Merge',
        description: 'Combine multiple PDF files into a single document. Preserve page order and bookmarks.',
        icon: 'GitMerge',
        href: '/tools/pdf-merge',
        accentColor: '#10b981',
        comingSoon: false,
      },
      {
        title: 'PDF Split',
        description: 'Split PDF pages into separate documents using page ranges like 1-3,5,7-9.',
        icon: 'Scissors',
        href: '/tools/pdf-split',
        accentColor: '#8b5cf6',
        comingSoon: false,
      },
      {
        title: 'Images to PDF',
        description: 'Convert JPG, PNG images to PDF format. Create single or multiple PDF files.',
        icon: 'Image',
        href: '/tools/images-to-pdf',
        accentColor: '#f97316',
        comingSoon: false,
      },
      {
        title: 'PDF to Images',
        description: 'Extract pages from PDF as high-quality PNG or JPG image files.',
        icon: 'Download',
        href: '/tools/pdf-to-images',
        accentColor: '#ef4444',
        comingSoon: false,
      },
      {
        title: 'PDF Organize',
        description: 'Reorder and rotate PDF pages with visual drag-and-drop interface.',
        icon: 'Move3D',
        href: '/tools/pdf-organize',
        accentColor: '#6366f1',
        comingSoon: false,
      },
      {
        title: 'PDF Watermark',
        description: 'Add text watermarks to PDF documents with customizable position and style.',
        icon: 'Type',
        href: '/tools/pdf-watermark',
        accentColor: '#06b6d4',
        comingSoon: false,
      },
      {
        title: 'PDF Page Numbers',
        description: 'Add page numbers to PDF documents with multiple formats and positions.',
        icon: 'Hash',
        href: '/tools/pdf-pagenum',
        accentColor: '#059669',
        comingSoon: false,
      },
      {
        title: 'PDF Fill & Sign',
        description: 'Add signatures and text to PDF documents. Draw or type signatures.',
        icon: 'PenTool',
        href: '/tools/pdf-sign',
        accentColor: '#f43f5e',
        comingSoon: false,
      },
    ]
  },
  image: {
    title: 'Image Tools',
    description: 'Professional image editing and optimization tools.',
    tools: [
      {
        title: 'Background Remover',
        description: 'Remove backgrounds from images automatically using AI technology.',
        icon: 'Eraser',
        href: '#',
        accentColor: '#8b5cf6',
        comingSoon: true,
      },
      {
        title: 'Image Compress',
        description: 'Reduce image file sizes while maintaining visual quality.',
        icon: 'Archive',
        href: '/tools/image-compress',
        accentColor: '#8b5cf6',
        comingSoon: false,
      },
      {
        title: 'Image Resize',
        description: 'Resize images to specific dimensions using Canvas API. Support for PNG, JPG, WebP with aspect ratio control.',
        icon: 'Minimize2',
        href: '/tools/image-resize',
        accentColor: '#10b981',
        comingSoon: false,
      },
      {
        title: 'Image Converter',
        description: 'Convert images between JPEG, PNG, and WebP formats with quality control and preview functionality.',
        icon: 'Copy',
        href: '/tools/image-convert',
        accentColor: '#f97316',
        comingSoon: false,
      },
      {
        title: 'Image Crop',
        description: 'Crop images with precision using React Easy Crop. Support for multiple aspect ratios and formats.',
        icon: 'Crop',
        href: '/tools/image-crop',
        accentColor: '#059669',
        comingSoon: false,
      },
    ]
  },
  text: {
    title: 'Text Tools',
    description: 'Advanced text processing and analysis utilities.',
    tools: [
      {
        title: 'Word Counter',
        description: 'Count words, characters, sentences, and paragraphs. Analyze readability and get detailed text statistics.',
        icon: 'FileText',
        href: '/tools/word-counter',
        accentColor: '#3b82f6',
        comingSoon: false,
      },
      {
        title: 'Text Comparison',
        description: 'Compare two texts side-by-side with detailed difference analysis and similarity scoring using LCS algorithm.',
        icon: 'GitCompare',
        href: '/tools/text-compare',
        accentColor: '#10b981',
        comingSoon: false,
      },
      {
        title: 'Grammar Checker',
        description: 'Check and correct grammar, spelling, and punctuation errors.',
        icon: 'CheckCircle',
        href: '#',
        accentColor: '#f97316',
        comingSoon: true,
      },
      {
        title: 'Paraphraser',
        description: 'Rewrite text while maintaining original meaning and context.',
        icon: 'Copy',
        href: '#',
        accentColor: '#8b5cf6',
        comingSoon: true,
      },
      {
        title: 'Plagiarism Checker',
        description: 'Detect potential plagiarism and ensure content originality.',
        icon: 'FileText',
        href: '#',
        accentColor: '#ef4444',
        comingSoon: true,
      },
    ]
  },
  finance: {
    title: 'Finance Tools',
    description: 'Essential calculators for financial planning and analysis.',
    tools: [
      {
        title: 'Tax Calculator',
        description: 'Calculate income tax based on current tax slabs and deductions.',
        icon: 'Calculator',
        href: '/tools/tax-calculator',
        accentColor: '#059669',
        comingSoon: false,
      },
      {
        title: 'EMI Calculator',
        description: 'Calculate loan EMIs for home, car, and personal loans.',
        icon: 'Home',
        href: '/tools/emi-calculator',
        accentColor: '#3b82f6',
        comingSoon: false,
      },
      {
        title: 'SIP Calculator',
        description: 'Calculate returns on Systematic Investment Plans (SIP).',
        icon: 'PiggyBank',
        href: '/tools/sip-calculator',
        accentColor: '#10b981',
        comingSoon: false,
      },
      {
        title: 'HRA Calculator',
        description: 'Calculate House Rent Allowance exemption for tax savings.',
        icon: 'CreditCard',
        href: '/tools/hra-calculator',
        accentColor: '#8b5cf6',
        comingSoon: false,
      },
      {
        title: 'Loan Calculator',
        description: 'Calculate loan EMI, total interest, and payment schedule for different types of loans.',
        icon: 'CreditCard',
        href: '/tools/loan-calculator',
        accentColor: '#f97316',
        comingSoon: false,
      },
    ]
  }
};

export const tabs = [
  { key: 'all', label: 'All' },
  { key: 'pdf', label: 'PDF' },
  { key: 'image', label: 'Image' },
  { key: 'text', label: 'Text' },
  { key: 'finance', label: 'Finance' },
];

// Helper function to get all tools flattened
export function getAllTools() {
  return Object.entries(toolCategories).flatMap(([categoryId, category]) =>
    category.tools.map(tool => ({ ...tool, categoryId }))
  );
}

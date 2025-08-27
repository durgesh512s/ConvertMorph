import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tools - ConvertMorph',
  description: 'ConvertMorph Tools – Free PDF, Image, Text, and Finance tools. Fast, private, and easy to use.',
  keywords: [
    'PDF tools',
    'Image tools', 
    'Text tools',
    'Finance tools',
    'PDF compress',
    'PDF merge',
    'PDF split',
    'Image converter',
    'Grammar checker',
    'Tax calculator',
    'Free online tools',
    'Browser-based tools'
  ],
  openGraph: {
    title: 'All Tools - ConvertMorph',
    description: 'ConvertMorph Tools – Free PDF, Image, Text, and Finance tools. Fast, private, and easy to use.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Tools - ConvertMorph',
    description: 'ConvertMorph Tools – Free PDF, Image, Text, and Finance tools. Fast, private, and easy to use.',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

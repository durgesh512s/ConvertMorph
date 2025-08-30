import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | ConvertMorph - PDF Tools Support',
  description: 'Get in touch with ConvertMorph support team. Contact us for technical support, feature requests, or any questions about our PDF processing tools.',
  keywords: 'contact, support, help, PDF tools support, technical support, customer service',
  openGraph: {
    title: 'Contact Us | ConvertMorph',
    description: 'Get in touch with ConvertMorph support team for help with PDF tools.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'
import JsonLd from '@/components/JsonLd'
import { faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'SIP Calculator - Calculate Mutual Fund SIP Returns Online | ConvertMorph',
  description: 'Calculate SIP returns with our free mutual fund SIP calculator. Plan your systematic investment, estimate wealth creation, and compare different SIP scenarios. Start investing smartly today.',
  keywords: ["SIP calculator", "mutual fund SIP calculator", "systematic investment plan", "SIP return calculator", "mutual fund calculator", "investment calculator", "wealth calculator", "SIP planning", "mutual fund investment", "free SIP calculator"],
  alternates: {
    canonical: absoluteUrl('/tools/sip-calculator'),
  },
  openGraph: {
    title: 'SIP Calculator - Calculate Mutual Fund SIP Returns Online',
    description: 'Calculate SIP returns with our free mutual fund SIP calculator. Plan your systematic investment, estimate wealth creation, and compare different SIP scenarios.',
    images: [
      {
        url: absoluteUrl('/og/sip-calculator.png'),
        width: 1200,
        height: 630,
        alt: 'Sip Calculator - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/sip-calculator'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIP Calculator - Calculate Mutual Fund SIP Returns Online',
    description: 'Calculate SIP returns with our free mutual fund SIP calculator. Plan your systematic investment, estimate wealth creation, and compare different SIP scenarios.',
    images: [absoluteUrl('/og/sip-calculator.png')],
  },
}

export default function SipCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://convertmorph.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://convertmorph.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "SIP Calculator", "item": "https://convertmorph.com/tools/sip-calculator" }
    ]
  };

  // FAQ data for structured data
  const faqs =   [
      {
          "question": "How is SIP return calculated?",
          "answer": "SIP returns are calculated using compound interest formula, considering monthly investments, expected annual return rate, and investment duration."
      },
      {
          "question": "What is the difference between SIP and lump sum investment?",
          "answer": "SIP involves regular monthly investments, benefiting from rupee cost averaging, while lump sum is a one-time investment. SIP reduces market timing risk."
      },
      {
          "question": "Can I change my SIP amount during the tenure?",
          "answer": "Yes, most mutual funds allow you to increase or decrease your SIP amount. You can use our calculator to compare different scenarios."
      },
      {
          "question": "What is a good SIP amount to start with?",
          "answer": "Start with an amount you can comfortably invest monthly. Even ₹500-1000 per month can create significant wealth over long periods due to compounding."
      },
      {
          "question": "How accurate are SIP calculations?",
          "answer": "Our calculator provides estimates based on assumed returns. Actual returns may vary due to market conditions, fund performance, and other factors."
      },
      {
          "question": "What is the ideal SIP tenure?",
          "answer": "Longer tenures (10+ years) are ideal for wealth creation due to compounding benefits. However, choose tenure based on your financial goals and needs."
      }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
      {children}
    </>
  )
}

import { Metadata } from 'next';
import { absoluteUrl } from '@/lib/url';

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl('/'),
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import {
  URL
} from 'url';

export const metadata: Metadata = {
  title: {
    default: 'HD Web Tools - Free Online Utilities',
    template: '%s - HD Web Tools',
  },
  description: 'A comprehensive collection of free, easy-to-use online tools including calculators, converters, text utilities, image tools, and more. Boost your productivity with our simple and powerful web toolkit.',
  keywords: ['online tools', 'web tools', 'converter', 'calculator', 'generator', 'free tools', 'developer tools', 'utility'],
  metadataBase: new URL('https://hdwebtool.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HD Web Tools - Free Online Utilities',
    description: 'A comprehensive collection of free, easy-to-use online tools.',
    url: '/',
    siteName: 'HD Web Tools',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Optional: Add your Google Search Console verification code */}
        <meta name="google-adsense-account" content="ca-pub-6276658028541423" />
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6276658028541423"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background font-sans')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

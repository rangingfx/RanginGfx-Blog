import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RanginGfx | Where Creativity Meets Digital Precision',
  description:
    'Creative Digital Agency specializing in Web Development, UI/UX Design, and Brand Identity. Turning bold ideas into unforgettable digital experiences.',
  openGraph: {
    title: 'RanginGfx | Where Creativity Meets Digital Precision',
    description:
      'Creative Digital Agency specializing in Web Development, UI/UX Design, and Brand Identity.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased min-h-screen selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

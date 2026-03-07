import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BranchChat',
  description: 'Branching AI conversation visualizer with learning insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

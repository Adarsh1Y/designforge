import './globals.css';
import { Inter } from 'next/font/google';
import { BuilderProvider } from '@/components/builder/BuilderProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DesignForge',
  description: 'AI-powered website builder with design intelligence',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BuilderProvider>{children}</BuilderProvider>
      </body>
    </html>
  );
}

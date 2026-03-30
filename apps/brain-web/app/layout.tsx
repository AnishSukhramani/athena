import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Athena',
  description: 'Ranked dental practice opportunities',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Athena</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

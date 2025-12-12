import type { Metadata } from 'next'

import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { LanguageProvider } from '@/contexts/language-context'

export const metadata: Metadata = {
  title: 'Near Counselling',
  description: 'A safe space for therapy and personal growth.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className=" font-body antialiased overflow-x-hidden">
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Header/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LiranS Draft Editor Demo',
  description: 'my customized draft js editor for react+tailwind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
        >
          <header>
            <Navbar/>
          </header>
          <main className='relative h-full'>
          {children}
          </main>
        </ThemeProvider>
        <Toaster/>
        <Analytics/>
        </body>
    </html>
  )
}

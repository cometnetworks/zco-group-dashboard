import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/components/providers/query-provider'
import { MainLayout } from '@/components/layout/main-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZCO Group Dashboard',
  description: 'AI-style control tower dashboard for managing portfolio and projects',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <QueryProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </QueryProvider>
      </body>
    </html>
  )
}

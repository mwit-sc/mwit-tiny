import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Providers } from '@/components/provider'

import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'URL Shortener',
  description: 'A simple URL shortener application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <Providers>
            {children}
            <Toaster />
        </Providers>
      </body>
    </html>
  )
}


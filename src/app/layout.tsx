import './globals.css'

import type { Metadata } from 'next'

import Header from '@/components/Header'
import Wagmi from '@/components/Wagmi/Wagmi'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: '..:: Star Wars ::..',
  description: 'Star Wars search engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout-wrapper">
          <Wagmi>
            <Header />
            <main className="flex-1 p-4">
              <Breadcrumbs />
              <div>{children}</div>
            </main>
            <Footer />
          </Wagmi>
        </div>
      </body>
    </html>
  )
}

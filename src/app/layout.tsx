import './globals.css'

import type { Metadata } from 'next'

import Header from '@/components/Header'
import Wagmi from '@/components/Wagmi/Wagmi'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SpaceX Project',
  description: 'Toy project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-between h-full bg-[url('/ethereum-bg.png')] bg-cover">
          <Wagmi>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </Wagmi>
        </div>
      </body>
    </html>
  )
}

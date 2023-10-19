import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Wagmi from '@/components/Wagmi/Wagmi'

export const metadata: Metadata = {
  title: 'SpaceX Project',
  description: 'Toy project',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto">
          <Wagmi>
            <Header />
            <main>
              {children}
            </main>
          </Wagmi>
        </div>
      </body>
    </html>
  )
}

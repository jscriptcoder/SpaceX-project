'use client'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { useEffect, useState } from 'react'
import { supportedChains } from '@/chains'
import HangOn from './HangOn'

export type WagmiProps = {
  children: React.ReactNode
}

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string

const metadata = {
  name: 'SpaceX',
  description: 'Cool project',
  url: 'https://space-x-project-seven.vercel.app',
  icons: ['https://space-x-project-seven.vercel.app/logo.png'],
}

const chains = supportedChains
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export default function Wagmi({ children }: WagmiProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // We want to render de the children only when this component is mounted.
  // This prevents the children from rendering server-side and causing a mismatch
  return (
    <WagmiConfig config={wagmiConfig}>
      {!mounted && <HangOn />}
      {mounted && children}
    </WagmiConfig>
  )
}

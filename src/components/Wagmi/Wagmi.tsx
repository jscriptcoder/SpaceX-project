'use client'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { useEffect, useState } from 'react'
import { supportedChains } from '@/chains'
import Loading from './Loading'

export type WagmiProps = {
  children: React.ReactNode
}

const projectId =
  (process.env.NEXT_PUBLIC_WC_PROJECT_ID as string) ||
  '646ee2464d620624dc7c2dd7ed0fe518'

const metadata = {
  name: 'StarWars',
  description: 'Star Wars search engine',
  url: 'https://space-x-project-seven.vercel.app',
  icons: ['https://space-x-project-seven.vercel.app/starwar-logo.svg'],
}

const chains = supportedChains
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({ wagmiConfig, projectId, chains })

export default function Wagmi({ children }: WagmiProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // We want to render de the children only when this component is mounted.
  // This prevents the children from rendering server-side and causing a mismatch.
  return (
    <WagmiConfig config={wagmiConfig}>
      {!mounted && <Loading />}
      {mounted && children}
    </WagmiConfig>
  )
}

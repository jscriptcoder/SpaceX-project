'use client'

import { supportedChains } from '@/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider } from '@web3modal/wagmi'

import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useEffect, useState } from 'react'

export type WagmiProps = {
  children: React.ReactNode
}

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string

const metadata = {
  name: 'SpaceX',
  description: 'SpaceX Project',
  url: 'https://space-x-project-seven.vercel.app',
}

const { chains, publicClient } = configureChains(supportedChains, [
  walletConnectProvider({ projectId }),
  publicProvider(),
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
})

createWeb3Modal({ wagmiConfig, projectId, chains })

export default function Wagmi({ children }: WagmiProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return <WagmiConfig config={wagmiConfig}>{mounted && children}</WagmiConfig>
}

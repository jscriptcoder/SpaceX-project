import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { useMemo } from 'react'
import { mainnet, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

export default function useConnected() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const { open: openModal } = useWeb3Modal()
  const { open: isOpen } = useWeb3ModalState()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const isSwitching = useMemo(
    () => isLoading && mainnet.id === pendingChainId,
    [isLoading, pendingChainId]
  )

  return {
    chain,
    isOpen,
    isConnected,
    isSwitching,
    openModal,
    switchNetwork,
  }
}

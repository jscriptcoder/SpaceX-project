import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

export default function useConnectButton() {
  const { open: openModal } = useWeb3Modal()
  const { open: isOpen } = useWeb3ModalState()
  const { isConnected } = useAccount()

  return {
    isOpen,
    isConnected,
    openModal,
  }
}

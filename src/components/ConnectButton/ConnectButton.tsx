'use client'

import useConnectButton from './useConnectButton'

export default function ConnectButton() {
  const { isConnected, isOpen, openModal } = useConnectButton()

  // Display the built-in component when the user is connected. We get a lot of functionality for free,
  // like disconnecting, copying address, switching network, etc
  if (isConnected) {
    return <w3m-button />
  }

  return (
    <button className="btn btn-primary" onClick={() => openModal()}>
      {isOpen ? (
        <>
          <span className="loading loading-spinner" />
          <span>Connecting…</span>
        </>
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  )
}

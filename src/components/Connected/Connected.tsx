'use client'

import { mainnet } from 'wagmi'
import { MdErrorOutline } from 'react-icons/md'
import useConnected from './useConnected'

/**
 * This component will prevent the user from accessing a page if they are not connected
 * or connected to the wrong network.
 */
export default function Connected({ children }: { children: React.ReactNode }) {
  const { chain, isOpen, isConnected, isSwitching, openModal, switchNetwork } =
    useConnected()

  if (!isConnected) {
    return (
      <div role="alert" className="alert alert-warning mx-auto w-[50%]">
        <div className="flex items-start space-x-4">
          <MdErrorOutline className="w-8 h-8" />
          <p>
            <h3 className="font-bold text-xl">Not connected</h3>
            <div className="text-lg">
              <span>Please</span>,{' '}
              <button
                disabled={isOpen}
                className="link link-secondary"
                onClick={() => openModal()}
              >
                Connect Your Wallet
              </button>{' '}
              <span>if you want to view this page</span>
            </div>
          </p>
        </div>
      </div>
    )
  }

  // TODO: think about extracting these two block into its own component
  //       They are very similar.

  if (!chain || chain.id !== mainnet.id) {
    return (
      <div role="alert" className="alert alert-warning mx-auto w-[50%]">
        <div className="flex items-start space-x-4">
          <MdErrorOutline className="w-8 h-8" />
          <p>
            <h3 className="font-bold text-xl">Wrong Network</h3>
            <div className="text-lg">
              <span>Please,</span>{' '}
              {/*
                TODO: do we want to handle when the user rejects to switch network?
                      How about showing a toast message?
              */}
              <button
                disabled={isSwitching}
                className="link link-secondary"
                onClick={() => switchNetwork?.(mainnet.id)}
              >
                Switch to Mainnet
              </button>{' '}
              <span>to view deposits</span>
            </div>
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

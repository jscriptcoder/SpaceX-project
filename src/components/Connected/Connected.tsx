'use client'

import { useAccount } from 'wagmi'
import { MdErrorOutline } from 'react-icons/md'

export default function Connected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div role="alert" className="alert alert-warning mx-auto w-[50%]">
        <div className="flex items-start space-x-4">
          <MdErrorOutline className="w-8 h-8" />
          <p>
            <h3 className="font-bold text-xl">Action Required</h3>
            <div className="text-lg">
              Please, connect your wallet if you want to view this page
            </div>
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

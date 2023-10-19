'use client'

import { useAccount } from 'wagmi'
import { MdErrorOutline } from 'react-icons/md'

export default function Connected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="w-full flex justify-center">
        <div className="alert alert-warning w-[50%]">
          <div className="flex items-start space-x-4">
            <MdErrorOutline className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-xl">Action Required</h3>
              <div className="text-lg">
                Please, connect your wallet if you want to view this page
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

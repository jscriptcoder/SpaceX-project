'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const path = usePathname()
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {path === '/deposits' && <li>Deposits</li>}
      </ul>
    </div>
  )
}

import Link from 'next/link'

export default function Menu() {
  return (
    <ul className="menu menu-horizontal">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/deposits">Deposits</Link>
      </li>
    </ul>
  )
}

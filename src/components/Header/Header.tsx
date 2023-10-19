import Image from 'next/image'
import ConnectButton from '../ConnectButton'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-black/60 shadow-lg">
      <Image width={300} height={200} src="/logo.png" alt="Logo" />
      <ConnectButton />
    </header>
  )
}

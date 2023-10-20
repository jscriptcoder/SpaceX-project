import Image from 'next/image'
import ConnectButton from '../ConnectButton'
import Menu from '../Menu'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-black/60 shadow-lg">
      <div className="flex space-x-2 items-center">
        <Image width={80} height={48} src="/starwar-logo.svg" alt="Logo" />
        <Menu />
      </div>
      <ConnectButton />
    </header>
  )
}

import Image from 'next/image'

export default function HangOn() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image
        src="/darth-vader.png"
        width={500}
        height={500}
        alt="Darth Vader"
      />
      <h2 className="bg-black/40 p-8 rounded-md text-2xl">
        Loading the force...
      </h2>
    </div>
  )
}

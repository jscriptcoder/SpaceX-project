import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image
        src="/darth-vader.png"
        width={500}
        height={500}
        alt="Darth Vader"
      />
      <h2 className="p-6 rounded-md text-2xl text-center">
        I find your lack of faith disturbing!
      </h2>
    </div>
  )
}

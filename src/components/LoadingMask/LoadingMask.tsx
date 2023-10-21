export default function LoadingMask() {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 z-10 bg-black/60 flex justify-center items-center">
      <span className="loading loading-spinner loading-lg text-secondary" />
    </div>
  )
}

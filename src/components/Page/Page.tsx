type PageProps = {
  children: React.ReactNode
}

export default function Page({children}: PageProps) {
  return (
    <div className="p-4">
      {children}
    </div>
  )
}

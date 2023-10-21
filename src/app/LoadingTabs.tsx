const LoadingTabs = ({ tabs }: { tabs: number }) => (
  <div className="tabs animate-pulse space-x-6">
    {Array.from({ length: tabs }).map((_, i) => (
      <div key={i} className="h-8 w-20 bg-slate-700 rounded" />
    ))}
  </div>
)

export default LoadingTabs

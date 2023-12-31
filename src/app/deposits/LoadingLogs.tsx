/**
 * Loading skeleton for the logs table
 */
const LoadingLogs = ({ rows }: { rows: number }) => (
  <tbody className="animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i}>
        <td>
          <div className="h-3 bg-slate-700 rounded"></div>
        </td>
        <td align="center">
          <div className="h-3 w-40 bg-slate-700 rounded"></div>
        </td>
        <td align="center">
          <div className="h-3 w-12 bg-slate-700 rounded"></div>
        </td>
        <td align="right">
          <div className="h-3 w-14 bg-slate-700 rounded"></div>
        </td>
      </tr>
    ))}
  </tbody>
)

export default LoadingLogs

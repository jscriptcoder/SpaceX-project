const LoadingTable = ({ rows }: { rows: number }) => (
  <div className="h-[300px]">
    <table className="table table-xs table-pin-rows">
      <tbody className="animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            <td>
              <div className="h-3 w-40 bg-slate-700 rounded"></div>
            </td>
            <td>
              <div className="h-3 w-40 bg-slate-700 rounded"></div>
            </td>
            <td>
              <div className="h-3 w-40 bg-slate-700 rounded"></div>
            </td>
            <td>
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
    </table>
  </div>
)

export default LoadingTable

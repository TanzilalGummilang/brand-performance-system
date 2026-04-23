export default function StatsCard({ title, value, sub, color }: any) {
  return (
    <div className={`p-4 bg-white border-b-4 border-${color}-500 rounded shadow-sm`}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
      <p className="text-xl font-bold text-gray-800 mt-1 truncate">{value}</p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  )
};
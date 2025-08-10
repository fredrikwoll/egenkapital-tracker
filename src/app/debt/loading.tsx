export default function Loading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-border rounded w-32"></div>
        <div className="h-20 bg-card rounded"></div>
        <div className="h-20 bg-card rounded"></div>
        <div className="h-20 bg-card rounded"></div>
      </div>
    </div>
  )
}
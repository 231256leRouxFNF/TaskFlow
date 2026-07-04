


export default function DashboardHeader() {
  return (
    <div className="flex items-start justify-between border-b border-sidebar-border pb-6">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          taskflow.dev / sprint-7 · Jul 1 – Jul 14
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 text-sm text-emerald-400">
        <div className="h-2 w-2 rounded-full bg-emerald-400" />

        <span>3 services online</span>
      </div>

    </div>
  );
}
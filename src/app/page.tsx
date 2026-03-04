import { createClient } from "@/lib/supabase/server"
import { StatCard } from "@/components/dashboard/stat-card"
import { ProjectRadarCard } from "@/components/dashboard/project-radar"
import { Users, MessageSquareReply, CalendarClock, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const revalidate = 0

// This would typically come from auth session, hardcoding for MVP
const ORG_ID = "00000000-0000-0000-0000-000000000000"

export default async function OverviewPage() {
  const supabase = await createClient()

  // We handle the edge case where the ORG_ID might not be seeded yet
  // If the database is empty, the RPC will return 0s and empty arrays.
  const { data } = await supabase.rpc('get_overview', { org_id: ORG_ID })

  const overview = (data as any) || { // eslint-disable-line @typescript-eslint/no-explicit-any
    kpis: {
      active_leads_30d: 0,
      replies_30d: 0,
      followups_due: 0,
      projects_at_risk: 0
    },
    radar: [],
    actions: {
      followups_due: [],
      overdue_tasks: [],
      idle_projects: []
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">System Overview</h1>
        <p className="text-muted-foreground">Real-time pulse of your organization&apos;s portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Leads (30d)"
          value={overview.kpis.active_leads_30d}
          icon={Users}
          trend={{ value: 12, label: "from last month", isPositive: true }}
        />
        <StatCard
          title="Replies (30d)"
          value={overview.kpis.replies_30d}
          icon={MessageSquareReply}
        />
        <StatCard
          title="Follow-ups Due"
          value={overview.kpis.followups_due}
          icon={CalendarClock}
          trend={{ value: overview.kpis.followups_due, label: "needs attention", isPositive: false }}
        />
        <StatCard
          title="Projects at Risk"
          value={overview.kpis.projects_at_risk}
          icon={AlertTriangle}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white tracking-tight">Project Radar</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {overview.radar.length > 0 ? (
              overview.radar.map((project: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                <ProjectRadarCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-dashed border-border rounded-lg bg-white/5">
                <p className="text-muted-foreground">No active projects found on radar.</p>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-white tracking-tight">Action of the Day</h2>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {overview.actions.overdue_tasks.length > 0 && overview.actions.overdue_tasks.map((task: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <div key={task.id} className="p-4 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer">
                    <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-medium line-clamp-1">{task.title}</p>
                      <p className="text-xs text-destructive mt-1">Overdue Task</p>
                    </div>
                  </div>
                ))}

                {overview.actions.followups_due.length > 0 && overview.actions.followups_due.map((lead: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <div key={lead.id} className="p-4 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer">
                    <CalendarClock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-medium line-clamp-1">{lead.name}</p>
                      <p className="text-xs text-primary mt-1">Follow-up Due</p>
                    </div>
                  </div>
                ))}

                {overview.actions.idle_projects.length > 0 && overview.actions.idle_projects.map((project: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <div key={project.id} className="p-4 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-medium line-clamp-1">{project.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Idle &gt; 7 days</p>
                    </div>
                  </div>
                ))}

                {overview.actions.overdue_tasks.length === 0 &&
                  overview.actions.followups_due.length === 0 &&
                  overview.actions.idle_projects.length === 0 && (
                    <div className="p-8 text-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3 opacity-80" />
                      <p className="text-sm font-medium text-white">Inbox Zero</p>
                      <p className="text-xs text-muted-foreground mt-1">No critical actions pending.</p>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

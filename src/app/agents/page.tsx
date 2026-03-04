import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Play, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { formatDistanceToNow } from "date-fns"

export const revalidate = 0

// This page intentionally serves as a placeholder as per PRD
export default async function AgentsPage() {
    const supabase = await createClient()

    const { data: agents } = await supabase
        .from('agent_configs')
        .select(`
      id,
      name,
      type,
      status,
      agent_jobs (
        started_at,
        status
      )
    `)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                    AI Agents
                    <Badge variant="outline" className="text-neon-cyan border-neon-cyan/50 bg-neon-cyan/10">BETA</Badge>
                </h1>
                <p className="text-muted-foreground">Manage and monitor automated SDR, Content, and Follow-up agents.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {agents && agents.length > 0 ? agents.map((agent: any) => {
                    const latestJob = agent.agent_jobs?.[0]
                    return (
                        <Card key={agent.id} className="bg-card border-border/50 hover:border-border transition-colors group">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative">
                                <CardTitle className="text-lg font-semibold text-white">{agent.name}</CardTitle>
                                <Bot className="w-5 h-5 text-primary group-hover:text-neon-cyan transition-colors" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs bg-white/5 border-white/10">
                                        {agent.type}
                                    </Badge>
                                    <div className="flex items-center gap-1.5 ml-auto">
                                        <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-500'}`} />
                                        <span className="text-xs text-muted-foreground capitalize">{agent.status || 'Offline'}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border/50 text-sm">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Last Run</span>
                                        <span className="text-white">
                                            {latestJob?.started_at ? formatDistanceToNow(new Date(latestJob.started_at), { addSuffix: true }) : 'Never'}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-2 flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded-md transition-colors text-sm font-medium">
                                        <Play className="w-4 h-4" /> Run
                                    </button>
                                    <button className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-muted-foreground transition-colors">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }) : (
                    <>
                        {['SDR Agent', 'Follow-up Agent', 'Content Agent'].map(type => (
                            <Card key={type} className="bg-card border-border border-dashed opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                                <CardHeader className="flex gap-4 p-6">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        <Bot className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base text-white">{type}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">Coming soon in Phase 2</p>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

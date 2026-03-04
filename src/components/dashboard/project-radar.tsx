import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"
import { Activity, Users, CalendarCheck } from "lucide-react"

interface ProjectData {
    id: string
    name: string
    health_score: number
    progress: number
    active_leads: number
    last_activity: string
    next_action: string | null
}

export function ProjectRadarCard({ project }: { project: ProjectData }) {
    const isAtRisk = project.health_score < 60

    return (
        <Card className="hover:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all bg-card border-border relative overflow-hidden group">
            <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{ backgroundColor: isAtRisk ? 'hsl(var(--destructive))' : 'hsl(var(--primary))' }}
            />

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-white truncate pr-4">{project.name}</CardTitle>
                    <Badge
                        variant={isAtRisk ? "destructive" : "default"}
                        className={isAtRisk ? "" : "bg-primary/20 text-primary hover:bg-primary/30 border-none"}
                    >
                        {project.health_score} / 100
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" indicatorColor="bg-neon-cyan" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-white font-medium">{project.active_leads} leads</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Activity className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground text-xs truncate">
                            {project.last_activity ? formatDistanceToNow(new Date(project.last_activity), { addSuffix: true }) : 'No activity'}
                        </span>
                    </div>
                </div>

                <div className="pt-3 mt-1 border-t border-border/50">
                    <div className="flex items-start gap-2">
                        <CalendarCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div className="text-sm">
                            <span className="text-muted-foreground block text-xs mb-0.5">Next Action</span>
                            <span className="text-white line-clamp-1">{project.next_action || "No pending actions"}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

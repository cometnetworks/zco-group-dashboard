import { createClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const runtime = 'edge'
export const revalidate = 0

export default async function ProjectsPage() {
    const supabase = await createClient()

    // Note: For MVP we hardcode ORG_ID based on previous setup
    // const ORG_ID = "00000000-0000-0000-0000-000000000000"

    const { data: projects } = await supabase
        .from('project_health')
        .select(`
      project_id,
      name,
      progress,
      health_score,
      open_tasks,
      active_leads,
      projects!inner (
        companies ( name )
      )
    `)

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Projects Portfolio</h1>
                <p className="text-muted-foreground">Manage and track health of all active projects.</p>
            </div>

            <div className="rounded-md border border-border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="text-white font-semibold">Name</TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">Company</TableHead>
                                <TableHead className="text-white font-semibold">Progress</TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">Health Score</TableHead>
                                <TableHead className="text-white font-semibold text-right whitespace-nowrap">Open Tasks</TableHead>
                                <TableHead className="text-white font-semibold text-right whitespace-nowrap">Active Leads</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects && projects.length > 0 ? projects.map((project: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                <TableRow key={project.project_id} className="border-border hover:bg-white/5 transition-colors">
                                    <TableCell className="font-medium text-white whitespace-nowrap">{project.name}</TableCell>
                                    <TableCell className="text-muted-foreground whitespace-nowrap">{project.projects?.companies?.name || 'N/A'}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 min-w-[120px]">
                                            <span className="text-xs text-muted-foreground w-8">{project.progress}%</span>
                                            <Progress value={project.progress} className="h-1.5 w-24" indicatorColor="bg-neon-cyan" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={(project.health_score || 0) < 60 ? "destructive" : "default"}
                                            className={(project.health_score || 0) >= 60 ? "bg-primary/20 text-primary hover:bg-primary/30 border-none" : ""}
                                        >
                                            {project.health_score || 0} / 100
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">{project.open_tasks || 0}</TableCell>
                                    <TableCell className="text-right text-muted-foreground">{project.active_leads || 0}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No projects found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

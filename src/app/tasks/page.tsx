import { createClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export const revalidate = 0

const statusColors: Record<string, string> = {
    'todo': 'bg-slate-500/20 text-slate-400 border-slate-500/20',
    'doing': 'bg-primary/20 text-primary border-primary/20',
    'blocked': 'bg-destructive/20 text-destructive border-destructive/20',
    'done': 'bg-green-500/20 text-green-500 border-green-500/20',
}

const priorityColors: Record<string, string> = {
    'high': 'text-destructive',
    'medium': 'text-orange-400',
    'low': 'text-slate-400',
}

export default async function TasksPage() {
    const supabase = await createClient()

    const { data: tasks } = await supabase
        .from('tasks')
        .select(`
      id,
      title,
      status,
      priority,
      due_date,
      projects ( name )
    `)
        .order('due_date', { ascending: true })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Tasks</h1>
                <p className="text-muted-foreground">Global task management across all projects.</p>
            </div>

            <div className="rounded-md border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-white font-semibold">Task</TableHead>
                            <TableHead className="text-white font-semibold">Project</TableHead>
                            <TableHead className="text-white font-semibold">Priority</TableHead>
                            <TableHead className="text-white font-semibold">Status</TableHead>
                            <TableHead className="text-white font-semibold text-right">Due Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks && tasks.length > 0 ? tasks.map((task: any) => {
                            const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done'
                            return (
                                <TableRow key={task.id} className="border-border hover:bg-white/5 transition-colors">
                                    <TableCell className="font-medium text-white">{task.title}</TableCell>
                                    <TableCell className="text-muted-foreground">{task.projects?.name || 'N/A'}</TableCell>
                                    <TableCell>
                                        <span className={`text-sm font-medium capitalize ${priorityColors[task.priority || 'medium']}`}>
                                            {task.priority || 'medium'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`capitalize ${statusColors[task.status || 'todo']}`}>
                                            {task.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={`text-right font-medium text-sm ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>
                                        {task.due_date ? format(new Date(task.due_date), 'MMM dd, yyyy') : '-'}
                                    </TableCell>
                                </TableRow>
                            )
                        }) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No tasks found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

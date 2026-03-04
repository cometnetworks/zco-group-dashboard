import { createClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export const runtime = 'edge'
export const revalidate = 0

const statusColors: Record<string, string> = {
    'draft': 'bg-slate-500/20 text-slate-400 border-slate-500/20',
    'published': 'bg-primary/20 text-primary border-primary/20',
    'archived': 'bg-destructive/20 text-destructive border-destructive/20',
}

export default async function ContentPage() {
    const supabase = await createClient()

    const { data: content } = await supabase
        .from('content_items')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Content Hub</h1>
                <p className="text-muted-foreground">Manage blogs, articles, and media traffic.</p>
            </div>

            <div className="rounded-md border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-white font-semibold">Title</TableHead>
                            <TableHead className="text-white font-semibold">Site</TableHead>
                            <TableHead className="text-white font-semibold">Status</TableHead>
                            <TableHead className="text-white font-semibold text-right">Traffic (30d)</TableHead>
                            <TableHead className="text-white font-semibold text-right">Publish Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {content && content.length > 0 ? content.map((item: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                            <TableRow key={item.id} className="border-border hover:bg-white/5 transition-colors">
                                <TableCell className="font-medium text-white">{item.title}</TableCell>
                                <TableCell className="text-muted-foreground">{item.site}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`capitalize ${statusColors[item.status || 'draft']}`}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono text-sm">{item.traffic_30d}</TableCell>
                                <TableCell className="text-right text-muted-foreground text-sm">
                                    {item.publish_date ? format(new Date(item.publish_date), 'MMM dd, yyyy') : '-'}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No content found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

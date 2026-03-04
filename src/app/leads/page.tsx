import { createClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export const revalidate = 0

export default async function LeadsPage() {
    const supabase = await createClient()

    const { data: leads } = await supabase
        .from('leads')
        .select(`
      id,
      name,
      stage,
      score,
      last_contact_at,
      next_followup_at,
      companies ( name )
    `)
        .order('next_followup_at', { ascending: true, nullsFirst: false })

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Leads Pipeline</h1>
                <p className="text-muted-foreground">CRM tracking for active and upcoming deals.</p>
            </div>

            <div className="rounded-md border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-white font-semibold">Company</TableHead>
                            <TableHead className="text-white font-semibold">Contact</TableHead>
                            <TableHead className="text-white font-semibold">Stage</TableHead>
                            <TableHead className="text-white font-semibold">Score</TableHead>
                            <TableHead className="text-white font-semibold">Last Contact</TableHead>
                            <TableHead className="text-white font-semibold text-right">Next Follow-up</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads && leads.length > 0 ? leads.map((lead: any) => {
                            const overdue = lead.next_followup_at && new Date(lead.next_followup_at) < new Date()
                            return (
                                <TableRow key={lead.id} className="border-border hover:bg-white/5 transition-colors">
                                    <TableCell className="font-medium text-white">{lead.companies?.name || 'N/A'}</TableCell>
                                    <TableCell className="text-muted-foreground">{lead.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-primary/50 text-primary">
                                            {lead.stage}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-mono text-sm">{lead.score}</div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {lead.last_contact_at ? format(new Date(lead.last_contact_at), 'MMM dd, yyyy') : '-'}
                                    </TableCell>
                                    <TableCell className={`text-right font-medium text-sm ${overdue ? 'text-destructive' : 'text-primary'}`}>
                                        {lead.next_followup_at ? format(new Date(lead.next_followup_at), 'MMM dd, yyyy') : '-'}
                                    </TableCell>
                                </TableRow>
                            )
                        }) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No active leads found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    trend?: {
        value: number
        label: string
        isPositive: boolean
    }
}

export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
    return (
        <Card className="hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all duration-300 bg-card border-border/50 relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="w-4 h-4 text-neon-cyan" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                {(description || trend) && (
                    <div className="mt-2 flex items-center text-xs">
                        {trend && (
                            <span className={`font-medium mr-2 ${trend.isPositive ? 'text-green-500' : 'text-destructive'}`}>
                                {trend.isPositive ? '+' : ''}{trend.value}%
                            </span>
                        )}
                        <span className="text-muted-foreground">{description || trend?.label}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

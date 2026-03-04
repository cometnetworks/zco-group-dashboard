'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FolderKanban, Users, CheckSquare, FileText, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

const routes = [
    { label: 'Overview', icon: LayoutDashboard, href: '/' },
    { label: 'Projects', icon: FolderKanban, href: '/projects' },
    { label: 'Leads', icon: Users, href: '/leads' },
    { label: 'Tasks', icon: CheckSquare, href: '/tasks' },
    { label: 'Content', icon: FileText, href: '/content' },
    { label: 'Agents', icon: Bot, href: '/agents' },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col w-64 h-full bg-card border-r border-border px-4 py-6 text-card-foreground">
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="w-8 h-8 rounded-lg bg-primary shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Z</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">ZCO Group</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {routes.map((route) => {
                    const isActive = pathname === route.href || (pathname.startsWith(route.href) && route.href !== '/')
                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-[inset_2px_0_0_0_theme(colors.primary.DEFAULT)]"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <route.icon className={cn("w-5 h-5", isActive ? "text-neon-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]" : "")} />
                            <span className="font-medium">{route.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto px-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <p className="text-xs text-muted-foreground">System Status</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        <span className="text-sm font-medium text-white">All systems operational</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

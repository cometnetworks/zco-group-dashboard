import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-background border-b border-border h-16">
            <div className="w-96 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search projects, leads, or tasks..."
                    className="pl-9 bg-card border-none focus-visible:ring-1 focus-visible:ring-primary h-9"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive shadow-[0_0_5px_rgba(239,68,68,0.6)]" />
                </button>

                <div className="w-px h-6 bg-border mx-2" />

                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium leading-none text-white">Miguel Cedillo</p>
                        <p className="text-xs text-muted-foreground mt-1">Founder / Operator</p>
                    </div>
                    <Avatar className="w-8 h-8 rounded-md ring-1 ring-border cursor-pointer">
                        <AvatarFallback className="bg-primary/20 text-primary font-medium rounded-md">
                            MC
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}

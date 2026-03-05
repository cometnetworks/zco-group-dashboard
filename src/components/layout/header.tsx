import { Bell, Search, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Sidebar } from './sidebar'

export function Header() {
    return (
        <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-background border-b border-border h-16">
            <div className="flex items-center gap-4 flex-1">
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-white transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 border-r border-border bg-card">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <Sidebar className="w-full border-r-0" />
                    </SheetContent>
                </Sheet>

                <div className="w-full max-w-96 relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects, leads, or tasks..."
                        className="pl-9 bg-card border-none focus-visible:ring-1 focus-visible:ring-primary h-9 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="md:hidden relative p-2 rounded-full text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                </button>

                <button className="relative p-2 rounded-full text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive shadow-[0_0_5px_rgba(239,68,68,0.6)]" />
                </button>

                <div className="w-px h-6 bg-border mx-2 hidden md:block" />

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

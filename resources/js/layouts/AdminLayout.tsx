import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { BookOpen, LayoutDashboard, Users, ShoppingBag, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { url } = usePage();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Books', href: '/admin/books', icon: BookOpen },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
        { name: 'Users', href: '/admin/users', icon: Users },
    ];

    return (
        <div className="flex h-screen bg-neutral-950 text-neutral-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-neutral-800 bg-neutral-900/50 backdrop-blur-xl">
                <div className="h-full flex flex-col">
                    <div className="flex items-center h-16 px-6 border-b border-neutral-800">
                        <Link href="/admin" className="text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Midnight Admin
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            // Exact match for dashboard, startswith for others
                            const isActive = item.href === '/admin' 
                                ? url === '/admin' 
                                : url.startsWith(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                        ${isActive 
                                            ? 'bg-indigo-500/10 text-indigo-400' 
                                            : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'
                                        }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-neutral-500'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-neutral-800">
                        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors">
                            <LogOut className="w-5 h-5" />
                            Exit Admin
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 flex items-center justify-between px-8 border-b border-neutral-800/50 bg-neutral-950/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button could go here */}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-400">Admin Mode</span>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

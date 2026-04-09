import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Users, BookOpen, ShoppingBag, DollarSign } from 'lucide-react';

interface DashboardProps {
    metrics: {
        totalUsers: number;
        totalBooks: number;
        totalOrders: number;
        totalSales: number;
    };
    recentOrders: Array<{
        id: number;
        user: { name: string };
        total_price: number;
        status: string;
        created_at: string;
    }>;
}

export default function Dashboard({ metrics, recentOrders }: DashboardProps) {
    const stats = [
        { name: 'Total Users', value: metrics.totalUsers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { name: 'Total Books', value: metrics.totalBooks, icon: BookOpen, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
        { name: 'Total Orders', value: metrics.totalOrders, icon: ShoppingBag, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { name: 'Total Revenue', value: `$${Number(metrics.totalSales).toFixed(2)}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
                    <p className="text-neutral-400">Overview of your store's performance metrics.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.name} className="relative overflow-hidden group bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 transition-all hover:bg-neutral-800/50">
                                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-32 h-32" />
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <h3 className="text-sm font-medium text-neutral-400">{stat.name}</h3>
                                </div>
                                <div className="text-4xl font-bold text-white">
                                    {stat.value}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Orders Section */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-neutral-800 border-opacity-50">
                        <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-neutral-400">
                            <thead className="text-xs text-neutral-500 uppercase bg-neutral-950/50">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Order ID</th>
                                    <th className="px-6 py-4 font-medium">Customer</th>
                                    <th className="px-6 py-4 font-medium">Amount</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(!recentOrders || recentOrders.length === 0) ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">No orders found.</td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">#{order.id}</td>
                                            <td className="px-6 py-4">{order.user?.name || 'Unknown'}</td>
                                            <td className="px-6 py-4 font-medium text-white">${Number(order.total_price).toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                                                    ${order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                                                    ${order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                                                    ${order.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                                                `}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-500">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

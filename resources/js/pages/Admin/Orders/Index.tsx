import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface OrderItem {
    id: number;
    book: { title: string; cover_image: string };
    quantity: number;
    price: number;
    subtotal: number;
}

interface Order {
    id: number;
    user: { name: string; email: string };
    total_price: number;
    status: string;
    created_at: string;
    order_items: OrderItem[];
    // Include shipping details if applicable
    address?: string;
    city?: string;
    phone?: string;
}

interface OrdersIndexProps {
    orders: {
        data: Order[];
        links: any[];
    };
}

export default function OrdersIndex({ orders }: OrdersIndexProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const updateStatus = (orderId: number, newStatus: string) => {
        router.post(`/admin/orders/${orderId}/status`, { status: newStatus });
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    };

    return (
        <AdminLayout>
            <Head title="Manage Orders" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Orders Management</h1>
                    <p className="text-neutral-400">View and process customer orders.</p>
                </div>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-neutral-400">
                        <thead className="text-xs text-neutral-500 uppercase bg-neutral-950/50 border-b border-neutral-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Total</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">No orders found.</td>
                                </tr>
                            ) : (
                                orders.data.map((order) => (
                                    <tr key={order.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">#{order.id}</td>
                                        <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-white">{order.user?.name}</div>
                                            <div className="text-xs text-neutral-500">{order.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">${Number(order.total_price).toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border inline-block
                                                ${order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                                                ${order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                                                ${order.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                                            `}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => setSelectedOrder(order)} className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors inline-block">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-3xl mt-auto sm:mt-0 shadow-2xl relative">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Order #{selectedOrder.id}</h3>
                                <p className="text-xs text-neutral-400">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-neutral-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">Customer Details</h4>
                                    <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800">
                                        <div className="font-medium text-white">{selectedOrder.user?.name}</div>
                                        <div className="text-sm text-neutral-400">{selectedOrder.user?.email}</div>
                                        {selectedOrder.phone && <div className="text-sm text-neutral-400 mt-1">{selectedOrder.phone}</div>}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">Shipping Address</h4>
                                    <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800 text-sm text-neutral-300">
                                        {selectedOrder.address ? (
                                            <div>
                                                {selectedOrder.address}<br />
                                                {selectedOrder.city}
                                            </div>
                                        ) : 'No address provided'}
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wider">Order Items</h4>
                            <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden mb-8">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Item</th>
                                            <th className="px-4 py-3 font-medium">Price</th>
                                            <th className="px-4 py-3 font-medium">Qty</th>
                                            <th className="px-4 py-3 font-medium text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-800/50">
                                        {selectedOrder.order_items?.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {item.book?.cover_image ? (
                                                            <img src={`/${item.book.cover_image}`} alt={item.book.title} className="w-8 h-10 object-cover rounded bg-neutral-800" />
                                                        ) : (
                                                            <div className="w-8 h-10 bg-neutral-800 rounded"></div>
                                                        )}
                                                        <span className="text-white font-medium line-clamp-1">{item.book?.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-neutral-400">${Number(item.price).toFixed(2)}</td>
                                                <td className="px-4 py-3 text-neutral-400">{item.quantity}</td>
                                                <td className="px-4 py-3 text-right text-emerald-400">${Number(item.subtotal).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-neutral-900 border-t border-neutral-800">
                                        <tr>
                                            <td colSpan={3} className="px-4 py-3 text-right font-medium text-white">Total</td>
                                            <td className="px-4 py-3 text-right font-bold text-emerald-400">${Number(selectedOrder.total_price).toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-neutral-400">Update Status:</span>
                                    <select 
                                        value={selectedOrder.status}
                                        onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                                        className="bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <Button onClick={() => setSelectedOrder(null)} variant="outline" className="bg-transparent border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white">
                                    Close Details
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

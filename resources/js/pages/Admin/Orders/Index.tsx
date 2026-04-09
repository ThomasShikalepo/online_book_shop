import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Eye, Upload, Download, Loader2, X, FileText } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface OrderItem {
    id: number;
    book: { title: string; cover_image: string };
    quantity: number;
    price: number;
    subtotal: number;
    pdf_path?: string;
}

interface Order {
    id: number;
    user: { name: string; email: string };
    total_price: number;
    status: string;
    created_at: string;
    order_items: OrderItem[];
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
    const [uploadingItemId, setUploadingItemId] = useState<number | null>(null);
    const [uploadErrorId, setUploadErrorId] = useState<number | null>(null);
    const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(null);
    const [isSavingStatus, setIsSavingStatus] = useState(false);
    // Track selected file per item
    const [selectedFiles, setSelectedFiles] = useState<Record<number, File | null>>({});
    const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

    const saveStatus = () => {
        if (!selectedOrder) return;
        setIsSavingStatus(true);
        router.post(`/admin/orders/${selectedOrder.id}/status`, { status: selectedOrder.status }, {
            onSuccess: () => setIsSavingStatus(false),
            onError: () => setIsSavingStatus(false),
        });
    };

    const handleFileSelect = (itemId: number, file: File | null) => {
        setSelectedFiles(prev => ({ ...prev, [itemId]: file }));
        setUploadErrorId(null);
        setUploadErrorMessage(null);
    };

    const handlePdfUpload = (item: OrderItem) => {
        const file = selectedFiles[item.id];
        if (!file) return;

        setUploadingItemId(item.id);
        setUploadErrorId(null);
        const formData = new FormData();
        formData.append('pdf', file);

        router.post(`/admin/order-items/${item.id}/pdf`, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setUploadingItemId(null);
                setSelectedFiles(prev => ({ ...prev, [item.id]: null }));
                setUploadErrorMessage(null);
                // Clear file input
                if (fileInputRefs.current[item.id]) {
                    fileInputRefs.current[item.id]!.value = '';
                }
            },
            onError: (errors: any) => {
                setUploadingItemId(null);
                setUploadErrorId(item.id);
                setUploadErrorMessage(errors?.pdf || errors?.message || "Upload failed. File might be too large.");
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Manage Orders" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Orders Management</h1>
                    <p className="text-neutral-400">View, process, and deliver PDFs for customer orders.</p>
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
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl mt-auto sm:mt-0 shadow-2xl relative my-4">
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

                            <h4 className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wider">Order Items & PDF Delivery</h4>
                            <div className="space-y-3 mb-8">
                                {selectedOrder.order_items?.map((item) => (
                                    <div key={item.id} className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden">
                                        {/* Item Summary Row */}
                                        <div className="flex items-center gap-4 px-4 py-3">
                                            {item.book?.cover_image ? (
                                                <img src={`/${item.book.cover_image}`} alt={item.book.title} className="w-8 h-10 object-cover rounded bg-neutral-800 flex-shrink-0" />
                                            ) : (
                                                <div className="w-8 h-10 bg-neutral-800 rounded flex-shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="text-white font-medium line-clamp-1">{item.book?.title}</div>
                                                <div className="text-xs text-neutral-500">Qty: {item.quantity} · ${Number(item.price).toFixed(2)} each · Subtotal: <span className="text-emerald-400">${Number(item.subtotal).toFixed(2)}</span></div>
                                            </div>
                                            {/* PDF Status badge */}
                                            {item.pdf_path ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                                                    <FileText className="w-3 h-3" /> PDF Ready
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-500 border border-neutral-700 flex-shrink-0">
                                                    No PDF
                                                </span>
                                            )}
                                        </div>

                                        {/* PDF Upload/Download Panel */}
                                        <div className="border-t border-neutral-800 px-4 py-3 bg-neutral-900/50">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <label className="text-xs font-medium text-neutral-400 flex-shrink-0">
                                                    {item.pdf_path ? 'Replace PDF:' : 'Upload PDF:'}
                                                </label>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.epub,.mobi"
                                                    ref={el => { fileInputRefs.current[item.id] = el; }}
                                                    onChange={e => handleFileSelect(item.id, e.target.files?.[0] ?? null)}
                                                    className={`flex-1 min-w-0 text-xs text-neutral-400 bg-neutral-950 border ${uploadErrorId === item.id ? 'border-red-500' : 'border-neutral-800'} rounded-lg px-3 py-1.5 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 focus:outline-none`}
                                                />
                                                <button
                                                    onClick={() => handlePdfUpload(item)}
                                                    disabled={!selectedFiles[item.id] || uploadingItemId === item.id}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                                                >
                                                    {uploadingItemId === item.id ? (
                                                        <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...</>
                                                    ) : uploadErrorId === item.id ? (
                                                        <>Failed. Retry?</>
                                                    ) : (
                                                        <><Upload className="w-3.5 h-3.5" /> Upload</>
                                                    )}
                                                </button>
                                                {item.pdf_path && (
                                                    <a
                                                        href={`/${item.pdf_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors flex-shrink-0"
                                                    >
                                                        <Download className="w-3.5 h-3.5" /> Download PDF
                                                    </a>
                                                )}
                                            </div>
                                            {uploadErrorId === item.id && uploadErrorMessage && (
                                                <div className="mt-2 text-xs font-medium text-red-500 animate-pulse">
                                                    {uploadErrorMessage}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Total Row */}
                            <div className="bg-neutral-950 rounded-xl border border-neutral-800 px-4 py-3 flex justify-between items-center mb-8">
                                <span className="text-sm font-medium text-white">Order Total</span>
                                <span className="text-lg font-bold text-emerald-400">${Number(selectedOrder.total_price).toFixed(2)}</span>
                            </div>

                            <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-neutral-400">Update Status:</span>
                                    <select 
                                        value={selectedOrder.status}
                                        onChange={(e) => setSelectedOrder(prev => prev ? { ...prev, status: e.target.value } : null)}
                                        className="bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    <Button 
                                        onClick={saveStatus}
                                        disabled={isSavingStatus}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white border-0 disabled:opacity-50 gap-2 h-9 ml-2"
                                    >
                                        {isSavingStatus && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Save Status
                                    </Button>
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

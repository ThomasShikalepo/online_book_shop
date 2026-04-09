import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Package, Calendar, MapPin, Phone, Mail, User, Info, FileText } from 'lucide-react';
import React from 'react';

type Book = {
  title: string;
  cover_image?: string;
};

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  subtotal: number;
  total: number;
  book?: Book;
  pdf_path?: string;
};

type Order = {
  id: number;
  total_price: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  created_at: string;
  order_items: OrderItem[]; // Laravel often serializes to snake_case
  orderItems?: OrderItem[]; // Fallback
};

export default function OrdersPage() {
  const { orders = [] } = usePage().props as any;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Head title="My Orders" />

      <div className="min-h-screen bg-[#020617] text-white py-20 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-400/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-16 border-l-4 border-amber-400 pl-8"
          >
            <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Orders</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl">
              Track your literary adventures. Review your history and detailed order information.
            </p>
          </motion.div>

          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl p-16 text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-400/20">
                <Package className="w-12 h-12 text-amber-400" />
              </div>
              <p className="text-white text-2xl font-black mb-8">You haven't placed any orders yet.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-amber-400/20 transition-all duration-300"
              >
                Explore Library <ChevronRight className="w-6 h-6" />
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-12"
            >
              {orders.map((order: Order) => {
                // Ensure we have access to order items regardless of serialization
                const itemsList = order.order_items || order.orderItems || [];
                
                return (
                  <motion.div 
                    key={order.id} 
                    variants={item}
                    className="overflow-hidden rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl group transition-all duration-500 hover:border-white/20"
                  >
                    {/* Order Header */}
                    <div className="border-b border-white/10 bg-white/[0.02] px-8 py-8 sm:px-12">
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-amber-400/10 rounded-2xl flex items-center justify-center border border-amber-400/20">
                                <Package className="w-8 h-8 text-amber-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Order #{order.id}</h1>
                                <div className="flex items-center gap-2 text-slate-400 mt-1">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-bold">{new Date(order.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {order.status === 'completed' && itemsList.some((i: OrderItem) => i.pdf_path) && (
                                <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-black shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-pulse uppercase tracking-wider">
                                    <FileText className="w-4 h-4" /> Downloads Ready
                                </div>
                            )}
                            <div className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider border shadow-lg ${
                                order.status === 'completed' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                            }`}>
                                {order.status}
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-8 py-8 sm:px-12">
                      <div className="grid gap-12 md:grid-cols-2 mb-12">
                        {/* Customer Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <User className="w-5 h-5 text-amber-400" />
                                <h3 className="text-amber-400 font-black uppercase tracking-widest text-sm">Customer Info</h3>
                            </div>
                            <div className="space-y-3 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                                <p className="text-xl font-black text-white">{order.name}</p>
                                <div className="flex items-center gap-2 text-slate-400 font-medium italic">
                                    <Mail className="w-4 h-4" />
                                    <span>{order.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 font-medium">
                                    <Phone className="w-4 h-4" />
                                    <span>{order.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-5 h-5 text-amber-400" />
                                <h3 className="text-amber-400 font-black uppercase tracking-widest text-sm">Shipping address</h3>
                            </div>
                            <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 space-y-2">
                                <p className="text-lg font-bold text-white leading-relaxed">{order.address}</p>
                                <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">
                                    {order.city}, {order.state ?? ''} {order.country} {order.postal_code ?? ''}
                                </p>
                            </div>
                        </div>
                      </div>

                      {/* Order Items Table */}
                      <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20 shadow-inner">
                        <div className="bg-white/5 px-8 py-4 text-xs font-black text-amber-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Info className="w-4 h-4" /> Order Items Details
                        </div>
                        <div className="divide-y divide-white/5">
                          {itemsList.map((item) => (
                            <div key={item.id} className="px-8 py-8 transition-colors hover:bg-white/[0.02]">
                              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-8">
                                  <div className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-white/5 border border-white/10 p-1 relative lg:group/cover">
                                    {order.status === 'completed' && item.pdf_path ? (
                                        <a href={`/${item.pdf_path}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative cursor-pointer">
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center rounded-lg z-10">
                                                <span className="text-white text-[10px] font-black uppercase bg-indigo-500 px-2 py-1 rounded">Read PDF</span>
                                            </div>
                                            {item.book?.cover_image ? (
                                                <img
                                                    src={item.book.cover_image.startsWith('http') || item.book.cover_image.startsWith('/') ? item.book.cover_image : `/${item.book.cover_image}`}
                                                    alt={item.book?.title}
                                                    className="h-full w-full object-cover rounded-lg"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-black uppercase tracking-tighter text-[10px] text-center px-2 rounded-lg">
                                                    Cover Missing
                                                </div>
                                            )}
                                        </a>
                                    ) : (
                                        item.book?.cover_image ? (
                                            <img
                                                src={item.book.cover_image.startsWith('http') || item.book.cover_image.startsWith('/') ? item.book.cover_image : `/${item.book.cover_image}`}
                                                alt={item.book?.title}
                                                className="h-full w-full object-cover rounded-lg"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-black uppercase tracking-tighter text-[10px] text-center px-2 rounded-lg">
                                                Cover Missing
                                            </div>
                                        )
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    {order.status === 'completed' && item.pdf_path ? (
                                        <a href={`/${item.pdf_path}`} target="_blank" rel="noopener noreferrer" className="block">
                                            <p className="text-2xl font-black text-white leading-tight hover:text-indigo-400 transition-colors">{item.book?.title ?? 'Book Title'}</p>
                                        </a>
                                    ) : (
                                        <p className="text-2xl font-black text-white leading-tight group-hover:text-amber-400 transition-colors">{item.book?.title ?? 'Book Title'}</p>
                                    )}
                                    <div className="flex items-center gap-4 flex-wrap">
                                        {order.status === 'completed' && item.pdf_path && (
                                            <a href={`/${item.pdf_path}`} target="_blank" rel="noopener noreferrer">
                                                <div className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-xs font-black border border-emerald-500/20 uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                                    </span>
                                                    Read PDF Available
                                                </div>
                                            </a>
                                        )}
                                        <div className="bg-amber-400/10 text-amber-400 px-3 py-1 rounded-lg text-xs font-black border border-amber-400/20 uppercase tracking-widest">
                                            Qty: {item.quantity}
                                        </div>
                                        <span className="text-slate-500 font-bold">x</span>
                                        <span className="text-slate-300 font-bold">N$ {Number(item.price).toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                  <p className="text-amber-400 text-3xl font-black tracking-tighter">N$ {Number(item.total).toFixed(2)}</p>
                                  <span className="text-slate-500 text-[10px] uppercase font-black tracking-[0.3em]">Item Total</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Summary Footer */}
                      <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-amber-400 blur-xl opacity-20" />
                                <div className="relative bg-amber-400 text-black px-8 py-4 rounded-2xl font-black text-3xl shadow-xl shadow-amber-400/20">
                                    N$ {parseFloat(order.total_price).toFixed(2)}
                                </div>
                            </div>
                            <div>
                                <p className="text-amber-400 font-black uppercase tracking-widest text-xs mb-1">Total Bill</p>
                                <p className="text-slate-400 text-sm font-medium italic">Including taxes and shipping</p>
                            </div>
                        </div>
                        <Link 
                            href={`/orders/${order.id}`}
                            className="hidden text-amber-400 font-black uppercase tracking-[0.2em] text-xs hover:text-white transition-colors items-center gap-2 group"
                        >
                            View Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
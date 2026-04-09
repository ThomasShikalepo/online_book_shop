import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTrash, HiOutlineShoppingCart, HiOutlineHeart } from 'react-icons/hi';
import { Button } from '@/components/ui/button';

type Book = {
    id: number;
    title: string;
    description: string;
    category: string;
    cover_image: string;
    old_price: number;
    new_price: number;
};

type WishlistItem = {
    id: number;
    book: Book;
};

interface Props {
    wishlistItems: WishlistItem[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
    }
};

export default function WishlistPage({ wishlistItems }: Props) {
    const removeFromWishlist = (id: number) => {
        router.delete(`/wishlist/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white py-12 px-6 sm:px-12">
            <Head title="My Wishlist" />
            
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-amber-400/10 rounded-2xl border border-amber-400/20">
                        <HiOutlineHeart className="size-8 text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">My Wishlist</h1>
                        <p className="text-slate-400 mt-1">Saved treasures waiting for you.</p>
                    </div>
                </div>

                {wishlistItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-20 text-center"
                    >
                        <div className="size-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                            <HiOutlineHeart className="size-12 text-slate-500" />
                        </div>
                        <h2 className="text-3xl font-black mb-4">Your wishlist is empty</h2>
                        <p className="text-slate-400 mb-10 max-w-md mx-auto text-lg">
                            Explore our library and save the books that capture your imagination.
                        </p>
                        <Link href="/">
                            <Button className="bg-amber-400 hover:bg-amber-500 text-black font-black px-10 py-6 rounded-2xl text-lg shadow-xl shadow-amber-400/20 transition-all active:scale-95">
                                Browse Books
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {wishlistItems.map((item) => (
                                <motion.div 
                                    key={item.id}
                                    variants={itemVariants}
                                    layout
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 group hover:bg-white/10 transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="flex gap-6 mb-8 items-start">
                                        <div className="w-32 h-44 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                                            <img
                                                src={item.book.cover_image.startsWith('http') || item.book.cover_image.startsWith('/') ? item.book.cover_image : `/${item.book.cover_image}`}
                                                alt={item.book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full mb-3 inline-block">
                                                {item.book.category}
                                            </span>
                                            <h3 className="text-xl font-black text-white leading-tight mb-2 line-clamp-2">
                                                {item.book.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-4">
                                                <span className="text-2xl font-black text-amber-400">N${item.book.new_price}</span>
                                                {item.book.old_price > 0 && (
                                                    <span className="text-sm text-slate-500 line-through font-bold">N${item.book.old_price}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-slate-400 text-sm line-clamp-2 mb-8 flex-1">
                                        {item.book.description}
                                    </p>

                                    <div className="flex gap-3">
                                        <Button 
                                            onClick={() => router.post('/cart', { book_id: item.book.id })}
                                            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-2xl gap-2 border border-white/5 transition-all active:scale-95"
                                        >
                                            <HiOutlineShoppingCart className="size-5" />
                                            Add to Cart
                                        </Button>
                                        <button 
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="p-4 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/10 transition-all active:scale-95 shadow-lg shadow-rose-500/5"
                                            title="Remove from wishlist"
                                        >
                                            <HiOutlineTrash className="size-6" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

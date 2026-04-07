'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

type Book = {
    id: number;
    title: string;
    description: string;
    category: string;
    trending: boolean;
    cover_image: string;
    old_price: number;
    new_price: number;
};

type Props = {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: () => void;
    processing?: boolean;
};

export function BookDetailsModal({ book, isOpen, onClose, onAddToCart, processing }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

    }, []);

    if (!book || !mounted) 
        
        return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ 
                            type: 'spring', 
                            damping: 25, 
                            stiffness: 200,
                            mass: 0.5
                        }}
                        className="relative w-[95vw] max-w-[1400px] h-full max-h-[90vh] bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 flex flex-col md:flex-row z-[10000]"
                    >
                      
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                onClose();
                            }}
                            className="absolute top-8 right-8 z-50 p-4 rounded-full bg-black/5 hover:bg-black/10 transition-all text-black hover:rotate-90 group"
                        >
                            <FiX className="size-8 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Image Section - Takes 45% of width */}
                        <div className="w-full md:w-[45%] h-[40%] md:h-full bg-[#f8f9fa] flex items-center justify-center p-10 md:p-20 relative border-b md:border-b-0 md:border-r border-gray-100">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative z-10 w-full flex justify-center"
                            >
                                <img
                                    src={`/images/books/${book.cover_image}`}
                                    alt={book.title}
                                    className="w-full max-w-[450px] aspect-[2/3] object-contain rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-[1.03]"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                                    }}
                                />
                            </motion.div>
                            
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                                <div className="absolute top-[10%] left-[10%] size-64 bg-blue-500/10 blur-[100px] rounded-full" />
                                <div className="absolute bottom-[10%] right-[10%] size-64 bg-yellow-500/10 blur-[100px] rounded-full" />
                            </div>
                        </div>

                        <div className="w-full md:w-[55%] h-[60%] md:h-full p-10 md:p-20 flex flex-col scrollbar-hide overflow-y-auto bg-white">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-auto"
                            >
                                <span className="inline-flex px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-black uppercase tracking-[0.2em] mb-8 shadow-xl shadow-blue-600/20">
                                    {book.category}
                                </span>
                                
                                <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.05] mb-8 tracking-tighter">
                                    {book.title}
                                </h2>
                                
                                <div className="flex items-center gap-8 mb-12">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] mb-2">Selling Price</span>
                                        <span className="text-5xl md:text-6xl font-black text-blue-600">
                                            N$ {book.new_price}
                                        </span>
                                    </div>
                                    <div className="flex flex-col opacity-30">
                                        <span className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] mb-2">Original Price</span>
                                        <span className="text-3xl font-bold line-through">
                                            N$ {book.old_price}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    <h4 className="text-xs text-gray-400 font-black uppercase tracking-[0.2em]">About this Book</h4>
                                    <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium">
                                        {book.description}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-12 md:mt-20"
                            >
                                <Button
                                    onClick={onAddToCart}
                                    disabled={processing}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black h-20 md:h-24 rounded-[2rem] text-2xl md:text-3xl shadow-[0_25px_50px_-12px_rgba(250,204,21,0.5)] hover:shadow-[0_30px_60px_-12px_rgba(250,204,21,0.6)] transition-all active:scale-[0.97] flex items-center justify-center gap-4"
                                >
                                    <FiShoppingCart className="size-8 md:size-10" />
                                    {processing ? 'Adding to Cart...' : 'Add to Cart'}
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

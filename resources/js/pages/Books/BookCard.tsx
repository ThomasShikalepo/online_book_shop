import { Link, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineHeart } from 'react-icons/hi';
import { BookDetailsModal } from '@/components/book-details-modal';

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

export default function BookCard({ book, className = "" }: { book: Book, className?: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { post, processing } = useForm({
        book_id: book.id,
    });

    const handleAddToCart = () => {
        if (processing) {
            return;
        }

        post('/cart', {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <motion.div 
            whileHover={{ 
                y: -5, 
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4)' 
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`flex gap-4 bg-white/5 backdrop-blur-2xl p-3 w-full rounded-2xl group relative overflow-hidden border border-white/10 shadow-xl cursor-pointer ${className}`}
            onClick={() => setIsModalOpen(true)}
        >
            {/* Background Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="shrink-0">
                <div className="border border-white/10 rounded-xl p-1 bg-[#0f172a] shadow-lg">
                    <img
                        src={book.cover_image.startsWith('http') || book.cover_image.startsWith('/') ? book.cover_image : `/${book.cover_image}`}
                        alt={book.title}
                        className="w-40 h-64 object-cover rounded-lg"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col justify-between py-1 flex-1 min-w-0 z-10 text-left">
                <div>
                    <div>
                        <h3 className="text-[20px] leading-snug font-black text-white line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
                            {book.title}
                        </h3>
                    </div>

                    <p className="text-slate-400 text-sm mt-3 leading-relaxed line-clamp-4 font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {book.description}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-black text-amber-400">
                            N$ {book.new_price}
                        </span>
                        <span className="text-lg text-slate-500 line-through font-bold decoration-slate-600/50">
                            N$ {book.old_price}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                            disabled={processing}
                            className="bg-amber-400 hover:bg-amber-500 disabled:opacity-70 transition-all text-black px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-black shadow-lg shadow-amber-400/20 flex-1"
                        >
                            <FiShoppingCart className="text-lg" />
                            {processing ? 'Add' : 'Add to Cart'}
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                router.post('/wishlist', { book_id: book.id }, { preserveScroll: true });
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-xl transition-all border border-white/10 active:scale-95 shadow-xl"
                        >
                            <HiOutlineHeart className="text-lg text-amber-400" />
                        </button>
                    </div>
                </div>
            </div>

            <BookDetailsModal 
                book={book}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToCart={handleAddToCart}
                processing={processing}
            />
        </motion.div>
    );
}
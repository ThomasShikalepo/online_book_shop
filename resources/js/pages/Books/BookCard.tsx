import { Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
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
                y: -10, 
                rotateX: 2,
                rotateY: -2,
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5)' 
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`flex flex-col md:flex-row gap-10 bg-white/5 backdrop-blur-2xl p-8 w-full rounded-[2.5rem] group relative overflow-hidden border border-white/10 shadow-2xl ${className}`}
            onClick={() => setIsModalOpen(true)}
        >
            {/* Background Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="shrink-0 overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-amber-400/10 transition-shadow duration-500 mx-auto md:mx-0">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="border border-white/10 p-1 bg-[#0f172a]"
                >
                    <img
                        src={`/images/books/${book.cover_image}`}
                        alt={book.title}
                        className="w-64 h-96 object-cover rounded-xl"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                        }}
                    />
                </motion.div>
            </div>

            <div className="flex flex-col justify-between py-4 flex-1 min-w-0 z-10 text-center md:text-left">
                <div className="space-y-6">
                    <h3 className="text-4xl md:text-5xl leading-tight font-black text-white line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
                        {book.title}
                    </h3>

                    <p className="text-slate-400 text-lg leading-relaxed line-clamp-4 font-medium">
                        {book.description}
                    </p>
                </div>

                <div className="mt-8">
                    <div className="flex items-center justify-center md:justify-start gap-6 mb-8">
                        <span className="text-5xl font-black text-amber-400">
                            N$ {book.new_price}
                        </span>
                        <span className="text-xl text-slate-500 line-through font-bold decoration-slate-600/50">
                            N$ {book.old_price}
                        </span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251, 191, 36, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                        disabled={processing}
                        className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-70 transition-all text-black py-6 rounded-2xl flex items-center justify-center gap-4 font-black text-2xl shadow-lg shadow-amber-400/20"
                    >
                        <FiShoppingCart className="text-3xl" />
                        {processing ? 'Adding...' : 'Add to Cart'}
                    </motion.button>
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
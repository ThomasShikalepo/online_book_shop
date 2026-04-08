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

export default function RecommendedBookCard({ book }: { book: Book }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { post, processing } = useForm({
        book_id: book.id,
    });

    const handleAddToCart = () => {
        post('/cart', {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <motion.div 
            whileHover={{ 
                y: -10, 
                rotateX: 3,
                rotateY: -3,
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5)' 
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden group border border-white/10 p-5 shadow-2xl cursor-none relative"
            onClick={() => setIsModalOpen(true)}
        >
            {/* Background Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="block overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-amber-400/10 transition-all duration-500">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="border border-white/10 p-2 bg-[#0f172a]"
                >
                    <img
                        src={`/images/books/${book.cover_image}`}
                        alt={book.title}
                        className="w-full h-72 object-cover rounded-xl"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                        }}
                    />
                </motion.div>
            </div>

            <div className="pt-6 pb-2 z-10 relative space-y-3">
                <h3 className="text-xl font-black text-white line-clamp-2 group-hover:text-amber-400 transition-colors duration-300 tracking-tight leading-tight">
                    {book.title}
                </h3>

                <p className="text-sm text-slate-400 line-clamp-2 font-medium leading-relaxed">
                    {book.description}
                </p>

                <div className="flex items-center gap-3 mt-4">
                    <span className="text-3xl font-black text-amber-400">
                        N${book.new_price}
                    </span>
                    <span className="text-sm text-slate-500 line-through font-bold decoration-slate-600/50">
                        N${book.old_price}
                    </span>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                    disabled={processing}
                    className="mt-6 w-full bg-amber-400 hover:bg-amber-500 transition-all text-black py-4 rounded-xl flex items-center justify-center gap-3 font-black shadow-lg shadow-amber-400/20"
                >
                    <FiShoppingCart className="text-xl" />
                    {processing ? 'Adding...' : 'Add to Cart'}
                </motion.button>
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
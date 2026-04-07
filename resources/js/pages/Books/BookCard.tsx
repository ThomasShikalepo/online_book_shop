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

export default function BookCard({ book }: { book: Book }) {
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
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex gap-4 bg-white/80 backdrop-blur-md p-3 w-full max-w-md rounded-xl border border-white/20 shadow-sm cursor-pointer"
            onClick={() => setIsModalOpen(true)}
        >
            <div className="shrink-0 overflow-hidden rounded-md">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 rounded-md p-1 bg-white"
                >
                    <img
                        src={`/images/books/${book.cover_image}`}
                        alt={book.title}
                        className="w-40 h-64 object-cover rounded-sm"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                        }}
                    />
                </motion.div>
            </div>

            <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                <div>
                    <h3 className="text-[20px] leading-snug font-medium text-black line-clamp-2 hover:text-yellow-600 transition">
                        {book.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-3 leading-7 line-clamp-4">
                        {book.description}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-semibold text-black">
                            N$ {book.new_price}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                            N$ {book.old_price}
                        </span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                        disabled={processing}
                        className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-70 transition-colors text-black px-6 py-3 rounded-md flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
                    >
                        <FiShoppingCart className="text-lg" />
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
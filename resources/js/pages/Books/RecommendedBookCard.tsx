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
            whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/80 backdrop-blur-md rounded-lg overflow-hidden group border border-white/20 p-2 shadow-sm cursor-pointer"
            onClick={() => setIsModalOpen(true)}
        >
            <div className="block overflow-hidden rounded-md">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 rounded-md p-2 bg-white"
                >
                    <img
                        src={`/images/books/${book.cover_image}`}
                        alt={book.title}
                        className="w-full h-72 object-cover rounded-md"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                        }}
                    />
                </motion.div>
            </div>

            <div className="pt-4">
                <h3 className="text-lg font-medium text-black line-clamp-2 hover:text-yellow-600 transition">
                    {book.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {book.description}
                </p>

                <div className="flex items-center gap-2 mt-3">
                    <span className="text-xl font-semibold text-black">
                        N${book.new_price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                        N${book.old_price}
                    </span>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                    disabled={processing}
                    className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 transition-colors text-black px-4 py-3 rounded-md flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
                >
                    <FiShoppingCart className="text-lg" />
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
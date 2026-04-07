import { Link, useForm } from '@inertiajs/react';
import { FiShoppingCart } from 'react-icons/fi';

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
        <div className="flex gap-4 bg-white p-3 w-full max-w-md">
            <Link href={`/books/${book.id}`} className="shrink-0">
                <div className="border border-gray-200 rounded-md p-1">
                    <img
                        src={`/images/books/${book.cover_image}`}
                        alt={book.title}
                        className="w-40 h-64 object-cover rounded-sm"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                        }}
                    />
                </div>
            </Link>

            <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                <div>
                    <Link href={`/books/${book.id}`}>
                        <h3 className="text-[20px] leading-snug font-medium text-black line-clamp-2 hover:text-yellow-600 transition">
                            {book.title}
                        </h3>
                    </Link>

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

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={processing}
                        className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-70 transition text-black px-6 py-3 rounded-md flex items-center gap-2 font-medium"
                    >
                        <FiShoppingCart className="text-lg" />
                        {processing ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
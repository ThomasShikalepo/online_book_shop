import { Link } from '@inertiajs/react';
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

export default function RecommendedBookCard({ book }: { book: Book }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden group">
            <Link href={`/books/${book.id}`} className="block">
                <div className="border border-gray-200 rounded-md p-2">
                    <img
                        src={`/images/books/${book.cover_image}`}
                        alt={book.title}
                        className="w-full h-72 object-cover rounded-md group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/books/book-1.png';
                        }}
                    />
                </div>
            </Link>

            <div className="pt-4">
                <Link href={`/books/${book.id}`}>
                    <h3 className="text-lg font-medium text-black line-clamp-2 hover:text-yellow-600 transition">
                        {book.title}
                    </h3>
                </Link>

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

                <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 transition text-black px-4 py-3 rounded-md flex items-center justify-center gap-2 font-medium">
                    <FiShoppingCart className="text-lg" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
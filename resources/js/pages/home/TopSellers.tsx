import { motion } from 'framer-motion';
import type { Book } from '@/types/book';
import BookCard from '../Books/BookCard';

type TopSellersProps = {
  books: Book[];
};

export const TopSellers = ({ books }: TopSellersProps) => {
    if (!books || books.length === 0) {
        return (
            <section className="max-w-screen-2xl mx-auto px-4 py-16 text-center">
                <h2 className="text-4xl font-black mb-4 text-white uppercase tracking-tighter">Top Sellers</h2>
                <div className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                    <p className="text-amber-400 font-bold text-xl">No books found in the collection.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-screen-2xl mx-auto px-6 py-20 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-400/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-1 w-12 bg-amber-400 rounded-full" />
                        <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs">Best Performance</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 drop-shadow-[0_0_20px_rgba(251,191,36,0.2)]">Sellers</span>
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
                {books.map((book, index) => (
                    <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: Math.min(index * 0.05, 0.5) }}
                    >
                        <BookCard book={book} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
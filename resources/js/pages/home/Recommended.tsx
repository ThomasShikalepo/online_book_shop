import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Book } from '@/types/book';
import BookCard from '../Books/BookCard';

type RecommendedProps = {
  books: Book[];
};

export const Recommended = ({ books }: RecommendedProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Choose a genre');

  const allCategories = ['Choose a genre', ...new Set(books.map(book => book.category.toLowerCase()))];

  const filteredBooks =
    selectedCategory === 'Choose a genre'
      ? books
      : books.filter(
          (book) => book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className="max-w-screen-2xl mx-auto px-6 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-amber-400 rounded-full" />
            <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs">Full Collection</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 drop-shadow-[0_0_20px_rgba(251,191,36,0.2)]">Books</span>
          </h2>
        </div>

        <div className="relative group min-w-[240px]">
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white transition-all duration-500 font-black shadow-2xl backdrop-blur-xl group-hover:border-white/20"
          >
            {allCategories.map((category) => (
              <option key={category} value={category} className="bg-[#020617] text-white py-4">
                {category === 'Choose a genre'
                  ? category
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-amber-400 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
        {filteredBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 4) * 0.1 }}
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
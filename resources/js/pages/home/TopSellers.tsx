import { useState } from 'react';
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Book } from '@/types/book';
import BookCard from '../Books/BookCard';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type TopSellersProps = {
  books: Book[];
};

const categories = ['Choose a genre', 'business', 'productivity', 'fiction', 'horror', 'adventure'];

export const TopSellers = ({ books }: TopSellersProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Choose a genre');

  if (!books || books.length === 0) {
    return (
      <section className="max-w-screen-2xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-black mb-4 text-white uppercase tracking-tighter">Top Sellers</h2>
        <p className="text-amber-400 font-bold">No books found.</p>
      </section>
    );
  }

  const topSellerBooks = books.slice(0, 10);

  const filteredBooks =
    selectedCategory === 'Choose a genre'
      ? topSellerBooks
      : topSellerBooks.filter(
          (book) => book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <h2 className="text-4xl font-black mb-10 text-white uppercase tracking-tighter relative z-10">
        Top <span className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">Sellers</span>
      </h2>

      <div className="mb-12 flex items-center">
        <div className="relative group">
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none border bg-white/5 border-white/10 rounded-2xl px-6 py-3.5 focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white transition-all duration-300 font-bold shadow-inner min-w-[220px]"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-[#0f172a] text-white">
                {category === 'Choose a genre'
                  ? category
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-amber-400 transition-colors">
            ▼
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-gray-500">No books found in this category.</p>
      ) : (
        <Swiper
          modules={[Pagination, Navigation]}
          navigation
          pagination={{ clickable: true }}
          grabCursor={true}
          allowTouchMove={true}
          simulateTouch={true}
          speed={600}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="custom-swiper px-10 py-8"
        >
          {filteredBooks.map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};
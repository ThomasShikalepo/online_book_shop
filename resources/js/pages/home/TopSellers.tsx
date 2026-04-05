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

const categories = ['Choose a genre', 'business', 'fiction', 'horror', 'adventure'];

export const TopSellers = ({ books }: TopSellersProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Choose a genre');

  if (!books || books.length === 0) {
    return (
      <section className="max-w-screen-2xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-4 text-black">Top Sellers</h2>
        <p className="text-red-500">No books found.</p>
      </section>
    );
  }

  const filteredBooks =
    selectedCategory === 'Choose a genre'
      ? books
      : books.filter(
        (book) => book.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-black">Top Sellers</h2>

      <div className="mb-8 flex items-center">
        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none text-black"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'Choose a genre'
                ? category
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
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
          className="custom-swiper px-10"
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
              spaceBetween: 50,
            },
          }}
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
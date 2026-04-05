import type { Book } from '@/types/book';
import BookCard from '../Books/BookCard';

type RecommendedProps = {
  books: Book[];
};

export const Recommended = ({ books }: RecommendedProps) => {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-black">
        Recommended Books
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};
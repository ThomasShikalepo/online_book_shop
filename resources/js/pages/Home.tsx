
import Navbar from '@/components/ui/Navbar';
import { Banner } from './home/Banner';
import { Recommended } from './home/Recommended';
import {TopSellers} from './home/TopSellers';



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

export default function Home({ books }: { books: Book[] }) {

    return (
        <>
             <Navbar />
             <section className="bg-[#F3F5F6]">
                 <Banner />
             </section>
             <section className="bg-white">
                 <TopSellers books={books} />
             </section>
             <section className="bg-white">
                <Recommended  books={books}/>
             </section>
        </>
    );
}

import Navbar from '@/components/ui/Navbar';
import { DynamicBackground } from '@/components/dynamic-background';
import { Banner } from './home/Banner';
import Footer from './home/Footer';
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
            <DynamicBackground />
             <Navbar />
             <section className="bg-transparent py-10">
                 <Banner />
             </section>
             <section className="bg-transparent py-10">
                 <TopSellers books={books} />
             </section>
             <section className="bg-transparent py-10">
                <Recommended  books={books}/>
             </section>
             
             <section className="bg-transparent py-10">
                <Footer  />
             </section>
            
        </>
    );
}
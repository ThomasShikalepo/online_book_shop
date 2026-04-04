
import Navbar from '@/components/ui/Navbar';
import { Banner } from './home/Banner';
import { TopSellers } from './home/TopSellers';

export default function Home() {

    return (
        <>
             <Navbar />
             <section className="bg-[#F3F5F6]">
                 <Banner />
             </section>
             <section className="bg-white">
                 <TopSellers />
             </section>
        </>
    );
}
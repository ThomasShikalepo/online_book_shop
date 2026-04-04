
import Navbar from '@/components/ui/Navbar';
import { Banner } from './home/Banner';
import { TopSellers } from './home/TopSellers';

export default function Home() {

    return (
        <>
             <Navbar />
             <Banner />
             <TopSellers />
        </>
    );
}
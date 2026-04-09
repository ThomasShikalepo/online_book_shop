import { Banner } from './home/Banner';
import Footer from './home/Footer';
import { Recommended } from './home/Recommended';
import { TopSellers } from './home/TopSellers';
import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';

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

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1.0], 
        }
    }
};

export default function Home({ books }: { books: Book[] }) {
    const { auth } = usePage().props as any;
    return (
        <div className="w-full space-y-16 pb-20">
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="bg-transparent"
            >
                <Banner isAuthenticated={!!auth?.user} />
            </motion.section>

            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="bg-transparent"
            >
                <TopSellers books={books} />
            </motion.section>

            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="bg-transparent"
            >
                <Recommended books={books}/>
            </motion.section>
            
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="bg-transparent"
            >
                <Footer />
            </motion.section>
        </div>
    );
}
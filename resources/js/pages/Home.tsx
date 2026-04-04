
import Navbar from '@/components/ui/Navbar';

export default function Home() {

    return (
        <>
             <Navbar />

            <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
                <h1>Welcome to the Online Book Shop</h1>
            </main>

            <footer>Footer</footer>
        </>
    );
}
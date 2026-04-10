import '@/../css/Home.css';
import bannerImg from "../../../assets/icons/banner.png";
import { motion } from 'framer-motion';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const Banner = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleExplore = () => {
        setIsLoading(true);
        
        setTimeout(() => {
            router.visit('/books' as any);
        }, 600);
    };
    return (
        <div className='px-6 md:px-12 py-10 md:py-20 max-w-screen-2xl mx-auto'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-16 md:gap-24'>
           
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                        duration: 1,
                        ease: "easeOut"
                    }}
                    className='md:w-1/2 w-full flex items-center md:justify-end relative'
                >
                    <motion.div
                        animate={{ 
                            y: [0, -20, 0],
                            rotate: [0, 2, 0]
                        }}
                        transition={{ 
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10"
                    >
                        <img 
                            src={bannerImg} 
                            alt="Featured Book" 
                            className="w-full max-w-[500px] drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                        />
                    </motion.div>
                    
                    {/* Decorative glow behind image */}
                    <div className="absolute inset-0 bg-blue-400/20 blur-[120px] rounded-full scale-75 -z-10" />
                </motion.div>
                
               
                <div className='md:w-1/2 w-full text-white'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-amber-400/10 text-amber-500 text-sm font-black tracking-widest uppercase mb-6 border border-amber-400/20">
                            New Releases
                        </span>
                        <h1 className='md:text-7xl text-4xl font-black mb-8 leading-[1.1] tracking-tight'>
                            Discover Your Next <br />
                            <span className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">Literary Adventure</span>
                        </h1>
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='mb-12 text-xl md:text-2xl leading-relaxed text-slate-300 font-medium'
                    >
                        It's time to update your reading list with the latest and greatest releases. 
                        From heart-pumping thrillers to captivating memoirs, explore stories that stay with you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {isAuthenticated ? (
                            <motion.button 
                                onClick={handleExplore}
                                disabled={isLoading}
                                whileHover={isLoading ? {} : { scale: 1.05, boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)" }}
                                whileTap={isLoading ? {} : { scale: 0.95 }}
                                className='bg-amber-400 hover:bg-amber-500 disabled:bg-amber-400/70 text-black px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-amber-400/20 transition-all duration-300 flex items-center gap-3 group'
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        Start Exploring
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            →
                                        </motion.span>
                                    </>
                                )}
                            </motion.button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <Link href="/login">
                                    <motion.button 
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className='bg-amber-400 hover:bg-amber-500 text-black px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-amber-400/20 transition-all duration-300'
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                                <Link href="/register">
                                    <motion.button 
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className='bg-transparent border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 px-10 py-5 rounded-2xl font-black text-lg transition-all duration-300'
                                    >
                                        Register
                                    </motion.button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

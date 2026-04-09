import { HiBars3BottomLeft } from "react-icons/hi2";
import { CgSearch } from "react-icons/cg";
import { HiOutlineUser, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import { Link, usePage, router } from "@inertiajs/react";
import avatarImg from "../../../assets/icons/avatar.png";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const navigation = [
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
];


const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { auth, cartCount, wishlistCount, filters } = usePage().props as any;
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    const currentUser = auth?.user;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/', { search: searchQuery }, { preserveState: true });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="w-full bg-[#020617]/40 backdrop-blur-2xl border-b border-white/5 shadow-2xl sticky top-0 z-50">
            <nav className="max-w-screen-2xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/">
                        <motion.div whileHover={{ rotate: -10, scale: 1.1 }}>
                            <HiBars3BottomLeft className="size-8 text-white transition-colors" />
                        </motion.div>
                    </Link>

                    <motion.div 
                        initial={false}
                        whileFocus={{ scale: 1.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="relative w-40 sm:w-64 md:w-80"
                    >
                        <form onSubmit={handleSearch}>
                            <CgSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search here..."
                                className="w-full rounded-2xl bg-white/5 border border-white/10 focus:border-amber-400 focus:bg-white/10 text-white py-3 pl-10 pr-3 focus:outline-none transition-all duration-300 shadow-inner placeholder:text-slate-500"
                            />
                        </form>
                    </motion.div>
                </div>

                <div className="hidden lg:flex items-center gap-1">
                    {currentUser?.user_type === 'Admin' && (
                        <Link
                            href="/admin"
                            className="px-4 py-2 text-sm font-black text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
                        >
                            Dashboard
                        </Link>
                    )}
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-4 py-2 text-sm font-black text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="relative flex items-center gap-3 md:gap-8">
                    <div className="relative" ref={dropdownRef}>
                        {currentUser ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="transition"
                                >
                                    <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-500 shadow-lg">
                                        <img
                                            src={avatarImg}
                                            alt="User avatar"
                                            className="size-10 rounded-full border-2 border-[#020617]"
                                        />
                                    </div>
                                </motion.button>

                                {isDropdownOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#0f172a]/90 backdrop-blur-2xl text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden border border-white/10 p-2"
                                    >
                                        <div className="px-4 py-3 text-sm font-black border-b border-white/5 opacity-70 uppercase tracking-wider">
                                            {currentUser?.name}
                                        </div>
                                        <button
                                            onClick={() => {
                                                router.post('/logout');
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 text-sm font-black text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            <Link href="/login">
                                <motion.div whileHover={{ scale: 1.2, color: '#fbbf24' }}>
                                    <HiOutlineUser className="size-8 text-slate-300 transition-colors" />
                                </motion.div>
                            </Link>
                        )}
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.2 }}
                        className="hidden sm:block relative"
                        onClick={() => router.visit('/wishlist')}
                    >
                        <HiOutlineHeart className="size-8 text-slate-300 transition-colors" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shadow-lg shadow-rose-500/40 border border-[#020617]">
                                {wishlistCount}
                            </span>
                        )}
                    </motion.button>

                    <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.visit('/cart')}
                        className="bg-amber-400 text-black px-4 sm:px-6 py-3 flex items-center rounded-2xl font-black shadow-[0_10px_20px_-10px_rgba(251,191,36,0.3)] transition-all duration-300"
                    >
                        <HiOutlineShoppingCart className="size-6" />
                        <span className="ml-2">{cartCount ?? 0}</span>
                    </motion.button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
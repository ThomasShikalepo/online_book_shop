import { HiBars3BottomLeft } from "react-icons/hi2";
import { CgSearch } from "react-icons/cg";
import { HiOutlineUser, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import { Link, usePage } from "@inertiajs/react";
import avatarImg from "../../../assets/icons/avatar.png";
import { useState, useRef, useEffect } from "react";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { auth, cartCount } = usePage().props as any;
    const currentUser = auth?.user;

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
        <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <nav className="max-w-screen-2xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/">
                        <HiBars3BottomLeft className="size-7 text-black" />
                    </Link>

                    <div className="relative w-40 sm:w-64 md:w-80">
                        <CgSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full rounded-md bg-[#EAEAEA] text-black py-2 pl-10 pr-3 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="relative flex items-center gap-3 md:gap-5">
                    <div className="relative" ref={dropdownRef}>
                        {currentUser ? (
                            <>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="cursor-pointer hover:scale-105 transition"
                                >
                                    <img
                                        src={avatarImg}
                                        alt="User avatar"
                                        className="size-9 rounded-full border-2 border-blue-500"
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 rounded-md bg-white text-black shadow-xl z-50 overflow-hidden">
                                        <div className="px-4 py-2 text-sm font-medium border-b">
                                            {currentUser?.name}
                                        </div>

                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link href="/login">
                                <HiOutlineUser className="size-7 text-black" />
                            </Link>
                        )}
                    </div>

                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-7 text-black" />
                    </button>

                    <Link
                        href="/cart"
                        className="bg-yellow-400 text-black px-3 sm:px-5 py-2 flex items-center rounded-md font-medium"
                    >
                        <HiOutlineShoppingCart className="size-6 text-black" />
                        <span className="ml-1">{cartCount ?? 0}</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
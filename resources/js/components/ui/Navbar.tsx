import { HiBars3BottomLeft } from "react-icons/hi2";
import { CgSearch } from "react-icons/cg";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "@inertiajs/react";

const Navbar = () => {

    const currentUser = true
    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
                
                {/* left side navigation */}
                <div className="flex items-center gap-4 md:gap-16">
                    
                    <Link href="/">
                        <HiBars3BottomLeft className="size-6" />
                    </Link>

                    {/* search input */}
                    <div className="relative sm:w-72 w-40">
                        <CgSearch className="absolute left-3 inset-y-2 text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search here..."
                            className="bg-[#EAEAEA] w-full py-1 pl-8 pr-2 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* right side navigation */}
                <div className="relative flex item-center md:space-x-3 space-x-2">

                    <div>
                        {
                            currentUser ? <>user</> :<HiOutlineUser className="size-6" />
                        }
                    </div>
                   
                   <button className="hidden sm:block">
                    <HiOutlineHeart className="size-6"  />
                   </button>

                   <Link href="/cart" className="bg-[#ffce0a] p-1 sm:px-6 px-2 flex items-center rounded-sm">
                   <HiOutlineShoppingCart className="size-6" />
                   <span className="text-sm font-semibold sm:ml-1">0</span>
                   </Link>
                </div>

            </nav>
        </header>
    );
};

export default Navbar;
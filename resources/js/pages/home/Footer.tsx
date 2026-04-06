import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import footerLogo from "../../../assets/icons/footer-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <img src={footerLogo} alt="Book Store Logo" className="w-36 mb-4" />
            <p className="text-gray-400 leading-7 text-sm">
              Discover your next favorite book. From timeless classics to new
              releases, we bring readers and stories together in one place.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black transition flex items-center justify-center"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black transition flex items-center justify-center"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black transition flex items-center justify-center"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#home" className="hover:text-yellow-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#books" className="hover:text-yellow-400 transition">
                  Books
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-yellow-400 transition">
                  Featured
                </a>
              </li>
              <li>
                <a href="#top-sellers" className="hover:text-yellow-400 transition">
                  Top Sellers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Customer Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#privacy" className="hover:text-yellow-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-yellow-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-yellow-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#wishlist" className="hover:text-yellow-400 transition">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#cart" className="hover:text-yellow-400 transition">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Stay Connected</h3>
            <p className="text-gray-400 text-sm leading-7 mb-4">
              Subscribe to get updates on new arrivals, featured books, and
              special offers.
            </p>

            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-l-md bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none"
              />
              <button className="bg-yellow-400 text-black px-5 py-3 rounded-r-md font-medium hover:bg-yellow-500 transition">
                Subscribe
              </button>
            </div>

            <div className="space-y-3 text-gray-400 text-sm">
              <p className="flex items-center gap-3">
                <FiMail className="text-yellow-400" />
                support@bookstore.com
              </p>
              <p className="flex items-center gap-3">
                <FiPhone className="text-yellow-400" />
                +264 81 249 0
              </p>
              <p className="flex items-center gap-3">
                <FiMapPin className="text-yellow-400" />
                Windhoek, Namibia
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© 2026 Book Store. All rights reserved.</p>
          <p>Built for readers, designed for discovery.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
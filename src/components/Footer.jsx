import { FaFacebook, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../assets/bklogoup.png";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Logo & About */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo} alt="BookCourier Logo" className="h-12 md:h-14 w-auto object-contain" />
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Book<span className="text-primary">Courier</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Bringing the library to your doorstep. Borrow, share, and read your favorite books with ease across Bangladesh.
            </p>
          </div>

         
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors font-medium">Home</Link></li>
              <li><Link to="/books" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors font-medium">Explore Books</Link></li>
              <li><Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors font-medium">Contact Us</Link></li>
              <li><Link to="/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors font-medium">Dashboard</Link></li>
            </ul>
          </div>

          {/* 3. Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                <FaMapMarkerAlt className="mt-1 text-red-600 shrink-0" />
                <span>Baraigram, Natore,<br />Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <FaPhoneAlt className="text-red-600 shrink-0" />
                <a href="tel:+8801784038430" className="hover:text-red-600 transition-colors">+8801784038430</a>
              </li>
              <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <FaEnvelope className="text-red-600 shrink-0" />
                <a href="mailto:support@bookcourier.com" className="hover:text-red-600 transition-colors">support@bookcourier.com</a>
              </li>
            </ul>
          </div>

          {/* 4. Social Links */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Follow Us</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">Stay connected for the latest updates and offers.</p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 hover:border-red-600 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
                <FaFacebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 hover:border-red-600 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
                <FaXTwitter size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 hover:border-red-600 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Notice */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            © {new Date().getFullYear()} BookCourier. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <Link to="/" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-red-600 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
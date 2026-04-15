import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-[#FFFDF7]/90 backdrop-blur-md border-b border-[#F5E6C8] z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-heading font-bold text-[#0F3D2E] tracking-wider relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F3D2E] to-[#C9A44C]">
                SHARVATEX
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C9A44C] transition-all group-hover:w-full"></span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-[#0F3D2E] hover:text-[#C9A44C] px-3 py-2 text-sm font-medium transition-colors">Home</Link>
            <Link to="/collections" className="text-[#0F3D2E] hover:text-[#C9A44C] px-3 py-2 text-sm font-medium transition-colors">Collections</Link>
            <a href="#about" className="text-[#0F3D2E] hover:text-[#C9A44C] px-3 py-2 text-sm font-medium transition-colors">About Us</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/admin" className="text-[#0F3D2E] hover:text-[#C9A44C] p-2 transition-colors">
              Admin
            </Link>
            <a href="https://wa.me/919994466665" target="_blank" rel="noopener noreferrer" className="bg-[#0F3D2E] text-[#FFFDF7] px-6 py-2 rounded-full font-medium hover:bg-[#C9A44C] transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
              <ShoppingBag size={18} />
              <span>Contact Us</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-[#0F3D2E] hover:text-[#C9A44C] transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFFDF7] border-b border-[#F5E6C8] shadow-lg absolute w-full left-0 top-20 animate-in slide-in-from-top-2">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#0F3D2E] hover:text-[#C9A44C] hover:bg-[#F5E6C8]/30 rounded-md transition-colors">Home</Link>
            <Link to="/collections" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#0F3D2E] hover:text-[#C9A44C] hover:bg-[#F5E6C8]/30 rounded-md transition-colors">Collections</Link>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#0F3D2E] hover:text-[#C9A44C] hover:bg-[#F5E6C8]/30 rounded-md transition-colors">Admin</Link>
            <a href="https://wa.me/919994466665" target="_blank" rel="noopener noreferrer" className="block mt-4 text-center bg-[#0F3D2E] text-[#FFFDF7] px-6 py-3 rounded-md font-medium hover:bg-[#C9A44C] transition-colors">
              Contact on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${query}`);
    }
  };

  return (
    <nav className="bg-slate-900 fixed w-full top-0 left-0 z-50 shadow-xl transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-white flex items-center group">
          <span className="text-amber-400 mr-1 italic">Go</span>Shop
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full ml-1 group-hover:animate-ping"></div>
        </Link>

        {/* Deliver to - Desktop Only */}
        <div className="hidden lg:flex flex-col text-xs text-slate-300 ml-4">
          <p>Deliver to</p>
          <div className="flex items-center text-white font-bold">
            <MapPin size={14} className="mr-0.5" /> Select Address
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-grow max-w-2xl flex items-center group relative">
          <input
            type="text"
            placeholder="Search premium products..."
            className="w-full bg-slate-800 border-none outline-none focus:ring-2 focus:ring-amber-400 rounded-l-lg px-5 py-2.5 text-white transition-all duration-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-amber-400 hover:bg-amber-500 rounded-r-lg px-6 py-2.5 transition-colors duration-200">
            <Search size={22} className="text-slate-900" />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-white">
          {/* User Sign In */}
          <div className="flex flex-col group relative cursor-pointer">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex flex-col text-xs">
                  <span className="text-slate-300">Hello, {user.name}</span>
                  <span className="font-bold flex items-center">
                    Account & Lists <User size={14} className="ml-1" />
                  </span>
                </div>
                {/* User Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white text-slate-900 rounded-lg shadow-2xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform origin-top-right">
                  {isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 hover:bg-slate-100 font-medium border-b">
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/my-orders" className="block px-4 py-2 hover:bg-slate-100">Your Orders</Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center text-red-600"
                  >
                    Sign Out <LogOut size={14} className="ml-2" />
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex flex-col text-xs">
                <span className="text-slate-300">Hello, sign in</span>
                <span className="font-bold">Account & Lists</span>
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="flex items-end relative group">
            <div className="relative">
              <ShoppingCart size={32} />
              <span className="absolute -top-1 -right-2 bg-amber-400 text-slate-900 text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            </div>
            <span className="ml-1 font-bold mb-0.5 hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

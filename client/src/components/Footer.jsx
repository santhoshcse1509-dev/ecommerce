import { Mail, ShieldCheck, Truck, RotateCcw, HelpCircle, Link as LucideLink } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      {/* Top Banner */}
      <div className="bg-slate-800 py-4 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm font-medium text-slate-200">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={18} className="text-amber-400" />
            <span>Secure Transactions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck size={18} className="text-amber-400" />
            <span>Free Shipping Over $99</span>
          </div>
          <div className="flex items-center space-x-2">
            <RotateCcw size={18} className="text-amber-400" />
            <span>30-Day Easy Returns</span>
          </div>
          <div className="flex items-center space-x-2">
            <HelpCircle size={18} className="text-amber-400" />
            <span>24/7 Premium Support</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center">
            Go<span className="text-amber-400">Shop</span>
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Your premium destination for high-quality products and an exceptional shopping experience. 
            Join millions of customers trust GoShop for quality and speed.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition-all rounded-full"><LucideLink size={18} /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition-all rounded-full"><LucideLink size={18} /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition-all rounded-full"><LucideLink size={18} /></a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-white font-bold mb-6">Customer Service</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><RouterLink to="/my-orders" className="hover:text-amber-400 transition-colors">Track Your Order</RouterLink></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Help Center</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><RouterLink to="/?category=Electronics" className="hover:text-amber-400 transition-colors">Electronics</RouterLink></li>
            <li><RouterLink to="/?category=Home" className="hover:text-amber-400 transition-colors">Home & Decor</RouterLink></li>
            <li><RouterLink to="/?category=Fashion" className="hover:text-amber-400 transition-colors">Fashion</RouterLink></li>
            <li><RouterLink to="/?category=Health" className="hover:text-amber-400 transition-colors">Health & Beauty</RouterLink></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6">Stay Updated</h4>
          <p className="text-sm mb-6 leading-relaxed">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2.5 bg-slate-800 border-none outline-none focus:ring-1 focus:ring-amber-400 rounded-l-lg w-full text-white text-sm"
            />
            <button className="bg-amber-400 px-4 py-2.5 rounded-r-lg hover:bg-amber-500 transition-colors">
              <Mail size={18} className="text-slate-900" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
        © {new Date().getFullYear()} GoShop. All Rights Reserved. Engineered with ❤️ by Antigravity.
      </div>
    </footer>
  );
};

export default Footer;

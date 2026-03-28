import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-fade-in">
        <div className="relative">
           <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
           <ShoppingBag size={120} className="text-slate-200 relative" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Your cart is empty</h2>
        <p className="text-slate-400 font-bold max-w-sm text-center leading-relaxed">
          Looks like you haven't added anything to your cart yet. Go ahead and explore our premium collection.
        </p>
        <Link to="/" className="amazon-btn text-lg px-10 py-4 font-black transform active:scale-95 transition-transform">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-12">
         <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
            Shopping Cart <span className="ml-4 text-sm bg-slate-900 text-white px-3 py-1 rounded-full">{cartCount} items</span>
         </h1>
         <Link to="/" className="text-indigo-600 font-bold hover:underline hidden sm:block">Back to Shopping</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 hover:shadow-xl transition-all duration-300">
              <div className="w-40 h-40 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 p-4">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-grow space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm font-bold">{item.category}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-1 text-amber-500 mb-4">
                   {[...Array(5)].map((_, i) => <Plus key={i} size={12} fill="currentColor" className="opacity-20" />)}
                </div>
                
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                   <div className="flex items-center bg-slate-100 rounded-xl px-2 py-1 border border-slate-200">
                      <button 
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        className="p-2 hover:text-indigo-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-black text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-2 hover:text-indigo-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                   </div>
                   <button 
                    onClick={() => removeFromCart(item._id)}
                    className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-xl"
                   >
                     <Trash2 size={20} />
                   </button>
                </div>
              </div>

              <div className="text-center sm:text-right min-w-[120px]">
                <p className="text-2xl font-black text-slate-900 tracking-tighter">${(item.price * item.quantity).toLocaleString()}</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">${item.price.toLocaleString()} / unit</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Container */}
        <div className="space-y-6 sticky top-28">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            {/* Decal */}
            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
               <ShoppingBag size={150} />
            </div>

            <h2 className="text-2xl font-black mb-10 tracking-tight flex items-center justify-between">
               Order Summary
               <div className="w-10 h-1 bg-amber-400 rounded-full"></div>
            </h2>

            <div className="space-y-5 mb-10">
               <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">${cartTotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-400">FREE</span>
               </div>
               <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest border-b border-slate-800 pb-5">
                  <span>Tax (Estimated)</span>
                  <span className="text-white">$0.00</span>
               </div>
               <div className="flex justify-between items-baseline pt-2">
                  <span className="text-lg font-black text-slate-200">Total</span>
                  <span className="text-4xl font-black text-amber-400 tracking-tighter">${cartTotal.toLocaleString()}</span>
               </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 py-5 rounded-2xl font-black text-xl flex items-center justify-center space-x-3 shadow-xl hover:shadow-amber-400/20 active:scale-95 transition-all"
            >
              <span>Secure Checkout</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
             <div className="flex items-center space-x-3 text-sm font-bold text-slate-500">
                <ShieldCheck size={18} className="text-indigo-600" />
                <span>Encrypted Transactions</span>
             </div>
             <div className="flex items-center space-x-3 text-sm font-bold text-slate-500">
                <Truck size={18} className="text-indigo-600" />
                <span>Fast & Secure Delivery</span>
             </div>
             <div className="flex items-center space-x-3 text-sm font-bold text-slate-500">
                <RotateCcw size={18} className="text-indigo-600" />
                <span>Easy 30-Day Returns</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import { Link } from 'react-router-dom';
import { Package, CheckCircle, ArrowRight, Home } from 'lucide-react';

const OrderSuccessPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-xl w-full text-center space-y-8 bg-white p-16 rounded-[4rem] shadow-2xl border border-slate-100 flex flex-col items-center relative overflow-hidden group">
        {/* Animated Background Icons */}
        <div className="absolute top-10 left-10 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity -rotate-12 duration-700 pointer-events-none"><Package size={120} /></div>
        <div className="absolute bottom-10 right-10 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12 duration-700 pointer-events-none"><CheckCircle size={120} /></div>

        <div className="relative">
          <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 shadow-inner group-hover:scale-110 transition-transform duration-500">
             <CheckCircle size={64} strokeWidth={3} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full animate-ping opacity-20"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full animate-bounce opacity-40"></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Order Confirmed!</h1>
          <p className="text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">
            Thank you for shopping with <span className="text-indigo-600">GoShop Premium</span>. Your items are being prepared for dispatch right now. 🎁
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link 
            to="/my-orders" 
            className="flex-grow bg-slate-900 hover:bg-slate-800 text-white font-black py-5 px-8 rounded-2xl flex items-center justify-center space-x-3 shadow-xl transform active:scale-95 transition-all group"
          >
            <span>Track Order</span>
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/" 
            className="flex-grow bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-5 px-8 rounded-2xl flex items-center justify-center space-x-3 transition-colors active:scale-95"
          >
            <Home size={22} />
            <span>Go Home</span>
          </Link>
        </div>

        <div className="pt-8 border-t border-slate-50 w-full opacity-50 flex items-center justify-center space-x-3 text-xs font-black uppercase tracking-widest text-slate-400">
           <span>Order ID: #GS-{Math.floor(Math.random() * 999999).toString().padStart(6, '0')}</span>
           <span className="dot">•</span>
           <span>Estimated {new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

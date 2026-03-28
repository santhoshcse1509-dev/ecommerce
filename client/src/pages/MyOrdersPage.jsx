import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Package, Truck, CheckCircle, Clock, ShoppingBag, ArrowRight, Loader2, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'Shipped': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Processing': return 'bg-amber-100 text-amber-600 border-amber-200';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Processing': return <Clock size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 size={48} className="animate-spin text-indigo-600" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Retrieving your treasures...</p>
    </div>
  );

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-fade-in text-center px-4">
        <div className="relative">
           <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full"></div>
           <Package size={140} className="text-slate-100 relative" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">No orders yet</h2>
        <p className="text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">
           Your shopping bags are waiting to be filled with the best of technology and design.
        </p>
        <Link to="/" className="amazon-btn inline-block text-lg px-12 py-4 font-black transform active:scale-95 transition-all shadow-xl shadow-amber-400/20">
          Start Your First Order
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20 max-w-5xl mx-auto px-4">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Your History</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 ml-1">Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-indigo-600 font-black text-lg bg-indigo-50 px-4 py-2 rounded-2xl">
          <ShoppingBag size={22} className="text-indigo-400" />
          <span>{orders.length} Success Orders</span>
        </div>
      </div>

      <div className="space-y-10">
        {orders.map((order) => (
          <div key={order._id} className="group bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 relative">
            {/* Header / Info Row */}
            <div className="bg-slate-50 border-b border-slate-100 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Placed</p>
                  <p className="font-bold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                  <p className="font-black text-slate-900 text-lg tracking-tighter">${order.totalAmount.toLocaleString()}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ship To</p>
                  <p className="font-bold text-slate-900 line-clamp-1">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
               </div>
               <div className="lg:text-right flex items-center justify-start lg:justify-end">
                  <span className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${getStatusStyle(order.status)} group-hover:shadow-lg transition-all`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </span>
               </div>
            </div>

            {/* Content Row */}
            <div className="p-8 space-y-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-900 flex items-center tracking-tight">
                       Items in this package <div className="ml-3 h-0.5 w-8 bg-indigo-400 rounded-full"></div>
                    </h3>
                    <div className="space-y-5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-5 group/item">
                          <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 flex items-center justify-center border border-slate-100 group-hover/item:border-indigo-200 transition-colors bg-white">
                             {/* Note: product details might be populated or only ID if API wasn't deep populating - 
                                 assuming controller returns populated product or we only have what we saved in the array */}
                             <img 
                              src={item.product?.images?.[0] || 'https://via.placeholder.com/80'} 
                              alt="product" 
                              className="max-h-full object-contain mix-blend-multiply transition-transform group-hover/item:scale-110" 
                            />
                          </div>
                          <div className="flex-grow space-y-1">
                             <p className="font-bold text-slate-900 text-sm line-clamp-1 group-hover/item:text-indigo-600 transition-colors">{item.product?.title || 'Premium Gadget'}</p>
                             <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{item.quantity} x ${item.priceAtOrder.toLocaleString()}</p>
                             <Link to={item.product?._id ? `/product/${item.product._id}` : '#'} className="inline-block text-xs font-black text-indigo-400 hover:text-indigo-600 uppercase tracking-widest hover:underline pt-1">
                                Buy again <ArrowRight size={10} className="inline ml-1" />
                             </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Extras */}
                  <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
                     <div className="flex items-start space-x-4">
                        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-400"><MapPin size={18} /></div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-xs">Shipping Address</p>
                          <p className="text-slate-900 font-bold text-sm leading-snug">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        </div>
                     </div>
                     <div className="flex items-start space-x-4">
                        <div className="p-2 bg-emerald-50 rounded-xl text-emerald-400"><CreditCard size={18} /></div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-xs">Payment Method</p>
                          <p className="text-slate-900 font-bold text-sm uppercase">Razorpay (Order ID: {order.paymentInfo?.razorpayOrderId?.slice(-8) || 'N/A'})</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Row */}
            <div className="border-t border-slate-100 p-8 pt-0 flex flex-wrap gap-4 justify-end">
               <button className="flex-grow sm:flex-grow-0 amazon-btn-outline font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-slate-50 hover:shadow-lg active:scale-95 transition-all">
                  Request Invoice
               </button>
               <button className="flex-grow sm:flex-grow-0 amazon-btn font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-amber-400/10 active:scale-95 transition-all">
                  Leave a Review
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { MapPin, Truck, ShieldCheck, CreditCard, ChevronLeft, Loader2, ArrowRight } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
  }, [cartItems, user, navigate]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/orders', {
        items: cartItems.map(item => ({
             product: item._id,
             quantity: item.quantity,
             priceAtOrder: item.price
        })),
        shippingAddress: address,
        totalAmount: cartTotal,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key',
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: 'GoShop Premium',
        description: 'Order Payment',
        order_id: data.razorpayOrder.id,
        handler: async (response) => {
          try {
            const verifyRes = await api.post('/orders/verify', {
              ...response,
              items: data.items,
              shippingAddress: data.shippingAddress,
              totalAmount: data.totalAmount,
            });
            if (verifyRes.status === 201) {
              clearCart();
              toast.success('Payment successful!', {
                 style: { background: '#334155', color: '#fff', borderRadius: '15px' }
              });
              navigate('/order-success');
            }
          } catch (error) {
            toast.error('Verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: '#0f172a' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      toast.error('Order initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-12">
         <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
            Checkout <span className="ml-4 text-sm bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-widest font-bold">Secure Zone</span>
         </h1>
         <button onClick={() => navigate('/cart')} className="text-indigo-600 font-bold hover:underline flex items-center">
            <ChevronLeft size={18} className="mr-1" /> Back to Cart
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Shipping Form */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col space-y-10 order-2 lg:order-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><MapPin size={80} className="text-indigo-600" /></div>
          
          <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Truck size={24} /></div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Delivery Information</h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Where should we send your items?</p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-black text-slate-900 ml-1">Street Address</label>
              <input
                type="text"
                placeholder="123 Luxury Lane"
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all"
                value={address.address}
                onChange={(e) => setAddress({...address, address: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-900 ml-1">City</label>
              <input
                type="text"
                placeholder="Metropolis"
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all"
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-900 ml-1">Postal Code</label>
              <input
                type="text"
                placeholder="110001"
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all"
                value={address.postalCode}
                onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-black text-slate-900 ml-1">Country</label>
              <select
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all"
                value={address.country}
                onChange={(e) => setAddress({...address, country: e.target.value})}
              >
                 <option value="India">India</option>
                 <option value="USA">USA</option>
                 <option value="UK">UK</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-slate-900/40 transition-all flex items-center justify-center space-x-4 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? <Loader2 size={32} className="animate-spin text-amber-400" /> : (
                <>
                  <CreditCard size={28} className="text-amber-400" />
                  <span>Pay Now (${cartTotal.toLocaleString()})</span>
                  <ArrowRight size={22} className="text-white ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center space-x-8 pt-8 border-t border-slate-50 opacity-50 grayscale hover:grayscale-0 transition-all">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
          </div>
        </div>

        {/* Totals / Summary */}
        <div className="space-y-10 order-1 lg:order-2">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-200 pb-4">In Your Bag</h3>
                <div className="max-h-[300px] overflow-y-auto pr-4 mb-8 space-y-6">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 flex-shrink-0 flex items-center justify-center p-2">
                           <img src={item.images[0]} alt={item.title} className="max-h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</p>
                          <p className="text-slate-400 text-xs font-bold uppercase">{item.quantity} x ${item.price.toLocaleString()}</p>
                        </div>
                        <p className="font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-200">
                    <div className="flex justify-between font-bold text-slate-500">
                        <span>Total Items</span>
                        <span>{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between font-black text-slate-900 text-2xl pt-2">
                        <span>Grande Total</span>
                        <span className="text-indigo-600 tracking-tighter">${cartTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-indigo-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-indigo-600 transition-all group-hover:w-4 duration-500"></div>
                <div className="flex items-start space-x-5">
                    <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 shadow-inner"><ShieldCheck size={32} /></div>
                    <div className="space-y-2">
                        <h4 className="font-black text-lg text-slate-900 leading-none">Safe & Secure</h4>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                            Your payment is 100% secure with enterprise-grade encryption. We never store your card details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

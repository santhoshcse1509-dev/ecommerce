import { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  ShoppingBag, Truck, Package, CheckCircle, 
  MapPin, User, Clock, Loader2, ArrowRight, TrendingUp 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (err) { toast.error('Failed to synchronize orders'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      toast.success(`Logistics status: ${status}`);
      fetchOrders();
    } catch (err) { toast.error('Update operation failed'); }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'Shipped': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Processing': return 'bg-amber-100 text-amber-600 border-amber-200';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;

  return (
    <div className="pb-20 animate-fade-in px-4 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4">
           <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100">
              <TrendingUp size={14} />
              <span>Logistics Intelligence</span>
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Supply Chain Matrix</h1>
        </div>
        <div className="flex items-center space-x-4 bg-white p-4 rounded-[2rem] shadow-xl border border-slate-50 border-b-4 border-b-amber-400">
           <div className="p-3 bg-amber-50 rounded-2xl text-amber-600"><ShoppingBag size={24} /></div>
           <div className="pr-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Queue</p>
              <p className="font-black text-slate-900 text-2xl tracking-tighter">{orders.length} ACTIVE</p>
           </div>
        </div>
      </div>

      <div className="space-y-10">
        {orders.map((order) => (
          <div key={order._id} className="group bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            {/* Header Row */}
            <div className="bg-slate-50/50 p-8 border-b border-slate-100 flex flex-wrap gap-8 items-center justify-between">
               <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 group-hover:rotate-6 transition-transform">
                     <Package size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Order Identifier</p>
                    <p className="font-black text-slate-900 tracking-tight text-lg">#GS-{order._id.slice(-8).toUpperCase()}</p>
                  </div>
               </div>
               
               <div className="flex flex-wrap gap-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Entity</p>
                    <div className="flex items-center space-x-2 font-bold text-slate-900">
                      <User size={14} className="text-indigo-400" />
                      <span>{order.user?.name || 'Unknown Client'}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Stamp</p>
                    <div className="flex items-center space-x-2 font-bold text-slate-900">
                      <Clock size={14} className="text-amber-400" />
                      <span>{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capital Inbound</p>
                    <p className="font-black text-indigo-600 text-xl tracking-tighter">${order.totalAmount.toLocaleString()}</p>
                  </div>
               </div>

               <div className="flex items-center space-x-4">
                  <span className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest border ${getStatusStyle(order.status)} group-hover:shadow-xl transition-all`}>
                    {order.status}
                  </span>
               </div>
            </div>

            {/* Grid Row */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Left: Product Recap */}
               <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-sm font-black text-slate-900 flex items-center uppercase tracking-widest">
                    Package Components <div className="ml-3 h-0.5 w-10 bg-indigo-600 rounded-full"></div>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {order.items.map((item, i) => (
                       <div key={i} className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors duration-500">
                          <img 
                            src={item.product?.images?.[0] || 'https://via.placeholder.com/64'} 
                            className="w-14 h-14 rounded-xl object-cover bg-white p-1 border border-slate-100" 
                          />
                          <div>
                            <p className="font-bold text-slate-900 text-sm line-clamp-1">{item.product?.title || 'Nexus Item'}</p>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Qty: {item.quantity} • ${item.priceAtOrder.toLocaleString()}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Right: Logistics & Actions */}
               <div className="space-y-8 bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                  <div className="space-y-4">
                     <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                       <MapPin size={14} className="mr-2" /> Destination Node
                     </h4>
                     <p className="font-bold text-slate-900 text-sm leading-relaxed">
                        {order.shippingAddress.address}, {order.shippingAddress.city}, <br />
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                     </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Operational Override</h4>
                    <select 
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      value={order.status}
                      className="w-full bg-white border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-black text-slate-900 shadow-sm transition-all"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                     <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl"><CheckCircle size={14} /></div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Verified • GS-Secure</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;

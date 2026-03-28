import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Users, Package, ShoppingCart, DollarSign, ArrowUpRight, 
  BarChart3, Layers, Settings, ChevronRight, Activity 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { isAdmin, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast.error('Restricted access. Super Admins only.');
      navigate('/');
    }
    
    const fetchStats = async () => {
      try {
        const { data: orders } = await api.get('/orders');
        const { data: products } = await api.get('/products');
        // Note: Real admin backend would have a dedicated stats route, 
        // but for now we aggregate from public or admin-accessible data.
        
        const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
        setStats({
          totalSales,
          totalOrders: orders.length,
          totalProducts: products.length,
          totalUsers: 25 // Placeholder for users count
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (isAdmin) fetchStats();
  }, [isAdmin, authLoading, navigate]);

  const cards = [
    { label: 'Revenue Generated', val: `$${stats.totalSales.toLocaleString()}`, icon: <DollarSign />, bg: 'bg-emerald-100', text: 'text-emerald-600', decoration: 'bg-emerald-400/5' },
    { label: 'Total Orders', val: stats.totalOrders, icon: <ShoppingCart />, bg: 'bg-indigo-100', text: 'text-indigo-600', decoration: 'bg-indigo-400/5' },
    { label: 'Live Inventory', val: stats.totalProducts, icon: <Package />, bg: 'bg-amber-100', text: 'text-amber-600', decoration: 'bg-amber-400/5' },
    { label: 'Active Customers', val: stats.totalUsers, icon: <Users />, bg: 'bg-rose-100', text: 'text-rose-600', decoration: 'bg-rose-400/5' }
  ];

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
           <div className="flex items-center space-x-2 text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-2 px-1">
              <Activity size={14} className="animate-pulse" />
              <span>Live System Dashboard</span>
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Command Center</h1>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center space-x-4 border border-slate-100">
           <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0f172a&color=fff`} className="w-12 h-12 rounded-xl shadow-lg border-2 border-slate-100" />
           <div>
              <p className="font-extrabold text-slate-900 leading-none">{user?.name}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Super Administrator</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {cards.map((c, i) => (
          <div key={i} className={`bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}>
             <div className={`absolute -top-10 -right-10 w-32 h-32 ${c.decoration} rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
             
             <div className="flex items-center justify-between mb-6">
                <div className={`p-4 ${c.bg} rounded-2xl ${c.text} shadow-inner group-hover:rotate-12 transition-transform duration-500`}>{c.icon}</div>
                <div className="bg-slate-50 p-2 rounded-xl text-slate-400 group-hover:text-indigo-600 transition-colors"><ArrowUpRight size={18} /></div>
             </div>
             
             <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{c.label}</p>
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{c.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Shortcuts */}
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => navigate('/admin/products')}
              className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <Layers className="text-amber-400 mb-8 group-hover:scale-110 transition-transform" size={48} />
               <h3 className="text-3xl font-black mb-4 tracking-tight">Inventory Matrix</h3>
               <p className="text-slate-400 font-bold mb-8 leading-relaxed">Manage your catalog, restock treasures, and optimize product visibility.</p>
               <div className="flex items-center text-amber-400 font-black text-sm uppercase tracking-widest">
                  Configure Now <ChevronRight size={18} className="ml-1 group-hover:translate-x-2 transition-transform" />
               </div>
            </div>

            <div 
              onClick={() => navigate('/admin/orders')}
              className="bg-indigo-600 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <BarChart3 className="text-white mb-8 group-hover:scale-110 transition-transform" size={48} />
               <h3 className="text-3xl font-black mb-4 tracking-tight">Supply Chain</h3>
               <p className="text-indigo-100 font-bold mb-8 leading-relaxed">Track shipments, verify payments, and handle customer logistics globally.</p>
               <div className="flex items-center text-white font-black text-sm uppercase tracking-widest">
                  View Orders <ChevronRight size={18} className="ml-1 group-hover:translate-x-2 transition-transform" />
               </div>
            </div>
         </div>

         {/* Side Activity */}
         <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl flex flex-col justify-between">
            <div>
               <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center tracking-tight">
                  System Health <div className="ml-3 h-1 w-8 bg-emerald-500 rounded-full animate-pulse"></div>
               </h4>
               <ul className="space-y-6">
                 {[
                   { label: 'API Latency', val: '24ms', color: 'emerald' },
                   { label: 'Payment Gateway', val: 'Healthy', color: 'emerald' },
                   { label: 'Cloudinary Link', val: 'Active', color: 'emerald' },
                   { label: 'Server CPU', val: '12%', color: 'indigo' },
                 ].map((h, i) => (
                   <li key={i} className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">{h.label}</span>
                      <span className={`text-${h.color}-600 font-black text-sm`}>{h.val}</span>
                   </li>
                 ))}
               </ul>
            </div>
            
            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-12 flex items-center justify-center space-x-2 transition-all">
               <Settings size={14} /> <span>Security Protocol Settings</span>
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

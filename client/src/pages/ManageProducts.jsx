import { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  Package, Plus, Edit2, Trash2, X, Upload, 
  Search, SlidersHorizontal, Loader2, ArrowRight, ChevronDown 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '', price: 0, description: '', category: 'Electronics', stock: 0, images: ['']
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) { toast.error('Failed to fetch catalog'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await api.put(`/products/${currentProduct._id}`, formData);
        toast.success('Product Updated Successfully');
      } else {
        await api.post('/products', formData);
        toast.success('New Product Created');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) { 
      toast.error(err.response?.data?.message || 'Server rejected the product data'); 
      console.error(err.response?.data);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Delete this item permanently?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Removed from Inventory');
        fetchProducts();
      } catch (err) { toast.error('Action failed'); }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({ ...product });
    } else {
      setCurrentProduct(null);
      setFormData({ title: '', price: 0, description: '', category: 'Electronics', stock: 0, images: ['https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=2670'] });
    }
    setShowModal(true);
  };

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;

  return (
    <div className="pb-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
             Inventory Matrix 
             <span className="ml-3 text-sm bg-slate-900 text-white px-3 py-1 rounded-full">{products.length} Units</span>
           </h1>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Global Catalog & Stock Logistics</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center space-x-3 shadow-xl hover:shadow-indigo-600/20 active:scale-95 transition-all w-full md:w-auto"
        >
          <Plus size={22} className="text-amber-400" />
          <span>Ingest New Item</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-6">Product Insight</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Capital</th>
                <th className="px-8 py-6">Stock Level</th>
                <th className="px-8 py-6 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-8 py-6 flex items-center space-x-4">
                    <img src={p.images[0]} className="w-14 h-14 rounded-xl object-cover border border-slate-100 bg-white p-1 shadow-sm group-hover:scale-110 transition-transform" />
                    <span className="font-extrabold text-slate-900 text-sm">{p.title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{p.category}</span>
                  </td>
                  <td className="px-8 py-6 font-black text-slate-900">${p.price.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${p.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                      <span className="font-bold text-slate-600 text-sm">{p.stock} units</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-3">
                      <button onClick={() => openModal(p)} className="p-3 bg-white shadow-sm rounded-xl text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all"><Edit2 size={16} /></button>
                      <button onClick={() => deleteProduct(p._id)} className="p-3 bg-white shadow-sm rounded-xl text-slate-400 hover:text-rose-600 hover:shadow-md transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl relative border border-white/20">
            <div className="sticky top-0 right-0 z-10 flex justify-end p-6 pointer-events-none">
               <button type="button" onClick={() => setShowModal(false)} className="pointer-events-auto p-3 bg-slate-100/80 backdrop-blur-sm rounded-full hover:bg-slate-200 text-slate-500 transition-colors shadow-sm"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 pt-4">
              <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">{currentProduct ? 'Optimize Item' : 'New Intake'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Title</label>
                  <input required className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Market Price ($)</label>
                  <input required type="number" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Real-time Stock</label>
                   <input required type="number" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                   <select className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                     <option value="Electronics">Electronics</option>
                     <option value="Fashion">Fashion</option>
                     <option value="Home">Home</option>
                     <option value="Health">Health</option>
                   </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Description</label>
                   <textarea rows="3" required className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all" placeholder="Enter product details..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image Asset Link</label>
                   <input required className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 outline-none rounded-2xl px-6 py-4 font-bold text-slate-900 transition-all" value={formData.images[0]} onChange={e => setFormData({...formData, images: [e.target.value]})} />
                </div>
              </div>

              <div className="flex gap-4">
                 <button type="button" onClick={() => setShowModal(false)} className="flex-grow bg-slate-100 hover:bg-slate-200 text-slate-900 py-5 rounded-2xl font-black transition-all">Abort Action</button>
                 <button type="submit" className="flex-[2] bg-indigo-600 hover:bg-slate-900 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-600/20 active:scale-95 transition-all uppercase tracking-widest">Execute Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

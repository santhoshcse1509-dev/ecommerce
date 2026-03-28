import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Loader2, ArrowRight, Star, Truck, ShieldCheck, Headphones, Search } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products');
        let filtered = data;
        if (search) {
          filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
        }
        if (category) {
          filtered = filtered.filter(p => p.category === category);
        }
        setProducts(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 size={48} className="animate-spin text-indigo-600" />
      <p className="text-slate-400 font-medium animate-pulse">Curating products for you...</p>
    </div>
  );

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      {!search && !category && (
        <section className="relative h-[65vh] rounded-3xl overflow-hidden group">
          {/* Main Background with Parallax effect */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center transition-transform duration-[5s] group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-20 max-w-4xl text-white">
            <div className="mb-6 flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 w-fit">
              <span className="text-amber-400 font-black animate-pulse uppercase tracking-wider text-xs">New Summer Collection</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[1.05] tracking-tight">
              Premium Tech & <br /> Lifestyle <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Curated.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-medium">
              Experience the evolution of online shopping. Hand-picked products, lightning-fast delivery, and premium support.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-8 py-4 rounded-xl font-black text-lg shadow-2xl hover:shadow-amber-400/20 transition-all flex items-center group">
                Shop the Collection <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-black text-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="container mx-auto px-4">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center">
              Explore <span className="text-indigo-600 mx-2">Categories</span> 
            </h2>
            <div className="h-0.5 flex-grow mx-8 bg-slate-100 rounded-full max-w-[200px]"></div>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {['Electronics', 'Fashion', 'Home', 'Health'].map((cat) => (
              <div 
                key={cat} 
                onClick={() => window.location.href = `/?category=${cat}`}
                className="group cursor-pointer relative h-48 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                  <div className="absolute inset-0 bg-slate-100 group-hover:bg-indigo-600 transition-colors duration-500 flex flex-col items-center justify-center space-y-3">
                    <span className="text-xl font-black text-slate-900 group-hover:text-white transition-colors">{cat}</span>
                    <button className="p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-110 transition-all duration-500 shadow-xl">
                      <ArrowRight size={20} className="text-indigo-600" />
                    </button>
                  </div>
              </div>
            ))}
         </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {search ? `Search results for "${search}"` : category ? `${category} Collection` : 'Featured Products'}
          </h2>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold hover:underline cursor-pointer group">
            <span>View All</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-100 shadow-xl">
             <div className="mb-4 flex justify-center"><Search size={48} className="text-slate-200" /></div>
             <p className="text-slate-400 font-black text-xl mb-4">No products matching your search.</p>
             <button onClick={() => window.location.href = '/'} className="amazon-btn inline-block">Reset search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Trust Badges Section */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-50 flex items-start space-x-5 hover:shadow-xl transition-shadow border-b-4 border-b-amber-400">
             <div className="p-4 bg-amber-50 rounded-2xl text-amber-600"><Truck size={32} /></div>
             <div>
               <h4 className="font-black text-lg text-slate-900 mb-1 leading-none">Fast Delivery</h4>
               <p className="text-slate-400 text-sm font-medium">Free reliable shipping for all luxury orders above $150.</p>
             </div>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-50 flex items-start space-x-5 hover:shadow-xl transition-shadow border-b-4 border-b-indigo-400">
             <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600"><ShieldCheck size={32} /></div>
             <div>
               <h4 className="font-black text-lg text-slate-900 mb-1 leading-none">Secure Payment</h4>
               <p className="text-slate-400 text-sm font-medium">100% secure payment systems with global protection.</p>
             </div>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-50 flex items-start space-x-5 hover:shadow-xl transition-shadow border-b-4 border-b-emerald-400">
             <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600"><Headphones size={32} /></div>
             <div>
               <h4 className="font-black text-lg text-slate-900 mb-1 leading-none">Expert Support</h4>
               <p className="text-slate-400 text-sm font-medium">Dedicated support team available 24/7 for you.</p>
             </div>
           </div>
      </section>
    </div>
  );
};

export default HomePage;

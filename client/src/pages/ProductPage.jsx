import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { Loader2, ShoppingCart, Star, ChevronRight, Truck, ShieldCheck, ArrowLeft, Heart, Share2 } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!', {
       icon: '🛒',
       style: { borderRadius: '12px', background: '#334155', color: '#fff', fontHeight: 'bold' }
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 size={48} className="animate-spin text-indigo-600" />
    </div>
  );

  if (!product) return (
    <div className="text-center py-20 bg-white rounded-3xl shadow-xl mt-10 border border-slate-100 mx-4">
      <h2 className="text-3xl font-black text-slate-900 mb-4">Product Not Found</h2>
      <Link to="/" className="text-indigo-600 font-bold hover:underline flex items-center justify-center">
        <ArrowLeft size={18} className="mr-2" /> Back to shopping
      </Link>
    </div>
  );

  return (
    <div className="pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm font-medium text-slate-400 mb-8 overflow-x-auto whitespace-nowrap hidden sm:flex">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/?category=${product.category}`} className="hover:text-indigo-600 transition-colors">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 font-bold truncate">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl">
            <img 
              src={product.images[selectedImage] || 'https://via.placeholder.com/600'} 
              alt={product.title} 
              className="w-full h-full object-contain aspect-square mix-blend-multiply p-8 transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Interactions */}
            <div className="absolute top-6 right-6 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <button className="p-3 bg-white shadow-xl rounded-full text-slate-900 hover:text-rose-500 transition-colors"><Heart size={20} /></button>
                <button className="p-3 bg-white shadow-xl rounded-full text-slate-900 hover:text-indigo-600 transition-colors"><Share2 size={20} /></button>
            </div>
          </div>
          
          <div className="flex space-x-4 px-2 overflow-x-auto pb-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-2xl border-4 transition-all duration-200 overflow-hidden bg-white ${selectedImage === idx ? 'border-amber-400 shadow-xl scale-105' : 'border-transparent hover:border-slate-200'}`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover mix-blend-multiply p-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col space-y-8 animate-fade-in">
          <div>
            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full mb-4">
               Official {product.category} Brand
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight">{product.title}</h1>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.ratings) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-slate-900 font-bold ml-1 text-lg">{product.ratings}</span>
              </div>
              <span className="text-slate-400 font-bold">•</span>
              <span className="text-slate-400 font-bold hover:underline cursor-pointer">{product.numReviews} Reviews</span>
            </div>
          </div>

          <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><ShoppingCart size={80} className="text-slate-900" /></div>
            <div className="flex items-baseline space-x-3 mb-6">
               <span className="text-5xl font-black text-slate-900 tracking-tighter">${product.price.toLocaleString()}</span>
               <span className="text-slate-400 text-lg line-through font-bold">${(product.price * 1.2).toFixed(0)}</span>
               <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-xs font-black ml-2 uppercase">20% OFF</span>
            </div>

            <div className="space-y-4 mb-8">
               <div className="flex items-center space-x-3 text-emerald-600 font-bold text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span>In Stock - Ready to dispatch from nearest hub</span>
               </div>
               <div className="h-px bg-slate-100"></div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-slate-900/40 transition-all flex items-center justify-center space-x-4 active:scale-[0.98]"
            >
              <ShoppingCart size={28} className="text-amber-400" />
              <span>Add to Super Cart</span>
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center">
              Product Stories <div className="ml-3 h-0.5 w-12 bg-indigo-600 rounded-full"></div>
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
             <div className="p-4 bg-slate-50 rounded-2xl flex items-center space-x-4 border border-slate-100">
                <Truck className="text-indigo-600" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Express Shipping</p>
                  <p className="text-slate-400 font-medium whitespace-nowrap">Deliver in 2-3 Days</p>
                </div>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl flex items-center space-x-4 border border-slate-100">
                <ShieldCheck className="text-emerald-600" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">1 Year Warranty</p>
                  <p className="text-slate-400 font-medium whitespace-nowrap">Genuine Guarantee</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

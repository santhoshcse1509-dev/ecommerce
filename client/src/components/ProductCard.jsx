import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      style: {
        background: '#334155',
        color: '#fff',
        borderRadius: '10px',
      },
      iconTheme: {
        primary: '#fbbf24',
        secondary: '#334155',
      },
    });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.images[0] || 'https://via.placeholder.com/300'} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 duration-300">
          <Link to={`/product/${product._id}`} className="p-3 bg-white text-slate-900 rounded-full hover:bg-amber-400 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Eye size={20} />
          </Link>
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-amber-400 text-slate-900 rounded-full hover:bg-amber-500 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        {/* Best Seller Badge */}
        {product.ratings >= 4.5 && (
          <div className="absolute top-3 left-3 bg-amber-400 text-slate-900 text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow-md animate-pulse">
            Best Seller
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product._id}`} className="hover:text-indigo-600">
          <h3 className="text-slate-900 font-bold line-clamp-2 leading-snug mb-2 group-hover:text-blue-600 transition-colors">{product.title}</h3>
        </Link>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{product.category}</p>
        
        <div className="flex items-center space-x-1 mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.ratings) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-slate-400 text-xs font-medium">({product.numReviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            ${product.price ? product.price.toLocaleString() : '0'}
          </span>
          <button 
            onClick={handleAddToCart}
            className="text-indigo-600 font-extrabold text-sm hover:underline flex items-center"
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

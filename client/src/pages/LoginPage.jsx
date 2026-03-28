import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Mail, Lock, LogIn, ArrowRight, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      toast.success('Welcome back to GoShop!', {
        icon: '👋',
        style: { borderRadius: '15px', background: '#334155', color: '#fff', fontWeight: 'bold' }
      });
      navigate(redirect);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed', {
         style: { borderRadius: '15px' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-3xl p-10 lg:p-14 rounded-[3rem] shadow-2xl border border-white/40 animate-fade-in relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-amber-400 to-rose-500"></div>
        
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Sign In</h2>
          <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Join the premium community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-slate-50/50 border-2 border-slate-100/50 focus:border-indigo-600 focus:bg-white outline-none rounded-2xl px-12 py-4 font-bold text-slate-900 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="group relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-slate-50/50 border-2 border-slate-100/50 focus:border-indigo-600 focus:bg-white outline-none rounded-2xl px-12 py-4 font-bold text-slate-900 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end p-1">
             <a href="#" className="text-indigo-600 font-black text-sm hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:shadow-slate-900/40 transition-all flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin text-amber-400" size={28} /> : (
              <>
                <span>Sign in to GoShop</span>
                <ArrowRight size={22} className="text-amber-400" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 flex items-center space-x-4 opacity-50">
           <div className="h-px w-full bg-slate-200"></div>
           <span className="text-slate-400 font-bold uppercase text-[10px] whitespace-nowrap">Or connect with</span>
           <div className="h-px w-full bg-slate-200"></div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center space-x-3 py-3 border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <LogIn size={20} className="text-indigo-600" /> <span className="font-bold text-sm">Universal Access</span>
           </button>
           <button className="flex items-center justify-center space-x-3 py-3 border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <Mail size={20} className="text-rose-500" /> <span className="font-bold text-sm">Secure Mail</span>
           </button>
        </div>

        <p className="mt-10 text-center text-slate-500 font-bold text-sm">
          New to GoShop? <Link to={`/register?redirect=${redirect}`} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

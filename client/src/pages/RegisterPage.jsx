import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, UserPlus, ArrowRight, Loader2 } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
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
      const { data } = await api.post('/auth/register', { name, email, password });
      login(data);
      toast.success(`Welcome to the family, ${name}!`, {
        icon: '🏠',
        style: { borderRadius: '15px', background: '#334155', color: '#fff', fontWeight: 'bold' }
      });
      navigate(redirect);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-3xl p-10 lg:p-14 rounded-[3rem] shadow-2xl border border-white/40 animate-fade-in relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 to-indigo-500"></div>

        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Join Now</h2>
          <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Start your premium journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-slate-50/50 border-2 border-slate-100/50 focus:border-rose-600 focus:bg-white outline-none rounded-2xl px-12 py-4 font-bold text-slate-900 transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="group relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-slate-50/50 border-2 border-slate-100/50 focus:border-rose-600 focus:bg-white outline-none rounded-2xl px-12 py-4 font-bold text-slate-900 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="group relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Create password"
              className="w-full bg-slate-50/50 border-2 border-slate-100/50 focus:border-rose-600 focus:bg-white outline-none rounded-2xl px-12 py-4 font-bold text-slate-900 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:shadow-slate-900/40 transition-all flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin text-amber-400" size={28} /> : (
              <>
                <span>Create my account</span>
                <ArrowRight size={22} className="text-amber-400" />
              </>
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-slate-500 font-bold text-sm">
          Already a member? <Link to={`/login?redirect=${redirect}`} className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

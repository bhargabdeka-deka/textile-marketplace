/**
 * src/pages/common/RegisterPage.jsx
 *
 * Premium Registration Page — Stripe / Vercel design system.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';
import authService from '@/services/auth.service';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';

function RegisterPage() {
  const [role, setRole] = useState('buyer'); // 'buyer' or 'supplier'
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = { name, email, password, role };
      if (role === 'supplier') {
        data.companyName = companyName;
      }
      
      const res = await authService.register(data);
      login({ user: res.data.user, token: res.data.token });
      toast.success('Account created successfully');
      
      if (res.data.user.role === 'supplier') {
        navigate('/supplier/dashboard');
      } else {
        navigate('/buyer/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Create account
        </h2>
        <p className="text-xs font-medium text-slate-400 mt-1">
          Join thousands of wholesale textile firms today
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        
        {/* B2B Role Segment Selectors */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`py-2 px-3 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                role === 'buyer'
                  ? 'bg-slate-900 text-white shadow-sm border border-slate-800'
                  : 'bg-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Buy Textiles
            </button>
            <button
              type="button"
              onClick={() => setRole('supplier')}
              className={`py-2 px-3 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                role === 'supplier'
                  ? 'bg-slate-900 text-white shadow-sm border border-slate-800'
                  : 'bg-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Sell Textiles
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="reg-name" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <User size={16} />
            </div>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Raj Sharma"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all duration-150"
            />
          </div>
        </div>

        {/* Company Name (only if supplier role is selected) */}
        {role === 'supplier' && (
          <div className="space-y-1.5 animate-fadeIn">
            <label htmlFor="reg-company" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Building size={16} />
              </div>
              <input
                id="reg-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Sharma Textiles Pvt. Ltd."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all duration-150"
              />
            </div>
          </div>
        )}

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Mail size={16} />
            </div>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all duration-150"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="reg-password" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Lock size={16} />
            </div>
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min. 8 characters"
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all duration-150"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#0070F3] hover:bg-[#0059B2] disabled:hover:bg-[#0070F3] text-white transition-all shadow-md shadow-blue-500/10 disabled:opacity-75 focus:outline-none mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Get Started</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      {/* Redirect to login */}
      <div className="pt-2 text-center text-xs font-semibold text-slate-400">
        Already have a console account?{' '}
        <Link
          to="/login"
          className="text-[#0070F3] hover:text-[#0059B2] hover:underline"
        >
          Sign in
        </Link>
      </div>

    </div>
  );
}

export default RegisterPage;

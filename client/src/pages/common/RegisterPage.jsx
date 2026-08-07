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
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Create account
        </h2>
        <p className="text-sm font-medium text-gray-500 mt-2">
          Join thousands of wholesale textile firms today
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleRegister}>
        
        {/* B2B Role Segment Selectors */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`py-2 px-3 rounded-lg text-sm font-bold transition-all duration-150 ${
                role === 'buyer'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'bg-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Buy Textiles
            </button>
            <button
              type="button"
              onClick={() => setRole('supplier')}
              className={`py-2 px-3 rounded-lg text-sm font-bold transition-all duration-150 ${
                role === 'supplier'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'bg-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sell Textiles
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="reg-name" className="block text-xs font-bold uppercase tracking-wider text-gray-600">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User size={18} />
            </div>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Raj Sharma"
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-150 shadow-sm hover:border-gray-300"
            />
          </div>
        </div>

        {/* Company Name (only if supplier role is selected) */}
        {role === 'supplier' && (
          <div className="space-y-2 animate-fadeIn">
            <label htmlFor="reg-company" className="block text-xs font-bold uppercase tracking-wider text-gray-600">
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Building size={18} />
              </div>
              <input
                id="reg-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Sharma Textiles Pvt. Ltd."
                className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-150 shadow-sm hover:border-gray-300"
              />
            </div>
          </div>
        )}

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-gray-600">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-150 shadow-sm hover:border-gray-300"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="reg-password" className="block text-xs font-bold uppercase tracking-wider text-gray-600">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min. 8 characters"
              className="w-full pl-11 pr-11 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-150 shadow-sm hover:border-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-white transition-all shadow-sm disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Get Started</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Redirect to login */}
      <div className="pt-4 text-center text-sm font-medium text-gray-500 border-t border-gray-100">
        Already have a console account?{' '}
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
        >
          Sign in
        </Link>
      </div>

    </div>
  );
}

export default RegisterPage;

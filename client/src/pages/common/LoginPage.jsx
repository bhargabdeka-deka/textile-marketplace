/**
 * src/pages/common/LoginPage.jsx
 *
 * Premium Login Page — Stripe / Vercel design system.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';
import authService from '@/services/auth.service';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authService.login({ email, password });
      login({ user: res.data.user, token: res.data.token });
      toast.success(res.message || 'Logged in successfully');
      
      if (res.data.user.role === 'supplier') {
        navigate('/supplier/dashboard');
      } else {
        navigate('/buyer/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title & Subtitle */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Welcome back
        </h2>
        <p className="text-xs font-medium text-slate-400 mt-1">
          Enter credentials to access your textile console
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        
        {/* Email Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="login-email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-400"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Mail size={16} />
            </div>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all duration-150"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="block text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Lock size={16} />
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 transition-all duration-150"
            />
            {/* Eye toggle button */}
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

        {/* Sign In Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#0070F3] hover:bg-[#0059B2] disabled:hover:bg-[#0070F3] text-white transition-all shadow-md shadow-blue-500/10 disabled:opacity-75 focus:outline-none mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      {/* Register Redirect Link */}
      <div className="pt-2 text-center text-xs font-semibold text-slate-400">
        Don't have a console account?{' '}
        <Link
          to="/register"
          className="text-[#0070F3] hover:text-[#0059B2] hover:underline"
        >
          Sign up free
        </Link>
      </div>

    </div>
  );
}

export default LoginPage;

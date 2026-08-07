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
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm font-medium text-gray-500 mt-2">
          Enter credentials to access your textile console
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        
        {/* Email Address */}
        <div className="space-y-2">
          <label
            htmlFor="login-email"
            className="block text-xs font-bold uppercase tracking-wider text-gray-600"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-150 shadow-sm hover:border-gray-300"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="block text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-11 pr-11 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-150 shadow-sm hover:border-gray-300"
            />
            {/* Eye toggle button */}
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

        {/* Sign In Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-white transition-all shadow-sm disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Register Redirect Link */}
      <div className="pt-4 text-center text-sm font-medium text-gray-500 border-t border-gray-100">
        Don't have a console account?{' '}
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
        >
          Sign up free
        </Link>
      </div>

    </div>
  );
}

export default LoginPage;

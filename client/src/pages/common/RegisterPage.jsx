/**
 * src/pages/common/RegisterPage.jsx
 *
 * Registration page.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, Loader2 } from 'lucide-react';
import authService from '@/services/auth.service';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';

function RegisterPage() {
  const [role, setRole] = useState('buyer'); // 'buyer' or 'supplier'
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <>
      <div className="mb-6 text-center">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          Create your account
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
          Join thousands of textile businesses on TextileHub
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        {/* Role selector */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            I want to
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className="py-2.5 px-3 rounded-lg text-sm font-medium border transition-all duration-150"
              style={{
                borderColor: role === 'buyer' ? 'var(--color-brand-primary)' : 'var(--color-border)',
                backgroundColor: role === 'buyer' ? 'rgba(4,106,56,0.05)' : 'transparent',
                color: role === 'buyer' ? 'var(--color-brand-primary)' : 'var(--color-muted)',
              }}
            >
              Buy Textiles
            </button>
            <button
              type="button"
              onClick={() => setRole('supplier')}
              className="py-2.5 px-3 rounded-lg text-sm font-medium border transition-all duration-150"
              style={{
                borderColor: role === 'supplier' ? 'var(--color-brand-primary)' : 'var(--color-border)',
                backgroundColor: role === 'supplier' ? 'rgba(4,106,56,0.05)' : 'transparent',
                color: role === 'supplier' ? 'var(--color-brand-primary)' : 'var(--color-muted)',
              }}
            >
              Sell Textiles
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="reg-name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
            Full Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input id="reg-name" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Raj Sharma" className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border outline-none" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
        </div>

        {role === 'supplier' && (
          <div>
            <label htmlFor="reg-company" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
              Company Name
            </label>
            <div className="relative">
              <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
              <input id="reg-company" type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required placeholder="Sharma Textiles Pvt. Ltd." className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border outline-none" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
            Email address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input id="reg-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@company.com" className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border outline-none" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input id="reg-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min. 8 characters" className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border outline-none" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center justify-center hover:opacity-90 mt-2 disabled:opacity-70"
          style={{ backgroundColor: 'var(--color-brand-primary)', color: '#ffffff' }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
        Already have an account?{' '}
        <Link to="/login" className="font-medium hover:underline" style={{ color: 'var(--color-brand-primary)' }}>
          Sign in
        </Link>
      </p>
    </>
  );
}

export default RegisterPage;

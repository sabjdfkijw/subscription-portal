'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SharedLayout from '@/components/SharedLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, orderId }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) router.push('/member');
    else alert('Login failed. Please check your email and Order ID.');
    setLoading(false);
  };

  return (
    <SharedLayout>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '40px', backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: '300' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: '#374151' }}>Enter Email</label>
            <input 
              type="email" 
              style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: '#374151' }}>Order ID</label>
            <input 
              type="text" 
              style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              value={orderId} 
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ width: '100%', backgroundColor: '#fde047', padding: '14px', borderRadius: '4px', fontSize: '18px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
          By continuing, you agree to MoldMD's Conditions of Use and Privacy Notice.
        </p>
      </div>
    </SharedLayout>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SharedLayout from '@/components/SharedLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, orderId }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/member');
      } else if (data.requiresVerification) {
        setRequiresVerification(true);
        setMessage(data.message || 'A verification code has been sent to your email.');
      } else {
        setMessage(data.error || 'Login failed. Please check your email and Order ID.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, code: verificationCode }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage('Email verified! You can now proceed with login.');
        setRequiresVerification(false);
        setVerificationCode('');
        // The user should now try to login again with their order ID, 
        // or we could auto-proceed if we had the orderId stored, but re-login is safer.
      } else {
        setMessage(data.error || 'Verification failed. Please check the code and try again.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SharedLayout>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '40px', backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: '300', textAlign: 'center' }}>Login</h2>
        
        {!requiresVerification ? (
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
              {loading ? 'Processing...' : 'Login'}
            </button>
            {message && <p style={{ marginTop: '16px', color: '#dc2626', fontSize: '14px', textAlign: 'center' }}>{message}</p>}
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#059669', marginBottom: '16px' }}>
                {message || 'Please enter the verification code sent to your email.'}
              </p>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: '#374151' }}>Verification Code</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px', textAlign: 'center', letterSpacing: '4px', fontSize: '18px' }} 
                value={verificationCode} 
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#059669', color: 'white', padding: '14px', borderRadius: '4px', fontSize: '18px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
            <button 
              type="button" 
              onClick={() => { setRequiresVerification(false); setMessage(''); }} 
              style={{ width: '100%', marginTop: '12px', backgroundColor: 'transparent', color: '#6b7280', padding: '8px', border: 'none', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Back to Login
            </button>
          </form>
        )}

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
          By continuing, you agree to MoldMD's Conditions of Use and Privacy Notice.
        </p>
      </div>
    </SharedLayout>
  );
}

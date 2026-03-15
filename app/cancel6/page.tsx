'use client';
import { useState, useEffect } from 'react';

export default function Cancel6() {
  const [customerName, setCustomerName] = useState('');
  const [upsellBannerError, setUpsellBannerError] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndFetchCustomer = async () => {
      try {
        const response = await fetch('/api/customer/info');
        if (response.status === 401) {
          window.location.href = '/login?redirect_uri=/member';
          return;
        }
        const data = await response.json();
        setCustomerName(data.name || 'Customer');

        if (data.email) {
          const subscriptionsRes = await fetch(`/api/subscriptions?email=${data.email}`);
          const subscriptionsData = await subscriptionsRes.json();
          
          const activeSub = subscriptionsData.subscriptions.find((sub: any) => 
            sub.status === 'active' || sub.status === 'trialing'
          );

          if (activeSub) {
            setSubscriptionId(activeSub.id);
          } else {
            setError('No active subscription found for this customer.');
          }
        } else {
          setError('Could not retrieve customer email.');
        }
      } catch (err) {
        console.error('Authentication check or customer info fetch failed:', err);
        window.location.href = '/login?redirect_uri=/member'; // Redirect on any error during auth check
      }
    };
    checkAuthAndFetchCustomer();
  }, []);

  const handleStay = () => {
    window.location.href = '/member';
  };

  const handleConfirmCancellation = async () => {
    if (!subscriptionId) {
      setError('No subscription ID available to cancel.');
      return;
    }

    setIsCancelling(true);
    setError(null);

    try {
      const response = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Cancellation successful:', data);
        window.location.href = '/cancel7'; // Redirect to confirmation page
      } else {
        setError(data.error || 'Failed to cancel subscription.');
      }
    } catch (err) {
      console.error('Error during cancellation:', err);
      setError('An unexpected error occurred during cancellation.');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleUpgrade = () => {
    window.location.href = '/member?tab=upgrade';
  };

  return (
    <div style={{ fontFamily: '"Montserrat", sans-serif', backgroundColor: '#fff', color: '#333', minHeight: '100vh', margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        
        body { margin: 0; padding: 0; }
        .container { max-width: 800px; margin: 0 auto; padding: 0 15px; }
        
        .nav-tabs { display: flex; border-bottom: 1px solid #eee; margin-bottom: 30px; }
        .nav-tab { padding: 12px 20px; font-size: 14px; color: #666; border: none; background: none; cursor: pointer; font-weight: 500; }
        .nav-tab.active { color: #111827; font-weight: 700; border-bottom: 2px solid #111827; }

        .promo-banner { width: 100%; border-radius: 12px; overflow: hidden; margin: 20px 0; cursor: pointer; }
        
        .sub-nav { font-size: 13px; color: #6b7280; margin-bottom: 25px; display: flex; align-items: center; gap: 5px; }
        .sub-nav b { color: #111827; }

        .main-box { border: 1px solid #e5e7eb; border-radius: 8px; padding: 50px 40px; text-align: center; margin-bottom: 50px; }
        .main-title { font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 20px; }
        .main-text { font-size: 14px; color: #4b5563; line-height: 1.6; max-width: 600px; margin: 0 auto 30px; }
        
        .feedback-area { width: 100%; min-height: 120px; border: 1px solid #d1d5db; border-radius: 6px; padding: 15px; font-family: inherit; font-size: 14px; margin-bottom: 30px; resize: vertical; color: #374151; }
        .feedback-area::placeholder { color: #9ca3af; }

        .btn-cancel-link { color: #111827; text-decoration: underline; font-size: 15px; font-weight: 700; background: none; border: none; cursor: pointer; margin-bottom: 25px; display: block; margin-left: auto; margin-right: auto; }
        .btn-keep { background: #fde047; color: #111827; border: none; padding: 15px 40px; border-radius: 30px; font-size: 16px; font-weight: 800; cursor: pointer; display: block; margin: 0 auto; width: 100%; max-width: 350px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }

        @media (max-width: 600px) {
          .main-box { padding: 40px 20px; }
          .main-title { font-size: 20px; }
        }
      `}</style>
      
      <div className="container">
        {/* UPSELL IMAGE */}
        <div className="promo-banner" onClick={handleUpgrade}>
          <img 
            src="/upgrade-banner.jpg" 
            alt="Upgrade to Pro" 
            style={{ width: '100%', display: 'block', minHeight: '100px', backgroundColor: '#f3f4f6', objectFit: 'cover' }} 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              setUpsellBannerError(true);
            }}
          />
          {upsellBannerError && (
             <div style={{ width: '100%', height: '120px', background: 'linear-gradient(90deg, #fefce8 0%, #dcfce7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontWeight: '800', fontSize: '20px', color: '#111827' }}>Love your results? You're ready for the next level</div>
                  <div style={{ fontSize: '14px', color: '#4b5563' }}>MoldMD Pro offers faster coverage and deep prevention</div>
                </div>
                <button style={{ background: '#fde047', color: '#111827', border: '1px solid #facc15', borderRadius: '20px', padding: '8px 16px', fontWeight: '800', fontSize: '12px', marginLeft: '10px' }}>Discover Mold Defense</button>
             </div>
          )}
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '20px 0', color: '#111827' }}>Hi, {customerName}</h2>
        
        <div className="nav-tabs">
          <button className="nav-tab" onClick={() => window.location.href = '/member'}>Overview</button>
          <button className="nav-tab" onClick={() => window.location.href = '/member?tab=upgrade'}>Upgrade Value</button>
          <button className="nav-tab active" onClick={() => window.location.href = '/member'}>Account</button>
        </div>

        <div className="sub-nav">
          <span style={{ cursor: 'pointer' }} onClick={handleStay}>‹ Subscription</span> / <b>Cancelation</b>
        </div>

        <div className="main-box">
          <h1 className="main-title">Are you sure you want to cancel?</h1>
          <p className="main-text">
            We're really sorry to see you go. Your feedback means a lot to us — could you share why you decided to cancel? It helps us improve MoldMD and make the experience better for everyone.
          </p>

          <textarea 
            className="feedback-area" 
            placeholder="Tell us why you canceled (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          {error && <p style={{ color: '#ef4444', marginBottom: '20px' }}>{error}</p>}

          <button 
            className="btn-cancel-link" 
            onClick={handleConfirmCancellation} 
            disabled={isCancelling}
          >
            {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
          </button>
          
          <button className="btn-keep" onClick={handleStay}>
            Keep Subscription
          </button>
        </div>

      </div>
    </div>
  );
}

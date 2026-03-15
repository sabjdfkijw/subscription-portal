'use client';
import { useState, useEffect } from 'react';

export default function Cancel7() {
  const [customerName, setCustomerName] = useState('');
  const [upsellBannerError, setUpsellBannerError] = useState(false);

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
      } catch (error) {
        console.error('Authentication check or customer info fetch failed:', error);
        window.location.href = '/login?redirect_uri=/member'; // Redirect on any error during auth check
      }
    };
    checkAuthAndFetchCustomer();
  }, []);

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
        
        .main-box { border: 1px solid #dcfce7; border-radius: 8px; padding: 50px 40px; text-align: center; margin-bottom: 50px; background-color: #f0fdf4; }
        .main-title { font-size: 24px; font-weight: 800; color: #166534; margin-bottom: 20px; }
        .main-text { font-size: 14px; color: #4b5563; line-height: 1.6; max-width: 600px; margin: 0 auto 30px; }

        .btn-green { background: #22c55e; color: white; border: none; padding: 15px 40px; border-radius: 30px; font-size: 16px; font-weight: 800; cursor: pointer; display: block; margin: 0 auto; width: 100%; max-width: 350px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }

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

        <div className="main-box">
          <h1 className="main-title">Your MoldMD Concentrate subscription has been canceled.</h1>
          <p className="main-text">
            We're sorry to see you go! Your subscription will remain active until the end of your current billing period.
            You can resubscribe anytime from your account page.
          </p>
          <button className="btn-green" onClick={() => window.location.href = '/member'}>
            Go to My Account
          </button>
        </div>

      </div>
    </div>
  );
}

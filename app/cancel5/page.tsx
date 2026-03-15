'use client';
import { useState, useEffect } from 'react';

export default function Cancel5() {
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

  const handleStay = () => {
    window.location.href = '/member';
  };

  const handleCancel = () => {
    window.location.href = '/cancel6'; // Redirect to next step in flow
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

        .main-title { font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 20px; text-align: center; }
        .main-text { font-size: 14px; color: #4b5563; line-height: 1.6; max-width: 600px; margin: 0 auto 30px; text-align: center; }
        
        .offer-box { background-color: #f0fdf4; border: 1px solid #dcfce7; border-radius: 8px; padding: 30px 20px; text-align: center; margin-bottom: 40px; }
        .offer-title { font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 10px; }
        .offer-subtitle { font-size: 14px; color: #4b5563; margin-bottom: 20px; }
        .offer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 400px; margin: 0 auto 25px; }
        .offer-grid-item { padding: 15px; border: 1px solid #d1fae5; border-radius: 6px; text-align: center; }
        .offer-grid-price { font-size: 22px; font-weight: 900; color: #166534; margin-bottom: 5px; }
        .offer-grid-label { font-size: 12px; color: #4b5563; }
        .offer-product-image { max-width: 70%; height: auto; margin-bottom: 20px; }
        .offer-list { list-style: none; padding: 0; margin: 0 auto 25px; max-width: 300px; text-align: left; font-size: 14px; color: #4b5563; line-height: 2; }
        .offer-list li { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .offer-list li span { color: #22c55e; font-weight: 900; }

        .btn-claim { background: #fde047; color: #111827; border: 1px solid #facc15; padding: 20px 30px; border-radius: 50px; font-size: 16px; font-weight: 800; cursor: pointer; width: 100%; max-width: 450px; margin-bottom: 15px; box-shadow: 0 4px 0 #eab308; line-height: 1.4; display: block; margin-left: auto; margin-right: auto; }
        .btn-stick { background: white; border: 1px solid #e2e8f0; color: #64748b; padding: 12px 30px; border-radius: 50px; font-size: 13px; font-weight: 600; cursor: pointer; width: 100%; max-width: 450px; display: block; margin-left: auto; margin-right: auto; }

        @media (max-width: 600px) {
          .main-title { font-size: 20px; }
          .offer-grid { grid-template-columns: 1fr; }
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

        <h1 className="main-title">Don't miss out on these exclusive savings!</h1>
        <p className="main-text">
          Before you go, consider upgrading to our annual plan and save even more on MoldMD Pro.
        </p>

        <div className="offer-box">
          <h2 className="offer-title">Upgrade to Annual and Save!</h2>
          <p className="offer-subtitle">Get year-round protection for less.</p>
          
          <div className="offer-grid">
            <div className="offer-grid-item">
              <p className="offer-grid-price">$99</p>
              <p className="offer-grid-label">Per Year</p>
            </div>
            <div className="offer-grid-item">
              <p className="offer-grid-price">$8.25</p>
              <p className="offer-grid-label">Per Month (Billed Annually)</p>
            </div>
          </div>

          <img src="https://placehold.co/400x250?text=Annual+Plan+Savings" alt="Annual Plan Savings" className="offer-product-image" />

          <ul className="offer-list">
            <li><span>✓</span> Save over 20% compared to monthly</li>
            <li><span>✓</span> Lock in your price for a full year</li>
            <li><span>✓</span> No more monthly worries</li>
          </ul>

          <button className="btn-claim" onClick={handleUpgrade}>
            Yes! Upgrade to Annual Now
          </button>
          <div style={{ marginTop: '20px' }}>
            <button className="btn-stick" onClick={handleCancel}>
              No thanks, continue to cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

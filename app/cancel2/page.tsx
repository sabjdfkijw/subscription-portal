'use client';
import { useState, useEffect } from 'react';

export default function Cancel2() {
  const [customerName, setCustomerName] = useState('');
  const [upsellBannerError, setUpsellBannerError] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

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

  const reasons = [
    "Mold problem is resolved",
    "Too expensive for mold treatment",
    "Didn't work as expected",
    "Have too much product",
    "Moving/Other reason"
  ];

  const handleStay = () => {
    window.location.href = '/member';
  };

  const handleContinue = () => {
    if (!selectedReason) return;
    window.location.href = '/cancel3'; // Redirect to next step in flow
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
        
        /* Custom styles for cancel2 */
        .reason-option {
          background-color: #dcfce7;
          border-radius: 4px;
          padding: 12px 16px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .reason-option:hover {
          background-color: #bbf7d0;
        }
        
        .radio-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #166534;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
        }
        
        .radio-fill {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #166534;
          display: none;
        }
        
        .reason-option.selected .radio-fill {
          display: block;
        }

        @media (max-width: 768px) { 
          .inner-content { padding: 0 20px; width: 100%; box-sizing: border-box; overflow-x: hidden; }
          .promo-banner { margin: 16px 0 32px 0 !important; width: 100% !important; max-width: 100%; box-sizing: border-box; overflow: hidden; }
          .promo-banner img { width: 100%; max-width: 100%; height: auto; }
        }
        @media (min-width: 769px) { 
          .inner-content { max-width: 600px; margin: 0 auto; padding: 0 20px; }
          .promo-banner { width: 100% !important; margin-bottom: 32px !important; margin-top: 8px !important; }
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

        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '24px' }}>
          ‹ <a href="/cancel1" style={{ color: '#6b7280', textDecoration: 'none' }}>Subscription</a> / <span style={{ color: '#374151', fontWeight: '500' }}>Cancelation</span>
        </div>

        {/* Main Survey Box */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '32px 24px', backgroundColor: '#fff', marginBottom: '16px' }}>
          
          <h2 style={{ fontSize: '20px', fontWeight: '700', textAlign: 'center', color: '#111827', marginBottom: '8px', lineHeight: '1.3' }}>
            Before You Cancel Your<br/>
            MoldMD Concentrate - 2 Bottles
          </h2>
          
          <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', marginBottom: '32px' }}>
            Help us understand why you're leaving:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '0 auto', marginBottom: '32px' }}>
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className={`reason-option ${selectedReason === reason ? 'selected' : ''}`}
                onClick={() => setSelectedReason(reason)}
              >
                <div className="radio-circle">
                  <div className="radio-fill"></div>
                </div>
                <span style={{ fontSize: '15px', color: '#374151', fontWeight: '400' }}>{reason}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={handleContinue}
              disabled={!selectedReason}
              style={{ 
                backgroundColor: selectedReason ? '#e5e7eb' : '#f3f4f6', 
                color: selectedReason ? '#374151' : '#9ca3af', 
                fontWeight: '600', 
                padding: '10px 48px', 
                borderRadius: '30px', 
                border: 'none', 
                fontSize: '14px', 
                cursor: selectedReason ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Choose an option to continue
            </button>
          </div>

        </div>

        {/* Bottom Keep Subscription Box */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '24px', backgroundColor: '#fff', textAlign: 'center', marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Don't want to cancel?</h3>
          <a href="/member" style={{ fontSize: '14px', color: '#166534', textDecoration: 'underline', fontWeight: '500' }}>Continue to your account</a>
        </div>

      </div>
    </div>
  );
}

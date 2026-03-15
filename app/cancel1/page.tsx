'use client';
import { useState, useEffect } from 'react';

export default function Cancel1() {
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
        
        .info-box {
          background-color: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          text-align: center;
          padding: 16px;
          margin-bottom: 24px;
          color: #374151;
        }

        /* Custom styles for tables from cancel1 */
        .flex-columns { display: flex; gap: 24px; margin-bottom: 32px; flex-wrap: wrap; }
        .table-header { background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .table-header th { padding: 12px 16px; font-size: 12px; font-weight: 500; color: #6b7280; text-align: left; }
        .table-row { border-bottom: 1px solid #e5e7eb; }
        .table-cell { padding: 16px; font-size: 14px; color: #374151; }
        .table-cell-content { font-weight: 600; }
        .table-cell-status { background-color: #f0fdf4; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; border: 1px solid #bbf7d0; }
        .table-cell-link { color: #0f766e; text-decoration: underline; }
        .table-cell-cancel { color: #991b1b; text-decoration: underline; font-weight: 500; }

        @media (max-width: 768px) { 
          .flex-columns { flex-direction: column !important; }
          .inner-content { padding: 0 20px; }
          .table-header { display: none; }
          .table-row { display: flex; flex-direction: column; padding: 16px; border-bottom: 1px solid #e5e7eb; }
          .table-cell { padding: 8px 0 !important; display: flex; justify-content: space-between; align-items: center; border: none !important; }
          .table-cell::before { content: attr(data-label); font-weight: 500; color: #6b7280; font-size: 12px; }
          .table-cell-content { text-align: right; }
          .table-cell-actions { flex-direction: column; align-items: flex-end; display: flex; }
        }
        @media (min-width: 769px) { 
          .inner-content { max-width: 800px; margin: 0 auto; padding: 0 20px; }
          .flex-columns { flex-direction: row !important; }
          .table-row { display: table-row; }
          .table-cell { padding: 16px !important; display: table-cell; }
          .table-cell::before { display: none; }
          .table-cell-content { text-align: left; }
          .table-cell-actions { flex-direction: column; align-items: flex-start; display: flex; }
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

        <div className="info-box" style={{ fontSize: '15px' }}>
          If you pause for a month, your next billing date will change to <span style={{ backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>May 10, 2026</span> .
        </div>

        <div className="flex-columns">
          {/* Pause Option (Left) */}
          <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#374151', marginBottom: '16px', textAlign: 'center' }}>Pause for a month</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', marginBottom: '16px' }}>Your preferences stay the same. You can resume anytime.</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '24px' }}>New next bill date: May 10, 2026</p>
            <button style={{ backgroundColor: '#fde047', color: '#111827', fontWeight: '600', padding: '12px 32px', borderRadius: '30px', border: 'none', fontSize: '14px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Pause for a month
            </button>
          </div>

          {/* Upgrade Option (Right) */}
          <div style={{ flex: 1, backgroundColor: '#fefdf5', border: '1px solid #fef3c7', borderRadius: '4px', padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
            {/* Background shapes mimicking bugmd's green/yellow semi-circles at bottom */}
            <div style={{ position: 'absolute', bottom: '-40px', left: '-10%', width: '120%', height: '140px', backgroundColor: '#65a30d', borderRadius: '50%', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', bottom: '-60px', left: '-5%', width: '110%', height: '140px', backgroundColor: '#fde047', borderRadius: '50%', zIndex: 1 }}></div>

            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#374151', marginBottom: '8px', textAlign: 'center', lineHeight: '1.3' }}>
                Level Up with<br/>
                MoldMD <span style={{ border: '1px solid #374151', borderRadius: '12px', padding: '2px 6px', fontSize: '12px', verticalAlign: 'middle', marginLeft: '4px' }}>PRO</span>
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', marginBottom: '24px' }}>Everything you love, PLUS</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto 24px', color: '#374151', fontSize: '13px', lineHeight: '1.6', maxWidth: '280px' }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Prevention Shield:</b> Stops mold before it starts</div></li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Electric Sprayer:</b> Cover your whole home 3x faster</div></li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Extended Protection:</b> 100+ surfaces covered</div></li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Quarterly Convenience:</b> Ship less, protect more</div></li>
                <li style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Investment:</b> $45/quarter ($15/month)</div></li>
              </ul>

              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h4 style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>Value Comparison:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', color: '#374151', fontSize: '12px', display: 'inline-block', textAlign: 'left' }}>
                  <li style={{ marginBottom: '4px', display: 'flex', alignItems: 'flex-start' }}><span style={{ marginRight: '8px' }}>•</span> <div>Professional mold removal: $75-150/month</div></li>
                  <li style={{ marginBottom: '4px', display: 'flex', alignItems: 'flex-start' }}><span style={{ marginRight: '8px' }}>•</span> <div><b>MoldMD Pro:</b> $15/month</div></li>
                  <li style={{ fontWeight: '700', display: 'flex', alignItems: 'flex-start' }}><span style={{ marginRight: '8px' }}>•</span> <div>Save $720+ annually vs. professionals</div></li>
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '160px', height: '100px', backgroundColor: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #9ca3af', borderRadius: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#9ca3af' }}>[ Image ]</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ backgroundColor: '#65a30d', color: '#fff', fontWeight: '700', padding: '12px 24px', borderRadius: '30px', border: 'none', fontSize: '14px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '90%' }}>
                  Upgrade to MoldMD PRO
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Subscription Table */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden', marginBottom: '48px', backgroundColor: '#fff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>Subscription</th>
                <th>Status</th>
                <th>Next Bill Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-cell" data-label="Name">
                  <div className="table-cell-content">MoldMD Concentrate - 2 Bottles</div>
                </td>
                <td className="table-cell" data-label="Subscription">
                  <div className="table-cell-content">$19.97</div>
                </td>
                <td className="table-cell" data-label="Status">
                  <div className="table-cell-status">ACTIVE</div>
                </td>
                <td className="table-cell" data-label="Next Bill Date">
                  <div className="table-cell-actions">
                    <div style={{ marginBottom: '8px' }}>April 10, 2026</div>
                    <div style={{ marginBottom: '8px' }}><a href="#" className="table-cell-link">Manage Subscription</a></div>
                    <div><a href="/cancel2" className="table-cell-cancel">Finalize cancellation</a></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import SharedLayout from '@/components/SharedLayout';

export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [customerName, setCustomerName] = useState('');
  const [bannerError, setBannerError] = useState(false);

  useEffect(() => {
    fetch('/api/customer/info')
      .then(r => r.json())
      .then(d => setCustomerName(d.name || 'Customer'))
      .catch(() => setCustomerName('Customer'));
  }, []);

  const tabStyle = (tab: string) => ({
    padding: '12px 20px', fontSize: '15px', fontWeight: activeTab === tab ? 600 : 400,
    color: '#000', background: 'none', border: 'none', cursor: 'pointer',
    borderBottom: activeTab === tab ? '2px solid #000' : 'none'
  });

  const sectionHeader = { fontSize: '18px', fontWeight: '500', marginBottom: '16px', marginTop: '32px' };
  const tableContainer = { border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' };
  const th = { padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' as const, textAlign: 'left' as const, backgroundColor: '#f9fafb' };

  // Mobile card row style - matches BugMD exactly
  const cardRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 16px', borderBottom: '1px solid #e5e7eb' };
  const cardLabelStyle = { fontSize: '14px', fontWeight: '600', color: '#374151' };
  const cardValueStyle = { fontSize: '14px', color: '#374151', textAlign: 'right' as const };
  const cardContainerStyle = { border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#fcfcfa', overflow: 'hidden', marginBottom: '24px' };

  return (
    <SharedLayout onBannerClick={() => setActiveTab('upgrade')}>
      <style>{`
        @media (max-width: 768px) { 
          .desktop-table { display: none !important; } 
          .mobile-card { display: block !important; } 
          .hero-flex { flex-direction: column !important; }
          .math-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          /* Reset max-width on mobile to allow edge-to-edge if needed */
          main { padding: 0 !important; }
          .inner-content { padding: 0 20px; }
          .hero-bg-wrapper { padding: 0 20px; }
          .desktop-shape { display: none !important; }
          .mobile-shape { display: block !important; }
        }
        @media (min-width: 769px) { 
          .desktop-table { display: block !important; } 
          .mobile-card { display: none !important; } 
          .hero-flex { flex-direction: row !important; }
          .math-grid { grid-template-columns: 1fr 1fr 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr 1fr !important; }
          /* Ensure main content is centered on desktop but allow hero to break out if needed */
          main { max-width: none !important; padding: 0 !important; }
          .inner-content { max-width: 600px; margin: 0 auto; padding: 0 20px; }
          /* The hero background wrapper */
          .hero-bg-wrapper { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
          .desktop-shape { display: block !important; }
          .mobile-shape { display: none !important; }
        }
      `}</style>
      
      <div className="inner-content" style={{ marginTop: '32px' }}>
        {/* Promotional Upgrade Banner - moved above the greeting */}
        {activeTab === 'overview' && (
          <div style={{ marginBottom: '32px', marginTop: '8px', cursor: 'pointer' }} onClick={() => setActiveTab('upgrade')}>
            {!bannerError ? (
              <img 
                src="/upgrade-banner.jpg" 
                alt="Upgrade to Pro" 
                style={{ width: '100%', borderRadius: '8px', display: 'block', minHeight: '120px', backgroundColor: '#f3f4f6', objectFit: 'cover' }} 
                onError={() => setBannerError(true)}
              />
            ) : (
              <div style={{ width: '100%', borderRadius: '8px', backgroundColor: '#fefcf0', border: '1px solid #fef3c7', padding: '24px', textAlign: 'center' }}>
                 <h3 style={{ color: '#92400e', marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>[Image Placeholder] Upgrade Protection</h3>
                 <p style={{ color: '#b45309', fontSize: '14px' }}>Click here to view our special upgrade offers</p>
              </div>
            )}
          </div>
        )}

        {customerName && <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Hi, {customerName}</h2>}
        
        <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: '24px', display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <button style={tabStyle('overview')} onClick={() => setActiveTab('overview')}>Overview</button>
          <button style={tabStyle('upgrade')} onClick={() => setActiveTab('upgrade')}>Upgrade Value</button>
          <button style={tabStyle('account')} onClick={() => setActiveTab('account')}>Account</button>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* ===== ORDERS ===== */}
            <h2 style={sectionHeader}>Orders</h2>
            <div className="desktop-table" style={tableContainer}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Order #</th><th style={th}>Date</th><th style={th}>Items</th><th style={th}>Amount</th><th style={th}>Tracking #</th></tr></thead>
                <tbody><tr><td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>No orders found</td></tr></tbody>
              </table>
            </div>
            <div className="mobile-card" style={cardContainerStyle}>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Order #:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Date:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Items:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Amount:</span><span style={cardValueStyle}>—</span></div>
              <div style={{ ...cardRowStyle, borderBottom: 'none' }}><span style={cardLabelStyle}>Tracking #:</span><span style={cardValueStyle}>—</span></div>
            </div>

            {/* ===== SUBSCRIPTIONS ===== */}
            <h2 style={sectionHeader}>Subscriptions</h2>
            <div className="desktop-table" style={tableContainer}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Subscription #</th><th style={th}>Product</th><th style={th}>Status</th><th style={th}>Next Bill Date</th><th style={th}>Cancel</th></tr></thead>
                <tbody><tr><td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>No subscriptions found</td></tr></tbody>
              </table>
            </div>
            <div className="mobile-card" style={cardContainerStyle}>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Subscription #:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Product:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Status:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Next Bill Date:</span><span style={cardValueStyle}>—</span></div>
              <div style={{ ...cardRowStyle, borderBottom: 'none' }}><span style={cardLabelStyle}>Cancel Subscription:</span><span style={cardValueStyle}>—</span></div>
            </div>

            {/* ===== SHIPMENTS ===== */}
            <h2 style={sectionHeader}>Shipments</h2>
            <div className="desktop-table" style={tableContainer}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Order #</th><th style={th}>Shipped</th><th style={th}>Tracking #</th><th style={th}>Delivered</th><th style={th}>Address</th></tr></thead>
                <tbody><tr><td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>No shipments found</td></tr></tbody>
              </table>
            </div>
            <div className="mobile-card" style={cardContainerStyle}>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Order #:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Shipped:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Tracking #:</span><span style={cardValueStyle}>—</span></div>
              <div style={cardRowStyle}><span style={cardLabelStyle}>Delivered:</span><span style={cardValueStyle}>—</span></div>
              <div style={{ ...cardRowStyle, borderBottom: 'none' }}><span style={cardLabelStyle}>Address:</span><span style={cardValueStyle}>—</span></div>
            </div>
          </>
        )}
      </div>

      {activeTab === 'upgrade' && (
        <div style={{ marginTop: '0px' }}>
          
          {/* HERO SECTION - BugMD Style Layout with Full Background */}
          <div style={{ width: '100%', backgroundColor: '#fefdf5', padding: '48px 0', borderBottom: '1px solid #e5e7eb', marginBottom: '48px', position: 'relative', overflow: 'hidden' }}>
            
            {/* Background Shapes (Simulating the yellow/green swooshes) */}
            <div className="desktop-shape" style={{ position: 'absolute', right: 0, top: 0, width: '45%', height: '100%', backgroundColor: '#65a30d', zIndex: 0, clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
            <div className="desktop-shape" style={{ position: 'absolute', right: '40%', top: 0, width: '15%', height: '100%', backgroundColor: '#fde047', zIndex: 0, clipPath: 'polygon(0 0, 100% 0, 70% 100%, -30% 100%)' }}></div>

            <div className="mobile-shape" style={{ position: 'absolute', right: 0, bottom: 0, width: '100%', height: '50%', backgroundColor: '#65a30d', zIndex: 0, clipPath: 'polygon(0 15%, 100% 0%, 100% 100%, 0% 100%)' }}></div>
            <div className="mobile-shape" style={{ position: 'absolute', right: 0, bottom: '45%', width: '100%', height: '15%', backgroundColor: '#fde047', zIndex: 0, clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 130%)' }}></div>

            <div className="hero-bg-wrapper hero-flex" style={{ display: 'flex', gap: '32px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
              
              {/* Left Column (Text) */}
              <div style={{ flex: 1, zIndex: 10, textAlign: 'left', padding: '24px 0' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#374151', lineHeight: '1.3' }}>
                  Level Up with<br/>
                  <span style={{ color: '#374151' }}>MoldMD <span style={{ border: '1px solid #374151', borderRadius: '12px', padding: '2px 6px', fontSize: '14px', verticalAlign: 'middle', marginLeft: '4px' }}>PRO</span></span>
                </h2>
                <p style={{ fontSize: '16px', fontWeight: '400', color: '#6b7280', marginBottom: '32px' }}>Everything you love, PLUS</p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#374151', fontSize: '16px', lineHeight: '1.6', textAlign: 'left', display: 'inline-block' }}>
                  <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Prevention Shield:</b> Stops mold before it starts</div></li>
                  <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Electric Sprayer:</b> Cover your whole home 3x faster</div></li>
                  <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Extended Protection:</b> 100+ surfaces covered</div></li>
                  <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Quarterly Convenience:</b> Ship less, protect more</div></li>
                  <li style={{ marginBottom: '32px', display: 'flex', alignItems: 'flex-start' }}><span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span> <div><b>Investment:</b> $45/quarter ($15/month)</div></li>
                </ul>

                <div style={{ textAlign: 'left', marginBottom: '24px', maxWidth: '350px' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '16px', color: '#374151', textAlign: 'center' }}>Value Comparison:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', color: '#374151', fontSize: '15px', display: 'inline-block' }}>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}><span style={{ marginRight: '8px' }}>•</span> <div>Professional mold removal: $75-150/month</div></li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}><span style={{ marginRight: '8px' }}>•</span> <div><b>MoldMD Pro:</b> $15/month</div></li>
                    <li style={{ fontWeight: '700', display: 'flex', alignItems: 'flex-start' }}><span style={{ marginRight: '8px' }}>•</span> <div>Save $720+ annually vs. professionals</div></li>
                  </ul>
                </div>

              </div>

              {/* Right Column (Image & Button) */}
              <div style={{ flex: 1, position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: '400px', minHeight: '300px', backgroundColor: 'transparent', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative' }}>
                   {/* We make the background transparent here so the green shows through naturally, or we can use an image that has a transparent background */}
                   <div style={{ textAlign: 'center', color: '#fff', zIndex: 10, padding: '24px', border: '2px dashed rgba(255,255,255,0.5)', borderRadius: '12px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div>
                       <p>[ Product Image Placeholder ]</p>
                       <p style={{ fontSize: '12px', marginTop: '8px' }}>Needs transparent PNG</p>
                     </div>
                   </div>
                </div>
                <button style={{ backgroundColor: '#fde047', color: '#111827', fontWeight: '700', padding: '16px 32px', borderRadius: '30px', border: '1px solid #111827', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', maxWidth: '350px', width: '100%' }}>
                  Upgrade To MoldMD <span style={{ border: '1px solid #111827', borderRadius: '12px', padding: '2px 6px', fontSize: '12px', verticalAlign: 'middle', marginLeft: '4px' }}>PRO</span>
                </button>
              </div>
              
            </div>
          </div>

          <div className="inner-content">
            {/* THE MATH BEHIND THE UPGRADE */}
            <h3 style={{ fontSize: '22px', fontWeight: '600', textAlign: 'center', marginBottom: '24px', color: '#111827' }}>The Math Behind the Upgrade</h3>
            <div style={{ display: 'grid', gap: '16px', marginBottom: '48px' }} className="math-grid">
              <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Time Value:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', fontSize: '14px', lineHeight: '1.6' }}>
                  <li>+ Hours saved annually: 50+</li>
                  <li>+ Your time value: Priceless</li>
                  <li>+ Electric sprayer pays for itself</li>
                </ul>
              </div>
              <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Prevention Value:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', fontSize: '14px', lineHeight: '1.6' }}>
                  <li>+ Professional treatment: $3,000+</li>
                  <li>+ Minor mold repair: $500+</li>
                  <li>+ MoldMD Pro: $180/year</li>
                  <li style={{ marginTop: '8px', fontWeight: '600', color: '#047857' }}>+ Prevention costs less than one incident</li>
                </ul>
              </div>
              <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Convenience Value:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', fontSize: '14px', lineHeight: '1.6' }}>
                  <li>+ Quarterly vs monthly shipments</li>
                  <li>+ 75% fewer deliveries to manage</li>
                  <li>+ Professional-grade equipment included</li>
                </ul>
              </div>
            </div>

            {/* CUSTOMER PERSPECTIVE */}
            <div style={{ backgroundColor: '#fcfbf7', border: '1px solid #fef3c7', borderRadius: '12px', padding: '32px', textAlign: 'center', marginBottom: '48px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Customer Perspective</h3>
              <div style={{ color: '#fbbf24', fontSize: '20px', marginBottom: '12px' }}>★★★★★</div>
              <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#374151', marginBottom: '16px', maxWidth: '400px', margin: '0 auto' }}>
                "Yes, it costs a bit more than standard, but the time I save and peace of mind? Worth every penny."
              </p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>— David M. <span style={{ color: '#10b981', marginLeft: '4px' }}>✓ Verified Buyer</span></p>
            </div>

            {/* TRANSPARENT PRICING */}
            <h3 style={{ fontSize: '22px', fontWeight: '600', textAlign: 'center', marginBottom: '24px', color: '#111827' }}>Transparent Upgrade Pricing</h3>
            <div style={{ display: 'grid', gap: '16px', marginBottom: '48px' }} className="pricing-grid">
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: '#fff', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#111827' }}>Upgrade: MoldMD Pro</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', fontSize: '14px', lineHeight: '1.8' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}><span style={{ color: '#10b981', marginRight: '8px' }}>✓</span> <div>New price: $15/month<br/><span style={{ fontSize: '13px', color: '#6b7280' }}>(payments debited $45 quarterly)</span></div></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}><span style={{ color: '#10b981', marginRight: '8px' }}>✓</span> <div>Deep-cleaning formula</div></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}><span style={{ color: '#10b981', marginRight: '8px' }}>✓</span> <div>Professional equipment included</div></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#10b981', marginRight: '8px' }}>✓</span> <div>Extended mold control</div></li>
                </ul>
              </div>
              <div style={{ border: '2px solid #fbbf24', borderRadius: '12px', padding: '24px', backgroundColor: '#fffdf5', position: 'relative', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '24px', backgroundColor: '#fbbf24', color: '#000', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase' }}>Special Offer</div>
                <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#92400e', marginTop: '8px' }}>Special Upgrade Offer:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', fontSize: '14px', lineHeight: '1.8' }}>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}><span style={{ color: '#f59e0b', marginRight: '8px', fontSize: '16px' }}>★</span> First quarter: 50% off ($22.50)</li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}><span style={{ color: '#f59e0b', marginRight: '8px', fontSize: '16px' }}>★</span> Try it risk-free for 90 days</li>
                  <li style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: '#f59e0b', marginRight: '8px', fontSize: '16px' }}>★</span> Keep your current spray as backup</li>
                </ul>
              </div>
            </div>

            {/* WHY THE INVESTMENT MAKES SENSE */}
            <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', alignItems: 'center' }} className="hero-flex">
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#111827' }}>Why the Investment Makes Sense</h3>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#4b5563', marginBottom: '16px' }}>For about $0.50/day extra, you get:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', color: '#374151', fontSize: '15px', lineHeight: '1.6' }}>
                  <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#047857', marginRight: '8px', fontWeight: 'bold' }}>+</span> Electric sprayer ($50 value)</li>
                  <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#047857', marginRight: '8px', fontWeight: 'bold' }}>+</span> Deep-cleaning formula included</li>
                  <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#047857', marginRight: '8px', fontWeight: 'bold' }}>+</span> Protective barrier technology</li>
                  <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#047857', marginRight: '8px', fontWeight: 'bold' }}>+</span> 75% less application time</li>
                  <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: '#047857', marginRight: '8px', fontWeight: 'bold' }}>+</span> Quarterly convenience</li>
                </ul>
                <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px', fontSize: '14px', color: '#4b5563', fontStyle: 'italic', borderLeft: '4px solid #9ca3af' }}>
                  Think of it like: "Going from regular gas to premium - your car runs fine on regular, but premium gives better performance and protection."
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d1d5db' }}>
                   <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                     <p>[ Image Placeholder ]</p>
                     <p style={{ fontSize: '13px' }}>Secondary product image</p>
                   </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  <button style={{ backgroundColor: '#fff', color: '#047857', fontWeight: '600', padding: '14px 24px', borderRadius: '30px', border: '2px solid #047857', width: '100%', fontSize: '15px', cursor: 'pointer' }}>
                    Stay with current subscription
                  </button>
                  <button style={{ backgroundColor: '#fbbf24', color: '#000', fontWeight: '600', padding: '14px 24px', borderRadius: '30px', border: 'none', width: '100%', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    Upgrade To MoldMD PRO
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </SharedLayout>
  );
}

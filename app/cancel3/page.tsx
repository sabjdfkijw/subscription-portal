'use client';
import { useState, useEffect } from 'react';

export default function Cancel3() {
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
    window.location.href = '/cancel4'; // Redirect to next step in flow
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
        
        /* HEADLINES */
        .sweeten-headline { text-align: center; font-size: 28px; font-weight: 900; color: #1e3a8a; margin: 0 0 30px 0; line-height: 1.3; }
        
        /* BIG GREEN OFFER BOX */
        .green-offer-box { background-color: #4ade80; border-radius: 8px; padding: 40px 20px; text-align: center; color: white; margin-bottom: 40px; box-shadow: 0 10px 25px -5px rgba(74, 222, 128, 0.4); }
        .final-offer-text { font-size: 15px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 25px; display: flex; flex-direction: column; align-items: center; }
        .final-offer-text::after { content: ''; display: block; width: 300px; height: 1px; background: rgba(255,255,255,0.4); margin-top: 15px; }
        .offer-items-flex { display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 30px; flex-wrap: wrap; }
        .offer-item-left-title { font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
        .pro-badge { background: white; color: #4ade80; font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: 900; line-height: 1; }
        .trial-badge { background: #f59e0b; color: white; font-size: 14px; padding: 4px 30px; border-radius: 4px; font-weight: 800; display: inline-block; }
        .plus-sign { font-size: 24px; font-weight: 400; color: white; margin: 0 10px; }
        .free-badge { background: #ef4444; color: white; font-size: 12px; padding: 2px 12px; border-radius: 4px; font-weight: 800; display: inline-block; margin-bottom: 5px; text-transform: uppercase; }
        .travel-spray-text { font-size: 20px; font-weight: 800; }
        .product-images-container { display: flex; justify-content: center; align-items: flex-end; gap: 20px; margin-bottom: 40px; position: relative; }
        .total-value-text { font-size: 20px; font-weight: 800; margin-bottom: 12px; }
        .strikethrough { text-decoration: line-through; opacity: 0.8; font-weight: 500; }
        .fine-print { font-size: 13px; font-weight: 500; opacity: 0.9; }

        /* WHAT YOU GET SECTION */
        .get-title { text-align: center; font-size: 24px; font-weight: 900; color: #1e293b; margin: 40px 0 30px 0; line-height: 1.2; }
        .get-cards-container { display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap; justify-content: center; }
        .get-card { flex: 1; min-width: 300px; max-width: 380px; padding: 25px; border: 1px solid #f1f5f9; border-radius: 8px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .get-card-header { display: flex; justify-content: center; margin-bottom: 20px; }
        .get-badge-mold { background: #166534; color: white; padding: 6px 15px; border-radius: 20px; font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 6px; }
        .get-badge-travel { background: #166534; color: white; padding: 6px 15px; border-radius: 20px; font-size: 13px; font-weight: 800; }
        .get-list { list-style: none; padding: 0; margin: 0 0 20px 0; font-size: 13px; color: #4b5563; line-height: 2; text-align: left; }
        .get-list li::before { content: '•'; margin-right: 10px; color: #94a3b8; }
        .get-cost-line { font-size: 14px; font-weight: 800; color: #1e293b; border-top: 1px solid #f1f5f9; text-align: center; margin-top: 15px; padding-top: 15px; }

        /* CRYSTAL CLEAR SECTION */
        .clear-box { border: 1px solid #4ade80; border-radius: 12px; padding: 40px 20px; margin-bottom: 40px; background: #fff; position: relative; text-align: center; }
        .clear-title { font-size: 18px; font-weight: 900; color: #1e293b; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; }
        .timeline-section { margin-bottom: 40px; border-bottom: 1px dotted #e2e8f0; padding-bottom: 30px; }
        .timeline-section:last-of-type { border-bottom: none; }
        .timeline-header { font-size: 13px; font-weight: 900; color: #1e293b; margin-bottom: 20px; text-transform: uppercase; text-align: center; }
        .timeline-list { list-style: none; padding: 0; margin: 0; font-size: 14px; color: #4b5563; line-height: 2.2; }
        .timeline-list li { display: flex; align-items: flex-start; justify-content: center; gap: 8px; }
        .check-icon { color: #22c55e; font-weight: 900; }
        .compare-box { background: #eff6ff; padding: 15px; border-radius: 8px; color: #1e3a8a; font-size: 14px; font-weight: 600; text-align: center; }

        /* TRAVEL SPRAY WORTH IT SECTION (FIXED FOR 1:1 MATCH) */
        .worth-it-section { text-align: center; margin-bottom: 50px; }
        .worth-it-title { font-size: 24px; font-weight: 900; color: #1e293b; margin-bottom: 40px; line-height: 1.2; text-transform: uppercase; }
        .crisis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto 30px; align-items: stretch; }
        .crisis-col { padding: 40px 30px; text-align: left; position: relative; display: flex; flex-direction: column; align-items: flex-start; }
        .protection-col { background: #fffde7; border: 1px solid #fef3c7; border-radius: 8px; padding: 32px 24px; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: flex-start; }
        
        .crisis-badge { background: #fdf2f2; border: 1px solid #fecaca; color: #111827; padding: 10px 25px; border-radius: 4px; font-size: 15px; font-weight: 800; margin: 0 auto 30px; width: fit-content; align-self: center; }
        .protection-badge { background: #22c55e; color: white; padding: 10px 25px; border-radius: 4px; font-size: 15px; font-weight: 800; margin: 0 auto 30px; width: fit-content; align-self: center; }
        
        .worth-list { list-style: none; padding: 0; margin: 0; font-size: 14px; color: #333; line-height: 1.6; font-weight: 500; }
        .worth-list li { margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px; }
        .worth-list li::before { content: '•'; color: #111827; font-weight: 900; }

        /* QUICK MATH SECTION */
        .math-section { text-align: center; margin-bottom: 50px; max-width: 900px; margin-left: auto; margin-right: auto; }
        .math-title { font-size: 24px; font-weight: 900; color: #1e293b; margin: 40px 0 30px 0; line-height: 1.2; text-transform: uppercase; }
        .math-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .math-col { padding: 25px; border-radius: 8px; background: #fff; text-align: center; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .math-col.deal { background: #fefce8; border: 1px solid #fef08a; }
        .option-badge { background: #f3f4f6; color: #6b7280; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 800; display: inline-block; margin-bottom: 15px; }
        .option-badge.deal { background: #22c55e; color: white; }
        .math-price { font-size: 26px; font-weight: 900; color: #b91c1c; margin-bottom: 5px; }
        .math-price.deal { color: #111827; }
        .math-subtext { font-size: 13px; color: #6b7280; margin-bottom: 20px; }
        .math-list { list-style: none; padding: 0; margin: 0; font-size: 14px; color: #4b5563; line-height: 2; text-align: left; display: inline-block; }
        .math-list li { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .math-x { color: #ef4444; font-weight: 900; }
        .math-check { color: #22c55e; font-weight: 900; }
        .math-banner { background: #eff6ff; color: #1e3a8a; padding: 15px; border-radius: 8px; font-size: 14px; font-weight: 800; margin-bottom: 30px; max-width: 700px; margin-left: auto; margin-right: auto; }
        
        /* FINAL NOTICE */
        .final-notice { background: #fff1f2; border: 1px dashed #fecaca; padding: 20px; border-radius: 8px; color: #1e293b; font-size: 14px; line-height: 1.5; margin-bottom: 30px; max-width: 700px; margin-left: auto; margin-right: auto; }
        .final-notice b { color: #111827; font-weight: 900; }
        .order-disclaimer { font-size: 11px; color: #9ca3af; line-height: 1.6; max-width: 700px; margin: 0 auto 30px; text-align: center; }

        /* BUTTONS */
        .btn-claim { background: #fde047; color: #111827; border: 1px solid #facc15; padding: 20px 30px; border-radius: 50px; font-size: 16px; font-weight: 800; cursor: pointer; width: 100%; max-width: 450px; margin-bottom: 15px; box-shadow: 0 4px 0 #eab308; line-height: 1.4; display: block; margin-left: auto; margin-right: auto; }
        .btn-stick { background: white; border: 1px solid #e2e8f0; color: #64748b; padding: 12px 30px; border-radius: 50px; font-size: 13px; font-weight: 600; cursor: pointer; width: 100%; max-width: 450px; display: block; margin-left: auto; margin-right: auto; }

        @media (max-width: 600px) {
          .offer-items-flex { flex-direction: column; gap: 10px; }
          .plus-sign { display: none; }
          .product-images-container { flex-direction: column; align-items: center; }
          .get-cards-container, .math-grid { grid-template-columns: 1fr; }
          .sweeten-headline { font-size: 22px; }
          .crisis-grid { grid-template-columns: 1fr; }
          .worth-it-badge-pink, .worth-it-badge-green { width: 100%; }
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

        {/* Sweeten The Deal Headline */}
        <h2 className="sweeten-headline">Wait! Let Me Sweeten The<br/>Deal... I'll Add a FREE $14.99<br/>Travel Mold Spray</h2>

        {/* Big Green Offer Box */}
        <div className="green-offer-box">
          <div className="final-offer-text">FINAL OFFER - EVERYTHING YOU NEED</div>
          
          <div className="offer-items-flex">
            <div className="offer-item-left">
              <div className="offer-item-left-title">Mold Defense <span className="pro-badge">PRO</span></div>
              <div className="trial-badge">Trial</div>
            </div>
            <div className="plus-sign">+</div>
            <div className="offer-item-right">
              <div className="free-badge">Free</div>
              <div className="travel-spray-text">Travel Mold Spray</div>
            </div>
          </div>

          <div className="product-images-container">
            <img src="https://placehold.co/350x250?text=Product+Bundle" alt="Mold Defense Pro" style={{ maxWidth: '60%', borderRadius: '8px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#ef4444', color: 'white', fontSize: '11px', fontWeight: 900, padding: '4px 8px', borderRadius: '4px', zIndex: 10, transform: 'rotate(10deg)' }}>FREE</div>
              <img src="https://placehold.co/80x150?text=Travel+Spray" alt="Free Travel Spray" style={{ maxWidth: '90px', borderRadius: '4px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          <div className="total-value-text">
            Total Value: <span className="strikethrough">$443.99</span> ➔ Just $9.95 to Start
          </div>
          <div className="fine-print">
            (Then $99/year after 14-day trial - Travel spray is yours to keep FREE)
          </div>
        </div>

        {/* WHAT YOU GET SECTION */}
        <h2 className="get-title">Here's EXACTLY<br/>What You Get:</h2>
        <div className="get-cards-container">
          <div className="get-card">
            <div className="get-card-header">
              <div className="get-badge-mold">
                Mold Defense <span style={{ background: 'white', color: '#166534', fontSize: '9px', padding: '1px 5px', borderRadius: '10px', fontWeight: 900 }}>PRO</span>
              </div>
            </div>
            <ul className="get-list">
              <li>4 seasonal concentrates ($280 value)</li>
              <li>Electric sprayer ($89 value)</li>
              <li>Protects from 100+ mold species</li>
              <li>Year-round protection</li>
            </ul>
            <div className="get-cost-line">Your Cost: $9.95 trial, then $99/year</div>
          </div>
          <div className="get-card">
            <div className="get-card-header">
              <div className="get-badge-travel">Travel Mold Spray</div>
            </div>
            <ul className="get-list">
              <li>FREE: Travel Mold Spray</li>
              <li>3.7 oz TSA-approved size</li>
              <li>Cleans mold stains on contact</li>
              <li>Perfect for hotels & Airbnbs</li>
              <li>$14.99 retail value</li>
            </ul>
            <div className="get-cost-line">Your Cost: $0.00 (FREE BONUS)</div>
          </div>
        </div>

        {/* CRYSTAL CLEAR SECTION */}
        <div className="clear-box">
          <h2 className="clear-title">LET ME BE CRYSTAL CLEAR<br/>ABOUT THIS OFFER:</h2>
          <div className="timeline-section">
            <div className="timeline-header">TODAY (Right Now):</div>
            <ul className="timeline-list">
              <li><span className="check-icon">✓</span> Pay just $9.95 for your Mold Defense Pro trial</li>
              <li><span className="check-icon">✓</span> Get FREE Travel Mold Spray ($14.99 value) shipped immediately</li>
              <li><span className="check-icon">✓</span> Cancel your Concentrate subscription (save $32.95/month)</li>
              <li><span className="check-icon">✓</span> Everything ships in 2-3 days</li>
            </ul>
          </div>
          <div className="timeline-section">
            <div className="timeline-header">DAYS 1-14 (Trial Period):</div>
            <ul className="timeline-list">
              <li><span className="check-icon">✓</span> Test Mold Defense Pro risk-free</li>
              <li><span className="check-icon">✓</span> Use your FREE Travel Mold Spray anywhere</li>
              <li><span className="check-icon">✓</span> See results within 48 hours</li>
              <li><span className="check-icon">✓</span> Cancel anytime for full $9.95 refund (keep the travel spray)</li>
            </ul>
          </div>
          <div className="timeline-section">
            <div className="timeline-header">AFTER 14 DAYS:</div>
            <ul className="timeline-list">
              <li><span className="check-icon">✓</span> Charged $99 for your full year of Mold Defense Pro</li>
              <li><span className="check-icon">✓</span> Still 30% less than the $140 public price</li>
              <li><span className="check-icon">✓</span> Protected from 100+ mold species all year</li>
              <li><span className="check-icon">✓</span> Travel Mold Spray is yours to keep forever (no extra charge)</li>
            </ul>
          </div>
          <div className="compare-box">
            <div style={{ marginBottom: '5px' }}>$9.95 today, $99 in 14 days, FREE travel spray bonus</div>
            <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: 400 }}>Compare to Concentrate: $395.40/year for surface-only cleaning (no bonuses)</div>
          </div>
        </div>

        {/* WORTH IT SECTION (IMAGE 221 REPLICA) */}
        <div className="worth-it-section">
          <h2 className="worth-it-title">THE TRAVEL MOLD SPRAY ALONE<br/>MAKES THIS WORTH IT:</h2>
          
          <div className="crisis-grid">
            {/* Box 1: Left Side */}
            <div className="crisis-col">
              <div className="crisis-badge">The Hidden Mold Crisis:</div>
              <ul className="worth-list">
                <li>73% of hotels have had infestations</li>
                <li>$2,000-$5,000 to treat your home if you bring them back</li>
                <li>1 in 4 Americans encounter them while traveling</li>
              </ul>
            </div>

            {/* Box 2: Right Side (Yellowish Background) */}
            <div style={{ flex: 1, backgroundColor: '#fffde7', border: '1px solid #fef3c7', borderRadius: '4px', padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
              <div className="protection-badge">Your Protection:</div>
              <ul className="worth-list">
                <li>Cleans mold stains on contact</li>
                <li>TSA-approved for carry-on</li>
                <li>Safe for family & pets</li>
                <li>Works in hotels, Airbnbs, planes</li>
              </ul>
            </div>
          </div>

          <div style={{ background: '#f3f4f6', height: '300px', borderRadius: '12px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '14px', border: '1px dashed #cbd5e1' }}>
             [ Product / Travel Visual Image Placeholder ]
          </div>

          <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '8px', color: '#1e3a8a', fontSize: '14px', fontWeight: 700, maxWidth: '800px', margin: '0 auto' }}>
            This $14.99 travel spray is FREE only with this offer.<br/>
            <span style={{ fontWeight: 500, fontSize: '13px', opacity: 0.8 }}>Even if you cancel the Pro trial, the travel spray is yours to keep.</span>
          </div>
        </div>

        {/* QUICK MATH SECTION */}
        <div className="math-section">
          <h2 className="math-title">QUICK MATH CHECK:</h2>
          
          <div className="math-grid">
            <div className="math-col">
              <div className="option-badge">Option A: Keep Concentrate</div>
              <div className="math-price">$395.40/year</div>
              <ul className="math-list">
                <li><span className="math-x">✗</span> Surface mold only</li>
                <li><span className="math-x">✗</span> Useless 9 months</li>
                <li><span className="math-x">✗</span> No travel protection</li>
              </ul>
            </div>
            <div className="math-col deal">
              <div className="option-badge deal">Option B: Take This Deal</div>
              <div className="math-price deal">$9.95 today</div>
              <div className="math-subtext">then $99/year after 14 days</div>
              <ul className="math-list">
                <li><span className="math-check">✓</span> 100+ mold species covered</li>
                <li><span className="math-check">✓</span> Year-round protection</li>
                <li><span className="math-check">✓</span> FREE travel spray</li>
              </ul>
            </div>
          </div>

          <div className="math-banner">
            You pay $9.95 today + $99 after trial vs $395.40/year for Concentrate AND get FREE travel spray
          </div>

          <div className="final-notice">
            ⏰ <b>FINAL NOTICE: This bonus expires when you leave this page</b><br/>
            The Travel Mold Spray is ONLY free with this special bundle.<br/>
            If you come back later, you'll pay $14.99 for it separately.
          </div>

          <div className="order-disclaimer">
            By clicking the order button below, I confirm that I have read and agree to the Terms of Use and Privacy Policy. I acknowledge that my subscription will automatically renew at $99 after my 14-day trial and my payment method will be charged according to the Order Summary on this page until I cancel. I understand that I can cancel anytime through my account page or by contacting the support team.
          </div>
          <button className="btn-claim" onClick={handleUpgrade}>
            Yes! Start My $9.95<br/>
            Trial + Send FREE Travel Spray<br/>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>(Then $99/year after 14 days - Travel spray ships FREE today)</span>
          </button>
          <div style={{ marginTop: '20px', paddingBottom: '60px' }}>
            <button className="btn-stick" onClick={handleCancel}>
              No thanks, I'll stick with expensive surface-only protection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

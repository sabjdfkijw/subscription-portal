export default function SharedLayout({ children, onBannerClick }: { children: React.ReactNode, onBannerClick?: () => void }) {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: 'white', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#1d4ed8', color: 'white', padding: '10px', textAlign: 'center', fontSize: '14px', fontWeight: '500' }}>
        Stop Paying Exterminators - Get Professional Pest Control for 70% Less &gt;&gt;
      </div>
      
      <nav style={{ padding: '20px 32px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: '128px' }}>
          <a href="https://moldmd.com" style={{ textDecoration: 'none', color: '#4b5563', fontSize: '15px' }}>Home</a>
        </div>
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
          <img src="/logo.jpg" alt="MoldMD" style={{ height: '40px' }} />
        </div>
        <div style={{ width: '128px' }}></div>
      </nav>
      
      <main style={{ maxWidth: '600px', margin: '48px auto 0', padding: '0 20px' }}>{children}</main>
    </div>
  );
}

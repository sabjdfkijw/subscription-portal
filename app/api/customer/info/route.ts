import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  if (!cookie.includes('portal_session=authenticated')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse cookies
  const cookies: Record<string, string> = {};
  cookie.split(';').forEach(c => {
    const [key, ...val] = c.trim().split('=');
    cookies[key] = decodeURIComponent(val.join('='));
  });

  return NextResponse.json({
    name: cookies['portal_name'] || 'Customer',
    email: cookies['portal_email'] || ''
  });
}

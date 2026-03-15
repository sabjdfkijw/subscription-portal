import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { email, code } = await req.json();

  try {
    const verificationRecord = db.prepare('SELECT * FROM verification_codes WHERE email = ? AND code = ?').get(email.trim(), code);

    if (!verificationRecord) {
      return NextResponse.json({ success: false, error: 'Invalid verification code.' }, { status: 400 });
    }

    const expiresAt = new Date(verificationRecord.expires_at);
    if (expiresAt < new Date()) {
      // Code expired, clean up
      db.prepare('DELETE FROM verification_codes WHERE email = ?').run(email.trim());
      return NextResponse.json({ success: false, error: 'Verification code expired.' }, { status: 400 });
    }

    // Code is valid and not expired
    // Mark email as verified
    db.prepare('INSERT OR IGNORE INTO verified_emails (email) VALUES (?)').run(email.trim());
    // Clean up used verification code
    db.prepare('DELETE FROM verification_codes WHERE email = ?').run(email.trim());

    // For now, let's assume successful verification also means a direct login for seamless flow
    // In a full implementation, this might redirect back to login or set a temporary session for login completion
    // However, since we now expect orderId for full login, this endpoint just verifies the email.
    // The client-side will handle re-attempting login with orderId after this.
    const res = NextResponse.json({ success: true, message: 'Email verified successfully. Please proceed with login using your Order ID.' });
    
    // Note: We don't set full auth cookies here directly for member access, 
    // as the full login with orderId is still required per existing flow.
    // This only marks the *email* as verified.

    return res;
  } catch (err: any) {
    console.error('Email verification error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

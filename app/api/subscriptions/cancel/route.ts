import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,
  { apiVersion: '2026-02-25.clover' } as Stripe.StripeConfig
);

export async function POST(req: Request) {
  try {
    const { subscriptionId } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    return NextResponse.json({ 
      success: true, 
      status: updatedSubscription.status,
      cancel_at_period_end: updatedSubscription.cancel_at_period_end 
    });
  } catch (error: any) {
    console.error('Stripe Cancel Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

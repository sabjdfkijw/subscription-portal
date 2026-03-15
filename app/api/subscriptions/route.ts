import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,
  { apiVersion: '2026-02-25.clover' } as Stripe.StripeConfig
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return NextResponse.json({ subscriptions: [] });
    }

    const customerId = customers.data[0].id;

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      expand: ['data.plan.product'],
    });

    return NextResponse.json({
      customerId,
      subscriptions: subscriptions.data.map((sub: Stripe.Subscription) => {
        const firstItem = sub.items.data[0];
        const plan = firstItem?.plan as any; // Cast plan to any to access properties like product, amount etc.

        return {
          id: sub.id,
          status: sub.status,
          current_period_end: (sub as any).current_period_end, // Still need this cast for now
          cancel_at_period_end: (sub as any).cancel_at_period_end, // Still need this cast for now
          product_name: plan?.product?.name || 'Subscription',
          amount: plan?.amount,
          currency: plan?.currency,
          interval: plan?.interval,
        };
      }),
    });
  } catch (error: any) {
    console.error('Stripe Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

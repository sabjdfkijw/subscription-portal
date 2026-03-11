'use client';
import SharedLayout from '@/components/SharedLayout';

export default function Cancel7() {
  return (
    <SharedLayout >
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Subscription Cancelled</h2>
        <p className="mb-8">We're sorry to see you go. You can restart anytime.</p>
        <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded">Browse Products</a>
      </div>
    </SharedLayout>
  );
}

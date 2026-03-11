'use client';
import SharedLayout from '@/components/SharedLayout';

export default function Cancel3() {
  return (
    <SharedLayout >
      <div className="max-w-2xl mx-auto p-6 border rounded shadow-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Exclusive Upgrade Opportunity</h2>
        <p className="mb-6">Stop 99 other pests before they enter!</p>
        <button className="bg-green-600 text-white px-8 py-3 rounded font-bold mb-4">Start Trial $9.95</button>
        <a href="/cancel6" className="block text-red-600 underline">Continue to Cancellation</a>
      </div>
    </SharedLayout>
  );
}

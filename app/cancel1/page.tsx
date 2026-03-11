'use client';
import SharedLayout from '@/components/SharedLayout';

export default function Cancel1() {
  return (
    <SharedLayout >
      <div className="max-w-2xl mx-auto p-6 bg-white border rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Pause instead?</h2>
        <p className="mb-6">If you pause for a month, your next billing date will change.</p>
        <button className="bg-green-600 text-white w-full py-3 rounded font-bold mb-4">Pause for a month</button>
        <a href="/cancel2" className="block text-center text-red-600 underline">Finalize cancellation</a>
      </div>
    </SharedLayout>
  );
}

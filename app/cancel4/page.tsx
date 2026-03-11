'use client';
import SharedLayout from '@/components/SharedLayout';

export default function Cancel4() {
  return (
    <SharedLayout >
      <div className="max-w-2xl mx-auto p-6 border rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-4">One More Thing...</h2>
        <p className="mb-6">We'll credit your last payment if you try the trial!</p>
        <button className="bg-green-600 text-white w-full py-3 rounded mb-4">Start Trial $9.95</button>
        <a href="/cancel5" className="block text-center text-red-600 underline">No thanks</a>
      </div>
    </SharedLayout>
  );
}

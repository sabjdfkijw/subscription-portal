'use client';
import SharedLayout from '@/components/SharedLayout';

export default function Cancel5() {
  return (
    <SharedLayout >
      <div className="max-w-2xl mx-auto p-6 border rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Wait! Free Bonus!</h2>
        <p className="mb-6">Get a FREE bonus product if you start your trial now.</p>
        <button className="bg-green-600 text-white w-full py-3 rounded mb-4">Get Trial + FREE Bonus</button>
        <a href="/cancel6" className="block text-center text-red-600 underline">No thanks</a>
      </div>
    </SharedLayout>
  );
}

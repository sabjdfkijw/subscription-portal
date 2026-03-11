'use client';
import SharedLayout from '@/components/SharedLayout';

export default function ProfilePage() {
  return (
    <SharedLayout >
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-6 rounded shadow-sm bg-white">
          <h3 className="font-bold mb-4">Billing Address</h3>
          {/* Billing Form Fields */}
          <div className="space-y-4">
            <input type="text" placeholder="First Name" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Last Name" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Address" className="w-full p-2 border rounded" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
        <div className="border p-6 rounded shadow-sm bg-white">
          <h3 className="font-bold mb-4">Shipping Address</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Same as billing
            </label>
            <input type="text" placeholder="Address" className="w-full p-2 border rounded" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}

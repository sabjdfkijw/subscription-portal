'use client';
import SharedLayout from '@/components/SharedLayout';

export default function Cancel2() {
  return (
    <SharedLayout >
      <div className="max-w-2xl mx-auto p-6 border rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Before You Cancel...</h2>
        <p className="mb-6">Help us understand why you're leaving:</p>
        <div className="space-y-2 mb-6">
          {['Season is over', 'Too expensive', 'Didn\'t work', 'Moving'].map(reason => (
            <label key={reason} className="block"><input type="radio" name="reason" className="mr-2"/> {reason}</label>
          ))}
        </div>
        <a href="/cancel3" className="block text-center bg-blue-600 text-white py-3 rounded">Continue</a>
      </div>
    </SharedLayout>
  );
}

'use client';
import SharedLayout from '@/components/SharedLayout';

export default function CancelConfirmPage() {
  return (
    <SharedLayout >
      <div className="max-w-lg mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Are you sure you want to cancel?</h2>
        <p className="mb-8">Your feedback helps us improve.</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-red-600 text-white px-6 py-2 rounded">Confirm Cancellation</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded">Keep Subscription</button>
        </div>
      </div>
    </SharedLayout>
  );
}

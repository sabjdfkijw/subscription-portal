'use client';
import SharedLayout from '@/components/SharedLayout';

export default function UpgradePage() {
  const handleUpgrade = async () => {
    // API logic for upgrade goes here
    alert('Upgrading to PRO PRODUCT...');
  };

  return (
    <SharedLayout >
      {/* 1. Hero Section */}
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold mb-4">Level Up with [PRO PRODUCT NAME]</h2>
        <p className="text-xl text-gray-600 mb-8">Everything you love, PLUS:</p>
        <ul className="text-left inline-block mb-8 space-y-2">
          <li>✓ Prevention Shield: Stops pests before they enter</li>
          <li>✓ Electric Sprayer: Cover your whole home 3x faster</li>
          <li>✓ Extended Protection: 100+ pest species covered</li>
          <li>✓ Quarterly Convenience: Ship less, protect more</li>
        </ul>
        <div className="mt-8">
            <button onClick={handleUpgrade} className="bg-green-600 text-white px-8 py-4 text-lg rounded-full font-bold">
                Upgrade To [PRO PRODUCT]
            </button>
        </div>
      </div>

      {/* 2. Value Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t">
        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-bold text-lg mb-2">Time Value</h3>
          <p>Hours saved annually: 30+</p>
        </div>
        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-bold text-lg mb-2">Prevention Value</h3>
          <p>Professional exterminator: $75–150/month. Save $720+ annually.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white">
          <h3 className="font-bold text-lg mb-2">Convenience</h3>
          <p>75% fewer deliveries to manage.</p>
        </div>
      </div>
    </SharedLayout>
  );
}

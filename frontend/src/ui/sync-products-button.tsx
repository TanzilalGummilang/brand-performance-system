import { useState } from 'react';
import { syncProducts } from '../lib/api';

interface SyncProductsButtonProps {
  onSuccess: () => void;
}

export default function SyncProductsButton({ onSuccess }: SyncProductsButtonProps) {
  const [isSyncing, setIsSyncing] = useState(false);

  async function handleSync() {
    setIsSyncing(true);
    try {
      await syncProducts();
      alert('Sync completed successfully.');
      onSuccess();
    } catch (error) {
      console.error('Sync Error:', error);
      alert('Failed to sync data. Please check your connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={isSyncing}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
        ${isSyncing
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm active:scale-95'
        }`}
    >
      <svg
        className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {isSyncing ? 'Processing...' : 'Synchronize Data'}
    </button>
  );
};

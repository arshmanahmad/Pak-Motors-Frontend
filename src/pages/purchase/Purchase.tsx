import React, { useState } from 'react';
import PurchaseForm from '../../components/PurchaseForm';
import PurchaseList from '../../components/PurchaseList';

const Purchase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');

  return (
    <div className="space-y-6">
      <div>
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'form'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create Purchase
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              View Purchases
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'form' && <PurchaseForm />}
          {activeTab === 'list' && <PurchaseList />}
        </div>
      </div>
    </div>
  );
};

export default Purchase;

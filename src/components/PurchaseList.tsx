import React from 'react';
import { usePurchases } from '../hooks/purchase';

const PurchaseList: React.FC = () => {
  const { data, isLoading, error } = usePurchases();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading purchases...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error loading purchases. Please try again.</div>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No purchases found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Purchase List</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Serial No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Company</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Model</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Registration</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Color</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Created</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900 border-b">{purchase.serialNo}</td>
                <td className="px-4 py-2 text-sm text-gray-900 border-b">{purchase.company}</td>
                <td className="px-4 py-2 text-sm text-gray-900 border-b">{purchase.model}</td>
                <td className="px-4 py-2 text-sm text-gray-900 border-b">{purchase.registration}</td>
                <td className="px-4 py-2 text-sm text-gray-900 border-b">{purchase.color}</td>
                <td className="px-4 py-2 text-sm text-gray-900 border-b">
                  {purchase.purchaseAmount.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900 border-b">
                  <span className={`px-2 py-1 rounded text-xs ${
                    purchase.isNew 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {purchase.isNew ? 'New' : 'Used'}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-900 border-b">
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseList;

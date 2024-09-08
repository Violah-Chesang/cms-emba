import { useState } from "react";
import InventoryItem from "../components/inventory/InventoryItem";
import InventoryTypeManagement from "../components/inventory/InventoryTypeManagement";
import Analytics from "../components/inventory/Analytics";


const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'subtypes' | 'items' | 'typeManagement'>('items');

  return (
    <div className="bg-slate-50 p-4">
      <div>
        <p className="text-2xl font-bold text-blue-900">Inventory Management</p>
      </div>
      <div className="mt-4">
        <Analytics />
      </div>
      <div className="tabs flex border-b border-gray-200">
        <button
          className={`tab-button px-4 py-2 font-medium ${activeTab === 'items' ? 'border-b-2 border-blue-700 text-blue-800 font-bold text-lg' : 'text-gray-700 text-sm'}`}
          onClick={() => setActiveTab('items')}
        >
          All Inventory Items
        </button>
        <button
          className={`tab-button px-4 py-2 font-medium ${activeTab === 'typeManagement' ? 'border-b-2 border-blue-700 text-blue-800 font-bold text-lg' : 'text-gray-700 text-sm'}`}
          onClick={() => setActiveTab('typeManagement')}
        >
          Type Management
        </button>
      </div>
      <div className="tab-content mt-4">
        {activeTab === 'items' && <InventoryItem />}
        {activeTab === 'typeManagement' && <InventoryTypeManagement />}
      </div>
    </div>
  );
};

export default Inventory;
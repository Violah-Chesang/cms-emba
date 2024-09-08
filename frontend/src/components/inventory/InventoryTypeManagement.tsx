import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchTypes, fetchSubtypes } from '../../store/slices/inventorySlice';
import { FaFolderOpen, FaPlus } from 'react-icons/fa';
import { FaFolderClosed } from 'react-icons/fa6';
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import AddTypeFormModal from './TypeAddForm';
import AddSubtypeFormModal from './SubtypeAddForm';

interface InventorySubtype {
  _id: string;
  name: string;
  type: {
    _id: string;
    name: string;
  };
}

const InventoryTypeManagement: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { types, subtypes, loadingTypes, loadingSubtypes, error } = useSelector((state: RootState) => state.inventory);

  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isSubtypeModalOpen, setIsSubtypeModalOpen] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null); // Store selected type ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTypes()).unwrap();
        await dispatch(fetchSubtypes()).unwrap();
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const toggleTypeExpansion = (typeId: string) => {
    setExpandedTypes(prevExpandedTypes => {
      const newExpandedTypes = new Set(prevExpandedTypes);
      if (newExpandedTypes.has(typeId)) {
        newExpandedTypes.delete(typeId);
      } else {
        newExpandedTypes.add(typeId);
      }
      return newExpandedTypes;
    });
  };

  const handleOpenSubtypeModal = (typeId: string) => {
    setSelectedTypeId(typeId); 
    setIsSubtypeModalOpen(true);
  };

  if (loadingTypes || loadingSubtypes) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const typeToSubtypes: Record<string, InventorySubtype[]> = Object.values(subtypes).reduce((acc, subtype) => {
    const typeId = subtype.type._id;
    if (!acc[typeId]) {
      acc[typeId] = [];
    }
    acc[typeId].push(subtype as InventorySubtype);
    return acc;
  }, {} as Record<string, InventorySubtype[]>);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 uppercase">Inventory Types</h2>
        <div className="flex space-x-2">
          <button
            className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => setIsTypeModalOpen(true)}
          >
            <FaPlus className="mr-2" /> Add Type
          </button>
         
        </div>
      </div>

      {Object.values(types).map(type => (
        <div key={type._id} className="mb-4">
          <div className="flex items-center cursor-pointer" onClick={() => toggleTypeExpansion(type._id ?? '')}>
            {expandedTypes.has(type._id ?? '') ? (
              <>
                <IoIosArrowDown className="text-gray-600 mr-2" size={20} />
                <FaFolderOpen className="text-blue-800 mr-2" size={20} />
              </>
            ) : (
              <>
                <IoIosArrowForward className="text-gray-600 mr-2" size={20} />
                <FaFolderClosed className="text-blue-800 mr-2" size={20} />
              </>
            )}
            <span className="text-lg font-normal capitalize">{type.name}</span>
            <button onClick={() => handleOpenSubtypeModal(type._id??"")} className="ml-auto">
              <FaPlus className="text-blue-500 hover:text-blue-700" />
            </button>
          </div>
          {expandedTypes.has(type._id ?? '') && (
            <ul className="ml-6 mt-2">
              {typeToSubtypes[type._id ?? '']?.map((subtype: InventorySubtype) => (
                <li key={subtype._id} className="text-gray-700 capitalize flex items-center gap-2">
                  <VscDebugBreakpointLogUnverified color='black' />
                  {subtype.name}
                </li>
              )) ?? <li className="text-amber-700 capitalize text-sm">No subtypes</li>}
            </ul>
          )}
        </div>
      ))}

      <AddTypeFormModal isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)} />
      {selectedTypeId && (
        <AddSubtypeFormModal
          isOpen={isSubtypeModalOpen}
          selectedTypeId={selectedTypeId}
          onClose={() => setIsSubtypeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default InventoryTypeManagement;

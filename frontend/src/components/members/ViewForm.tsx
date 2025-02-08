import React, { useState, useMemo } from "react";

interface Member {
  _id: string;
  memberId: string;
  firstName: string;
  middleName: string;
  surName: string;
  dob: string;
  phone: string;
  physicalAddress: string;
  nationalId: string;
  
  maritalStatus: string;
  marriageType: string;
  spouseName: string;
  gender: string;
  savedStatus: string;
  baptisedStatus: string;
  otherChurchMembership: string;
  memberType: string;
  ministry: string;
  fellowship: string;
  leadershipRole:string;
  age: number;
  deleted: boolean;
  isActive: string;
  regDate: string;
  notes: string;
  __v: number;
}

interface ViewFormProps {
  viewData: Member;
  onClose: () => void;
}

interface Column {
  accessor: keyof Member;
  header: string;
}

const ViewForm: React.FC<ViewFormProps> = ({ viewData, onClose }) => {
  const [currentTab, setCurrentTab] = useState<'general' | 'contact' | 'church'>('general');

  const columns: { [key: string]: Column[] } = useMemo(() => ({
    general: [
      { accessor: "memberId", header: "Member ID" },
      { accessor: "firstName", header: "First Name" },
      { accessor: "middleName", header: "Middle Name" },
      { accessor: "surName", header: "Surname" },
      { accessor: "dob", header: "Date of Birth" },
      { accessor: "gender", header: "Gender" },
      { accessor: "maritalStatus", header: "Marital Status" },
      { accessor: "marriageType", header: "Marriage Type" },
      { accessor: "spouseName", header: "Spouse Name" },
      { accessor: "nationalId", header: "National ID" },
      { accessor: "age", header: "Age" },
    ],
    contact: [
      { accessor: "phone", header: "Phone" },
      { accessor: "physicalAddress", header: "Physical Address" },
      
    ],
    church: [
      { accessor: "savedStatus", header: "Saved Status" },
      { accessor: "baptisedStatus", header: "Baptised Status" },
      { accessor: "otherChurchMembership", header: "Other Church Membership" },
      { accessor: "memberType", header: "Member Type" },
      { accessor: "ministry", header: "Ministry" },
      { accessor: "fellowship", header: "Fellowship" },
      { accessor: "notes", header: "Notes" },
      { accessor: "leadershipRole", header: "Leadership Role", required: true },

    ],
  }), []);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative h-2/3">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4 bg-blue-950 rounded text-white p-3">View Member</h2>
        <div className="border-b border-gray-300 mb-4 m-5">
          <button
            className={`mr-4 py-2 px-4 rounded-lg ${currentTab === 'general' ? "text-blue-600 border-b-2 border-blue-600 font-bold" : 'text-gray-600'}`}
            onClick={() => setCurrentTab('general')}
          >
            General
          </button>
          <button
            className={`mr-4 py-2 px-4 rounded-lg ${currentTab === 'contact' ? "text-blue-600 border-b-2 border-blue-600 font-bold" : 'text-gray-600'}`}
            onClick={() => setCurrentTab('contact')}
          >
            Contact Info
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${currentTab === 'church' ? "text-blue-600 border-b-2 border-blue-600 font-bold" : 'text-gray-600'}`}
            onClick={() => setCurrentTab('church')}
          >
            Church Info
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
          {columns[currentTab].map((column) => (
            <div key={column.accessor}>
              <label className="block mb-2 font-bold">{column.header}</label>
              <input
                type="text"
                name={column.accessor}
                value={String(viewData[column.accessor] ?? "")}
                readOnly
                className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewForm;

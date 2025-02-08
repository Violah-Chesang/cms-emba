import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMember } from "../../store/slices/memberSlice";
import { AppDispatch } from "../../store/store";
import option from "../../assets/dropdown";

interface Member {
  _id: string;
  memberId: string;
  firstName: string;
  middleName: string;
  surName: string;
  dob: string;
  phone: string;
  email: string;
  physicalAddress: string;
  nationalId: string;
 
  maritalStatus: string;
  marriageType: string;
  marriageCeremonyType: string;
  spouseName: string;
  gender: string;
  savedStatus: string;
  baptisedStatus: string;
  confirmationStatus: string;
  otherChurchMembership: string;
  memberType: string;
  ministry: string;
  fellowship: string;
  age: number;
  leadershipRole:string;
  deleted: boolean;
  isActive: string;
  regDate: string;
  notes: string;
  __v: number;
}

interface Column {
  accessor: keyof Member;
  header: string;
  required: boolean;
}

interface EditFormProps {
  editData: Member;
  onSave: (data: Member) => void;
  onCancel: () => void;
}

const renderDropdown = (
  accessor: keyof Member,
  header: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
) => {
  const options: { [key: string]: string[] } = option;
  return (
    <select
      name={accessor}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
    >
      <option value="">Select {header}</option>
      {options[accessor]?.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

const EditForm: React.FC<EditFormProps> = ({ editData, onSave, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Member>(editData);
  const [errors, setErrors] = useState<Partial<Record<keyof Member, string>>>({});
  const [currentTab, setCurrentTab] = useState<'general' | 'contact' | 'church'>('general');

  const columns: { [key: string]: Column[] } = {
    general: [
      { accessor: "firstName", header: "First Name", required: true },
      { accessor: "middleName", header: "Middle Name", required: true },
      { accessor: "surName", header: "Surname", required: false },
      { accessor: "dob", header: "Date of Birth", required: true },
      { accessor: "gender", header: "Gender", required: true },
      { accessor: "maritalStatus", header: "Marital Status", required: true },
      { accessor: "marriageType", header: "Marriage Type", required: true },
      { accessor: "marriageCeremonyType", header: "Marriage Ceremony Type", required: false },

      { accessor: "spouseName", header: "Spouse Name", required: false },
      { accessor: "nationalId", header: "National ID", required: false },
      { accessor: "age", header: "Age", required: false },

    ],
    contact: [
      { accessor: "phone", header: "Phone", required: false },
      { accessor: "physicalAddress", header: "Place of Residence", required: false },
      { accessor: "email", header: "Email", required: false },
     
    ],
    church: [
      { accessor: "savedStatus", header: "Saved Status", required: true },
      { accessor: "baptisedStatus", header: "Baptised Status", required: true },
      { accessor: "confirmationStatus", header: "Confirmation Status", required: false },
      { accessor: "otherChurchMembership", header: "Other Church Membership", required: true },
      { accessor: "memberType", header: "Member Type", required: true },
      { accessor: "ministry", header: "Ministry", required: false },
      { accessor: "fellowship", header: "Fellowship", required: false },
      { accessor: "notes", header: "Notes", required: false },
      { accessor: "leadershipRole", header: "Leadership Role", required: true },

    ],
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Member, string>> = {};

    if (!/^\d{8}$/.test(formData.nationalId)) {
      newErrors.nationalId = "National ID must be exactly 8 digits.";
    }

    if (!/^\d{10,13}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be between 10 and 13 digits.";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    columns[currentTab].forEach((column) => {
      if (column.required && !formData[column.accessor]) {
        newErrors[column.accessor] = `${column.header} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      try {
        const { _id } = formData;
        await dispatch(updateMember({ _id, updatedMember: formData }));
        onSave(formData);
      } catch (error: any) {
        console.error("Error updating member:", error);
        if (error.response && error.response.status === 404) {
          alert("Member not found. Please verify the member ID.");
        } else {
          alert("Failed to update member. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          onClick={onCancel}
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
        <h2 className="text-xl font-semibold mb-4 bg-blue-950 p-3 text-white rounded">Edit Member</h2>
        <div className="border-b border-gray-300 mb-4 m-5">
          <button
            className={` mr-8 py-2 px-4 rounded-lg ${currentTab === 'general' ? "text-blue-600 border-b-2 border-blue-600 font-bold text-md" : 'text-gray-600'}`}
            onClick={() => setCurrentTab('general')}
          >
            General
          </button>
          <button
            className={`mr-8 py-2 px-4 rounded-lg ${currentTab === 'contact' ? "text-blue-600 border-b-2 border-blue-600 font-bold text-md" : ' text-gray-600'}`}
            onClick={() => setCurrentTab('contact')}
          >
            Contact Info
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${currentTab === 'church' ? "text-blue-600 border-b-2 border-blue-600 font-bold text-md" : 'text-gray-600'}`}
            onClick={() => setCurrentTab('church')}
          >
            Church Info
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {columns[currentTab].map((column) => (
              <div key={column.accessor}>
                <label className="block mb-2 font-bold">{column.header}</label>
                {["fellowship", "ministry", "cellGroup", "status", "baptisedStatus", "maritalStatus", "gender", "marriageType", "savedStatus", "otherChurchMembership", "memberType", "leadershipRole", "confirmationStatus", "marriageCeremonyType"].includes(column.accessor) ? (
                  renderDropdown(
                    column.accessor,
                    column.header,
                    String(formData[column.accessor]),
                    handleInputChange
                  )
                ) : column.accessor === "dob" ? (
                  <input
                    type="date"
                    name={column.accessor}
                    value={String(formData[column.accessor])}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                ) : (
                  <input
                    type="text"
                    name={column.accessor}
                    value={String(formData[column.accessor])}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                )}
                {errors[column.accessor] && (
                  <p className="text-red-500 text-sm mt-1">{errors[column.accessor]}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;

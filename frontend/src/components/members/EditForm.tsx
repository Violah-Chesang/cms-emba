import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMember } from "../../store/slices/memberSlice";
import { AppDispatch } from "../../store/store";

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
  motherPhone: string;
  fatherName: string;
  motherName: string;
  maritalStatus: string;
  marriageType: string;
  spouseName: string;
  gender: string;
  occupation: string;
  savedStatus: string;
  baptisedStatus: string;
  otherChurchMembership: string;
  memberType: string;
  cellGroup: string;
  ministry: string;
  fellowship: string;
  age: number;
  deleted: boolean;
  isActive: string;
  regDate: string;
  notes: string;
  __v: number;
}

interface EditFormProps {
  editData: Member;
  onSave: (data: Member) => void;
  onCancel: () => void;
  renderFilterDropdown: (
    name: string,
    label: string,
    value: string,
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  ) => React.ReactNode;
}

interface Column {
  accessor: keyof Member;
  header: string;
  required: boolean;
}

const EditForm: React.FC<EditFormProps> = ({ editData, onSave, onCancel, renderFilterDropdown }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Member>(editData);
  const [errors, setErrors] = useState<Partial<Record<keyof Member, string>>>({});
  const [currentPage, setCurrentPage] = useState(0);

  const columns: Column[] = [
    { accessor: "firstName", header: "First Name", required: true },
    { accessor: "middleName", header: "Middle Name", required: true },
    { accessor: "surName", header: "Surname", required: false },
    { accessor: "dob", header: "Date of Birth", required: true },
    { accessor: "phone", header: "Phone", required: false },
    { accessor: "physicalAddress", header: "Physical Address", required: false },
    { accessor: "nationalId", header: "National ID", required: false },
    { accessor: "motherPhone", header: "Mother's Phone", required: false },
    { accessor: "fatherName", header: "Father's Name", required: false },
    { accessor: "motherName", header: "Mother's Name", required: false },
    { accessor: "maritalStatus", header: "Marital Status", required: true },
    { accessor: "marriageType", header: "Marriage Type", required: true },
    { accessor: "spouseName", header: "Spouse Name", required: false },
    { accessor: "gender", header: "Gender", required: true },
    { accessor: "occupation", header: "Occupation", required: false },
    { accessor: "savedStatus", header: "Saved Status", required: true },
    { accessor: "baptisedStatus", header: "Baptised Status", required: true },
    { accessor: "otherChurchMembership", header: "Other Church Membership", required: true },
    { accessor: "memberType", header: "Member Type", required: true },
    { accessor: "cellGroup", header: "Cell Group", required: false },
    { accessor: "ministry", header: "Ministry", required: false },
    { accessor: "fellowship", header: "Fellowship", required: false },
    { accessor: "notes", header: "Notes", required: false },
  ];

  const pageCount = 12;
  const pageColumns = [];
  for (let i = 0; i < columns.length; i += pageCount) {
    pageColumns.push(columns.slice(i, i + pageCount));
  }

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

    columns.forEach((column) => {
      if (column.required && !formData[column.accessor]) {
        newErrors[column.accessor] = `${column.header} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentPage < pageColumns.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
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
      <div className="bg-white p-5 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          onClick={onCancel}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pageColumns[currentPage].map((column) => (
              <div key={column.accessor}>
                <label className="block mb-2">{column.header}</label>
                {["fellowship", "ministry", "cellGroup", "status", "baptisedStatus", "maritalStatus", "gender", "marriageType", "savedStatus", "otherChurchMembership", "memberType"].includes(column.accessor) ? (
                  renderFilterDropdown(
                    column.accessor,
                    column.header,
                    String(formData[column.accessor]),
                    handleInputChange
                  )
                ) : column.accessor === "dob" ? (
                  <input
                    type="date"
                    name={column.accessor}
                    value={String(formData[column.accessor])} // Ensure string
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                ) : (
                  <input
                    type="text"
                    name={column.accessor}
                    value={String(formData[column.accessor])} // Ensure string conversion
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                )}
                {errors[column.accessor] && (
                  <div className="text-red-500 text-sm">{errors[column.accessor]}</div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between space-x-4 mt-4">
            {currentPage > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Back
              </button>
            )}
            {currentPage < pageColumns.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            )}
            {currentPage === pageColumns.length - 1 && (
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;

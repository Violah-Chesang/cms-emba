import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMember } from "../../../store/slice/memberSlice";

const EditForm = ({ editData, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(() => {
    if (editData) {
      return {
        _id: editData._id || "",
        memberId: editData.memberId || "",
        firstName: editData.firstName || "",
        middleName: editData.middleName || "",
        surName: editData.surName || "",
        dob: editData.dob || "",
        phone: editData.phone || "",
        physicalAddress: editData.physicalAddress || "",
        nationalId: editData.nationalId || "",
        motherPhone: editData.motherPhone || "",
        fatherName: editData.fatherName || "",
        motherName: editData.motherName || "",
        maritalStatus: editData.maritalStatus || "",
        marriageType: editData.marriageType || "",
        spouseName: editData.spouseName || "",
        gender: editData.gender || "",
        occupation: editData.occupation || "",
        savedStatus: editData.savedStatus || "",
        baptisedStatus: editData.baptisedStatus || "",
        otherChurchMembership: editData.otherChurchMembership || "",
        memberType: editData.memberType || "",
        cellGroup: editData.cellGroup || "",
        ministry: editData.ministry || "",
        fellowship: editData.fellowship || "",
        age: editData.age || "",
        notes: editData.notes || "",
      };
    } else {
      return {};
    }
  });

  const [currentPage, setCurrentPage] = useState(0); // Define currentPage state

  const columns = [
    { accessor: "_id", header: "ID" },
    { accessor: "memberId", header: "Member ID" },
    { accessor: "firstName", header: "First Name" },
    { accessor: "middleName", header: "Middle Name" },
    { accessor: "surName", header: "Surname" },
    { accessor: "dob", header: "Date of Birth" },
    { accessor: "phone", header: "Phone" },
    { accessor: "physicalAddress", header: "Physical Address" },
    { accessor: "nationalId", header: "National ID" },
    { accessor: "motherPhone", header: "Mother's Phone" },
    { accessor: "fatherName", header: "Father's Name" },
    { accessor: "motherName", header: "Mother's Name" },
    { accessor: "maritalStatus", header: "Marital Status" },
    { accessor: "marriageType", header: "Marriage Type" },
    { accessor: "spouseName", header: "Spouse Name" },
    { accessor: "gender", header: "Gender" },
    { accessor: "occupation", header: "Occupation" },
    { accessor: "savedStatus", header: "Saved Status" },
    { accessor: "baptisedStatus", header: "Baptised Status" },
    { accessor: "otherChurchMembership", header: "Other Church Membership" },
    { accessor: "memberType", header: "Member Type" },
    { accessor: "cellGroup", header: "Cell Group" },
    { accessor: "ministry", header: "Ministry" },
    { accessor: "fellowship", header: "Fellowship" },
    { accessor: "age", header: "Age" },
    { accessor: "notes", header: "Notes" },
  ];

  const pageCount = 10;
  const pageColumns = [];
  for (let i = 0; i < columns.length; i += pageCount) {
    pageColumns.push(columns.slice(i, i + pageCount));
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { _id } = formData; // Assuming _id is part of formData or editData
      await dispatch(updateMember({ _id: _id, updatedMember: formData }));
  
      onSave(formData);
    } catch (error) {
      console.error("Error updating member:", error);
      if (error.response && error.response.status === 404) {
        alert("Member not found. Please verify the member ID.");
      } else {
        alert("Failed to update member. Please try again later.");
      }
    }
  };
  
  

  const handleCancel = () => {
    onCancel();
  };

  if (!editData) {
    return null; // or loading indicator if needed
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          onClick={handleCancel}
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
                <input
                  type="text"
                  name={column.accessor}
                  value={formData[column.accessor]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
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

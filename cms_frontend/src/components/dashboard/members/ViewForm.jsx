import React, { useState, useEffect } from "react";

function ViewForm({ data, onClose }) {
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const columns = [
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

  const pageCount = 25;
  const pageColumns = [];
  for (let i = 0; i < columns.length; i += pageCount) {
    pageColumns.push(columns.slice(i, i + pageCount));
  }

  useEffect(() => {
    const initialFormData = {};
    columns.forEach((column) => {
      initialFormData[column.accessor] = data ? data[column.accessor] : "";
    });
    setFormData(initialFormData);
  }, [data]);

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

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">View Member</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {pageColumns[currentPage].map((column) => (
            <div key={column.accessor}>
              <label className="block mb-2">{column.header}</label>
              <input
                type="text"
                name={column.accessor}
                value={formData[column.accessor]}
                readOnly
                className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
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
        </div>
      </div>
    </div>
  );
}

export default ViewForm;

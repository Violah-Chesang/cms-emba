import React, { useState, useEffect, useMemo } from "react";

function ViewForm({ viewData, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);

  const [formData, setFormData] = useState({});

  const columns = useMemo(
    () => [
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
    ],
    []
  );

  const pageCount = 25;
  const pageColumns = useMemo(() => {
    const pages = [];
    for (let i = 0; i < columns.length; i += pageCount) {
      pages.push(columns.slice(i, i + pageCount));
    }
    return pages;
  }, [columns]);

  useEffect(() => {
    // Initialize form data when viewData changes
    if (viewData) {
      const initialFormData = {};
      columns.forEach((column) => {
        initialFormData[column.accessor] = viewData[column.accessor] || "";
      });
      setFormData(initialFormData);
    }
  }, [viewData, columns]);

  const handleClose = () => {
    onClose(); // Ensure that onClose is correctly called to close the modal
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                value={viewData[column.accessor] || ""}
                readOnly
                className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewForm;

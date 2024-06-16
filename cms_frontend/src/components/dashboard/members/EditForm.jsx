import React, { useState, useEffect } from "react";
import axios from "axios";

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

const dropdownOptions = {
  maritalStatus: ["","single", "married", "divorced", "widowed"],
  marriageType: ["","monogamous", "polygamous"],
  gender: ["","male", "female", "other"],
  savedStatus: ["","saved", "unsaved"],
  baptisedStatus: ["","baptised", "not baptised"],
  otherChurchMembership: ["","yes", "no"],
  memberType: ["","fullMember", "associateMember", "visitor"],
  cellGroup: [
    "",
    "Nyayo Embakasi",
    "Embakasi Village",
    "Utawala/Joska",
    "Fedha/Mradi",
    "Syokimau",
    "Diaspora",
  ],
  ministry: [
    "",
    "PraiseAndWorship",
    "Intercessory",
    "AwesomeMelodies",
    "Hospitality",
    "Ushering",
    "SacramentStewards",
    "Leader",
  ],
  fellowship: ["","Youth", "Women", "Men", "JSS"],
};

const pageCount = 10;
const pageColumns = [];
for (let i = 0; i < columns.length; i += pageCount) {
  pageColumns.push(columns.slice(i, i + pageCount));
}

function EditForm({ data, onClose }) {
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const initialFormData = {};
    columns.forEach((column) => {
      initialFormData[column.accessor] = data ? data[column.accessor] : "";
    });
    setFormData(initialFormData);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentPage === pageColumns.length - 1) {
     
      try {
        if (data) {
          // Update existing member
          const response = await axios.put(
            `http://localhost:5500/member/update/${data.memberId}`,
            JSON.stringify(formData), 
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Update member response:", response.data);
          
        } else {
          console.log(JSON.stringify(formData));
          // Add new member (if needed)
          const response = await axios.post(
            `http://localhost:5500/member/add`,
            JSON.stringify(formData), // Convert formData to JSON string
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Add new member response:", response.data);
          
        }
        onClose();
      } catch (error) {
        console.error("Error updating member:", error);
        // Handle error state or show error message
      }
    }
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

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
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
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          {data ? "Edit Current Member" : "Add New Member"}
        </h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageColumns[currentPage].map((column) => (
              <div key={column.accessor}>
                <label className="block mb-2">{column.header}</label>
                {dropdownOptions[column.accessor] ? (
                  <select
                    name={column.accessor}
                    value={formData[column.accessor]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  >
                    {dropdownOptions[column.accessor].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={column.accessor}
                    value={formData[column.accessor]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
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
             type="button" 
             onClick={handleSubmit}
             className="bg-blue-500 text-white px-4 py-2 rounded-lg"
           >
             {data ? "Save Changes" : "Add Member"}
           </button>
           
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;

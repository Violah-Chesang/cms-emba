import React, { useState } from "react";

const AddForm = ({ onSave, onCancel, renderFilterDropdown }) => {
  const [currentPage, setCurrentPage] = useState(0); // State to track current page
  const [formData, setFormData] = useState({
    _id: "",
    memberId: "",
    firstName: "",
    middleName: "",
    surName: "",
    dob: "",
    phone: "",
    physicalAddress: "",
    nationalId: "",
    motherPhone: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    marriageType: "",
    spouseName: "",
    gender: "",
    occupation: "",
    savedStatus: "",
    baptisedStatus: "",
    otherChurchMembership: "",
    memberType: "",
    cellGroup: "",
    ministry: "",
    fellowship: "",
    age: "",
    notes: "",
  });

  const fieldsPerPage = 12; // Number of fields per

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(fields.length / fieldsPerPage);

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
        <h2 className="text-xl font-semibold mb-4">Add Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {fields.slice(currentPage * fieldsPerPage, (currentPage + 1) * fieldsPerPage).map((field) => (
              <div key={field.accessor}>
                <label className="block mb-2">{field.header}</label>
                {field.accessor === "fellowship" ||
                field.accessor === "ministry" ||
                field.accessor === "cellGroup" ||
                field.accessor === "status" ||
                field.accessor === "maritalStatus" ||
                field.accessor === "gender" ||
                field.accessor === "marriageType" ||
                field.accessor === "savedStatus" ||
                field.accessor === "otherChurchMembership" ||
                field.accessor === "memberType" ||
                field.accessor === "baptisedStatus" ? (
                  renderFilterDropdown(field.accessor, field.header, options[field.accessor], handleInputChange)
                ) : (
                  <input
                    type="text"
                    name={field.accessor}
                    value={formData[field.accessor]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`bg-gray-500 text-white px-4 py-2 rounded-lg ${currentPage === 0 ? 'cursor-not-allowed' : 'hover:bg-gray-600'}`}
            >
              Previous
            </button>
            <div>
              Page {currentPage + 1} of {totalPages}
            </div>
            <button
              type="button"
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${currentPage === totalPages - 1 ? 'cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              Next
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const fields = [
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

const options = {
  fellowship: [
    " ",
    "Youth",
    "Women",
    "Men",
    "JSS",
  ],
  ministry: [
    " ",
    "praise&Worship",
    "Intercessory",
    "AwesomeMelodies",
    "Hospitality",
    "ushering",
    "SacramentStewards",
    "Choir",
    "Csr",
    "missions&Evangelism",
    "Leader",
  ],
  cellGroup: [
    " ",
    "Nyayo Embakasi",
    "Embakasi Village",
    "Utawala/Joska",
    "Fedha/Mradi",
    "Syokimau",
    "Diaspora",
  ],
  status: [
    " ",
    "active",
    "inactive",
  ],
  baptisedStatus: [
    " ",
    "baptised",
    "Not Baptised",
  ],
  maritalStatus:[
    " ",
    "Married",
    "Single",
    "Divorced",
    "Widowed"
  ],
  gender:[
    " ",
    "Male",
    "Female"
  ],
  marriageType:[
    " ",
    "none",
    "monogamous",
    "polygamous"
  ],
  savedStatus:[
    " ",
    "saved",
    "not saved"
  ],
  otherChurchMembership:[
    " ",
    "Yes",
    "No"
  ],
  memberType:[
    " ",
    "full member",
    "associate"
  ]
};

export default AddForm;

import React, { useState } from "react";
import option from '../../assets/dropdown';

interface FormData {
  _id: string;
  memberId: string;
  firstName: string;
  middleName: string;
  surName: string;
  email: string;
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
  age: string;
  notes: string;
  regDate: string;
  __v: number;
  
}

interface Field {
  accessor: keyof FormData;
  header: string;
  required: boolean;
}

interface AddFormProps {
  onSave: (data: FormData) => void;
  onCancel: () => void;
  renderFilterDropdown: (
    name: string,
    label: string,
    options: string[],
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    required: boolean
  ) => React.ReactNode;
}

const AddForm: React.FC<AddFormProps> = ({ onSave, onCancel, renderFilterDropdown }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    _id: "",
    memberId: "",
    firstName: "",
    middleName: "",
    surName: "",
    dob: "",
    email:"",
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
    regDate:"",
    __v:0
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const fieldsPerPage = 8;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!/^\d{8}$/.test(formData.nationalId)) {
      newErrors.nationalId = "National ID must be exactly 8 digits.";
    }

    if (!/^\d{10,13}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be between 10 and 13 digits.";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    fields.forEach((field) => {
      if (field.required && !formData[field.accessor]) {
        newErrors[field.accessor] = `${field.header} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      onSave(formData);
    }
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {fields
              .slice(
                currentPage * fieldsPerPage,
                (currentPage + 1) * fieldsPerPage
              )
              .map((field) => (
                <div key={field.accessor}>
                  {shouldRenderDropdown(field.accessor) ? (
                    <div>
                      <label className="block mb-2">
                        {field.header}
                        <span className="text-red-500">*</span>
                      </label>
                      {renderFilterDropdown(
                        field.accessor,
                        field.header,
                        options[field.accessor],
                        handleInputChange,
                        true
                      )}
                      {errors[field.accessor] && (
                        <span className="text-red-500 text-sm">
                          {errors[field.accessor]}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block mb-2">
                        {field.header}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      {field.accessor === "dob" ? (
                        <input
                          type="date"
                          name={field.accessor}
                          value={formData[field.accessor]}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                          required={field.required}
                        />
                      ) : (
                        <input
                          type={field.accessor === "nationalId" || field.accessor === "phone" ? "number" : "text"}
                          name={field.accessor}
                          value={formData[field.accessor]}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                          required={field.required}
                          minLength={field.accessor === "phone" ? 10 : undefined}
                          maxLength={field.accessor === "phone" ? 13 : undefined}
                          min={field.accessor === "nationalId" ? "10000000" : undefined}
                          max={field.accessor === "nationalId" ? "99999999" : undefined}
                        />
                      )}
                      {errors[field.accessor] && (
                        <span className="text-red-500 text-sm">
                          {errors[field.accessor]}
                        </span>
                      )}

                        {field.accessor === "email" ? (
                          <input
                            type="email"
                            name={field.accessor}
                            value={formData[field.accessor]}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                            required={field.required}
                          />
                        ):""}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`bg-gray-500 text-white px-4 py-2 rounded-lg ${currentPage === 0 ? "cursor-not-allowed" : "hover:bg-gray-600"
                }`}
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
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${currentPage === totalPages - 1
                  ? "cursor-not-allowed"
                  : "hover:bg-blue-600"
                }`}
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

const fields: Field[] = [
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
  { accessor: "age", header: "Age", required: false },
  { accessor: "notes", header: "Notes", required: false },
];

const options: Record<string, string[]> = option;

const shouldRenderDropdown = (accessor: keyof FormData): boolean => {
  return [
    "fellowship",
    "ministry",
    "cellGroup",
    "status",
    "maritalStatus",
    "gender",
    "marriageType",
    "savedStatus",
    "otherChurchMembership",
    "memberType",
    "baptisedStatus"
  ].includes(accessor);
};

export default AddForm;

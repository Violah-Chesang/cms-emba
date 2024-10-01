import React, { useState } from "react";
import options from "../../assets/dropdown";

const fields: Field[] = [
  { accessor: "firstName", header: "First Name", required: true },
  { accessor: "middleName", header: "Middle Name", required: false },
  { accessor: "surName", header: "Surname", required: true },
  { accessor: "dob", header: "Date of Birth", required: true },
  { accessor: "gender", header: "Gender", required: true },
  { accessor: "age", header: "Age", required: true },
  { accessor: "nationalId", header: "National ID", required: true },
  { accessor: "phone", header: "Phone", required: true },
  { accessor: "email", header: "Email", required: true },
  { accessor: "maritalStatus", header: "Marital Status", required: true },
  { accessor: "marriageType", header: "Marriage Type", required: true },
  { accessor: "spouseName", header: "Spouse Name", required: false },
  { accessor: "physicalAddress", header: "Physical Address", required: true },
  { accessor: "occupation", header: "Occupation", required: true },
  { accessor: "motherPhone", header: "Mother's Phone", required: false },
  { accessor: "fatherName", header: "Father's Name", required: false },
  { accessor: "motherName", header: "Mother's Name", required: false },
  { accessor: "savedStatus", header: "Saved Status", required: true },
  { accessor: "baptisedStatus", header: "Baptized Status", required: true },
  { accessor: "otherChurchMembership", header: "Other Church Membership", required: true },
  { accessor: "memberType", header: "Member Type", required: true },
  { accessor: "cellGroup", header: "Cell Group", required: false },
  { accessor: "leadershipRole", header: "Leadership Role", required: true },
  { accessor: "ministry", header: "Ministry", required: true },
  { accessor: "fellowship", header: "Fellowship", required: true },
  { accessor: "notes", header: "Notes", required: false },
];

interface FormData {
  memberId: string;
  firstName: string;
  middleName: string;
  surName: string;
  dob: string;
  email: string;
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
  leadershipRole: string;
  isActive: string;
  regDate: string;
  notes: string;
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
  const [activeTab, setActiveTab] = useState("General");
  const [formData, setFormData] = useState<FormData>({
    memberId: "",
    firstName: "",
    middleName: "",
    surName: "",
    dob: "",
    email: "",
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
    age: 0,
    notes: "",
    regDate: "",
    leadershipRole: "",
    deleted: false,
    isActive: "true",
    __v: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Function to calculate age from dob
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === "dob") {
        updatedFormData.age = calculateAge(value);
      }

      return updatedFormData;
    });
  };
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

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

    // // Log any validation errors found
    // if (Object.keys(newErrors).length > 0) {
    //   console.log("Validation failed with errors:", newErrors);
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submitted')
    event.preventDefault();
    if (validate()) {
      onSave(formData);
      console.log(formData)

    }
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  const tabContent = () => {
    switch (activeTab) {
      case "General":
        return fields
          .filter((field) => ["firstName", "middleName", "surName", "dob", "gender", "nationalId", "maritalStatus", "marriageType","spouseName","occupation"].includes(field.accessor))
          .map((field) => renderField(field));
      case "Contact Info":
        return fields
          .filter((field) => ["phone", "email", "physicalAddress", "motherPhone", "fatherName", "motherName"].includes(field.accessor))
          .map((field) => renderField(field));
      case "Church Info":
        return fields
          .filter((field) => ["savedStatus", "baptisedStatus", "otherChurchMembership", "memberType", "fellowship", "ministry", "cellGroup", "notes", "leadershipRole"].includes(field.accessor))
          .map((field) => renderField(field));

      default:
        return null;
    }
  };

  const shouldRenderDropdown = (accessor: keyof FormData): boolean => {
    const dropdownFields: (keyof FormData)[] = ["gender", "savedStatus", "baptisedStatus", "memberType", "fellowship", "ministry", "cellGroup", "otherChurchMembership", "marriageType", "maritalStatus", "leadershipRole"];
    return dropdownFields.includes(accessor);
  };

  // const renderField = (field: Field) => (
  //   <div key={field.accessor}>
  //     {shouldRenderDropdown(field.accessor) ? (
  //       <div>
  //         <label className="block mb-2 font-bold">
  //           {field.header}
  //           <span className="text-red-500">*</span>
  //         </label>
  //         {field.accessor in options ? (
  //           renderFilterDropdown(
  //             field.accessor,
  //             "",
  //             options[field.accessor as keyof typeof options],
  //             handleInputChange,
  //             true
  //           )
  //         ) : (
  //           <span>No options available</span>
  //         )}
  //         {errors[field.accessor] && (
  //           <span className="text-red-500 text-sm">
  //             {errors[field.accessor]}
  //           </span>
  //         )}
  //       </div>
  //     ) : (
  //       <div>
  //         <label className="block mb-2 font-bold">
  //           {field.header}
  //           {field.required && <span className="text-red-500">*</span>}
  //         </label>
  //         <input
  //           type={field.accessor === "dob" ? "date" : "text"}
  //           name={field.accessor}
  //           value={formData[field.accessor] as string}
  //           onChange={handleInputChange}
  //           className="w-full border border-gray-300 px-4 py-2 rounded-md"
  //           required={field.required}
  //         />
  //         {errors[field.accessor] && (
  //           <span className="text-red-500 text-sm">
  //             {errors[field.accessor]}
  //           </span>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );

  const renderField = (field: Field) => (
    <div key={field.accessor}>
      {field.accessor === "ministry" ? (
        <div>
          <label className="block mb-2 font-bold">
            {field.header}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            name={field.accessor}
            value={formData[field.accessor] as string}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required={field.required}
          />
          {errors[field.accessor] && (
            <span className="text-red-500 text-sm">
              {errors[field.accessor]}
            </span>
          )}
        </div>
      ) : shouldRenderDropdown(field.accessor) ? (
        <div>
          <label className="block mb-2 font-bold">
            {field.header}
            <span className="text-red-500">*</span>
          </label>
          {field.accessor in options ? (
            renderFilterDropdown(
              field.accessor,
              "",
              options[field.accessor as keyof typeof options],
              handleInputChange,
              true
            )
          ) : (
            <span>No options available</span>
          )}
          {errors[field.accessor] && (
            <span className="text-red-500 text-sm">
              {errors[field.accessor]}
            </span>
          )}
        </div>
      ) : (
        <div>
          <label className="block mb-2 font-bold">
            {field.header}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type={field.accessor === "dob" ? "date" : "text"}
            name={field.accessor}
            value={formData[field.accessor] as string}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required={field.required}
          />
          {errors[field.accessor] && (
            <span className="text-red-500 text-sm">
              {errors[field.accessor]}
            </span>
          )}
        </div>
      )}
    </div>
  );


  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
        <div className="flex justify-between items-center bg-blue-950 text-white p-3 uppercase rounded">
          <h2 className="text-md font-semibold">Add New Member</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="border-b border-gray-300 mb-4">
            <button
              onClick={() => switchTab("General")}
              className={`mr-8 py-2 px-4 rounded-lg ${activeTab === "General" ? "text-blue-600 border-b-2 border-blue-600 font-bold text-md" : "text-gray-500"}`}
            >
              General
            </button>
            <button
              onClick={() => switchTab("Contact Info")}
              className={`mr-8 py-2 px-4 rounded-lg ${activeTab === "Contact Info" ? "text-blue-600 border-b-2 border-blue-600 font-bold text-md" : "text-gray-500"}`}
            >
              Contact Info
            </button>
            <button
              onClick={() => switchTab("Church Info")}
              className={`py-2 px-4 rounded-lg ${activeTab === "Church Info" ? "text-blue-600 border-b-2 border-blue-600 font-bold text-md" : "text-gray-500"}`}
            >
              Church Info
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">{tabContent()}</div>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Save
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;

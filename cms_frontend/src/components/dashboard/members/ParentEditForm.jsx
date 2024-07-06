import React from 'react';
import EditForm from './EditForm';

const renderFilterDropdown = (accessor, header, value, onChange) => {
  const options = {
    fellowship: ["Youth", "Women", "Men", "JSS"],
    ministry: [
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
      "Nyayo Embakasi",
      "Embakasi Village",
      "Utawala/Joska",
      "Fedha/Mradi",
      "Syokimau",
      "Diaspora",
    ],
    status: ["active", "inactive"],
    baptisedStatus: ["baptised", "Not Baptised"],
    maritalStatus: ["Married", "Single", "Divorced", "Widowed"],
    gender: ["Male", "Female"],
    marriageType: ["none", "monogamous", "polygamous"],
    savedStatus: ["saved", "not saved"],
    otherChurchMembership: ["Yes", "No"],
    memberType: ["full member", "associate"],
  };

  return (
    <select
      name={accessor}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
    >
      <option value="">{" "}</option>
      {options[accessor].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const ParentEditForm = ({ editData, onSave, onCancel }) => {
  return (
    <EditForm
      editData={editData}
      onSave={onSave}
      onCancel={onCancel}
      renderFilterDropdown={renderFilterDropdown}
    />
  );
};

export default ParentEditForm;

import React from 'react';
import EditForm from './EditForm';
import option from '../../../assets/dropdown';

const renderFilterDropdown = (accessor, header, value, onChange) => {
  const options = option

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

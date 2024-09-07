import React from 'react';
import EditForm from './EditForm';
import option from '../../assets/dropdown';

interface OptionMap {
  [key: string]: string[];
}

interface ParentEditFormProps {
  editData: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const renderFilterDropdown = (
  accessor: string,
  header: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
) => {
  const options: OptionMap = option;

  return (
    <select
      name={accessor}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-4 py-2 rounded-lg"
    >
      <option value="">Select {header}</option>
      {options[accessor]?.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

const ParentEditForm: React.FC<ParentEditFormProps> = ({ editData, onSave, onCancel }) => {
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

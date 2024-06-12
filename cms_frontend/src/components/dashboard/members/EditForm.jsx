import React, { useState, useEffect } from "react";

function EditForm({ data, columns, onClose }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFormData = {};
    columns.forEach(column => {
      initialFormData[column.accessor] = data ? data[column.accessor] : "";
    });
    setFormData(initialFormData);
  }, [data, columns]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data) {
      console.log('Update member:', formData);
    } else {
      console.log('Add new member:', formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
        <h2 className="text-xl font-semibold mb-4">{data ? 'Edit Member' : 'Add Member'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {columns.map((column) => (
              <div key={column.accessor}>
                <label className="block mb-2">{column.header}</label>
                <input
                  type="text"
                  name={column.accessor}
                  value={formData[column.accessor]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {data ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;

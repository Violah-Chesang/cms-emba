import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const DataTable = ({ data, columns, onEditClick, onViewClick, onDeleteClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <table className="min-w-full bg-white border-collapse border border-gray-300 mb-12">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.accessor}
              className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border border-gray-300"
            >
              {col.header}
            </th>
          ))}
          <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border border-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.memberId}>
            {columns.map((col) => (
              <td key={col.accessor} className="py-2 px-4 border border-gray-300 capitalize">
                {row[col.accessor]}
              </td>
            ))}
            <td className="py-1 px-4 border border-gray-300 relative">
              <button
                className="focus:outline-none"
                onClick={() => handleDropdownToggle(index)}
              >
                <FaEllipsisV />
              </button>
              {dropdownOpen === index && (
                <div className="absolute right-0 mt-2 py-2 w-28 bg-white rounded-md shadow-2xl z-10">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => onEditClick(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => onViewClick(row)}
                  >
                    View
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => onDeleteClick(row)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

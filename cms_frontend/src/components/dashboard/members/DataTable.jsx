import React from "react";
import { RiEditBoxFill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";

function DataTable({ data, columns, onEditClick }) {
  return (
    <table className="border-collapse border w-full">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2 text-left">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-b border-gray-300">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="border border-gray-300 px-4 py-2">
                {item[column.accessor]}
              </td>
            ))}
            <td className="border border-gray-300 px-4 py-2 text-blue-700">
              <button onClick={() => onEditClick(item)}>
                <RiEditBoxFill size={23} />
              </button>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-red-700">
              <button>
                <RiDeleteBin5Line size={23} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;

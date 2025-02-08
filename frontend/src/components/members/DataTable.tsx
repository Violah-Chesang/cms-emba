import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

interface Column {
  accessor: string;
  header: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  userRole: string;
  onEditClick: (row: any) => void;
  onViewClick: (row: any) => void;
  onDeleteClick: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, userRole, onEditClick, onViewClick, onDeleteClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(13);

  const handleDropdownToggle = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedRows(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(row => row.memberId)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const canEdit = ['Minister', 'Chair', 'Treasurer', 'Secretary'].includes(userRole);
  const canDelete = ["Minister"].includes(userRole);

  return (
    <div>
      <table className="bg-white border-collapse mb-12 w-full">
        <thead>
          <tr className="border-b border-gray-300 bg-[#6d8ad0]">
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              <input
                type="checkbox"
                checked={selectedRows.size === data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).length}
                onChange={handleSelectAllChange}
              />
            </th>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left"
              >
                {col.header}
              </th>
            ))}
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={row.memberId} className={`border-b border-gray-300 hover:bg-blue-100 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-sky-50 '}`}>
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.memberId)}
                  onChange={() => handleCheckboxChange(row.memberId)}
                />
              </td>
              {columns.map((col) => (
                <td key={col.accessor} className="py-2 px-3 capitalize">
                  {row[col.accessor]}
                </td>
              ))}
              <td className="py-1 px-4 relative">
                <button
                  className="focus:outline-none"
                  onClick={() => handleDropdownToggle(row.memberId)}
                >
                  <FaEllipsisV />
                </button>
                {dropdownOpen === row.memberId && (
                  <div className="absolute right-0 mt-2 py-2 w-28 bg-white rounded-md shadow-2xl z-10">
                    {canEdit && (
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          onEditClick(row);
                          setDropdownOpen(null);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        onViewClick(row);
                        setDropdownOpen(null);
                      }}
                    >
                      View
                    </button>
                    {canDelete && (
                      <button
                        className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          onDeleteClick(row);
                          setDropdownOpen(null);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center py-2">
        <div>
          {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, data.length)} of ${data.length}`}
        </div>
        <div className="flex items-center">
          <span className="mx-2">Page {currentPage}</span>
        </div>
        <div className="flex items-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
            <button
              key={pageNumber}
              className={`mx-1 px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;

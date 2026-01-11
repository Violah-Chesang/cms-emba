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
    setDropdownOpen(null); // Close any open dropdowns on page change
  };

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const canEdit = ['Minister', 'Chair', 'Treasurer', 'Secretary'].includes(userRole);
  const canDelete = ["Minister"].includes(userRole);

  return (
    <div className="w-full">
      {/* Table Wrapper for Horizontal Scrolling */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-gray-600 font-bold uppercase text-xs text-left whitespace-nowrap">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                  checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                  onChange={handleSelectAllChange}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="py-3 px-4 text-gray-600 font-bold uppercase text-xs text-left whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
              <th className="py-3 px-4 text-gray-600 font-bold uppercase text-xs text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={row.memberId}
                className={`transition-colors hover:bg-blue-50/50 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600"
                    checked={selectedRows.has(row.memberId)}
                    onChange={() => handleCheckboxChange(row.memberId)}
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.accessor} className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                    {/* If row[col.accessor] is a React Element (like our Name with Avatar), render it directly */}
                    {row[col.accessor]}
                  </td>
                ))}
                <td className="py-3 px-4 relative text-center">
                  <button
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
                    onClick={() => handleDropdownToggle(row.memberId)}
                  >
                    <FaEllipsisV className="text-gray-500" />
                  </button>

                  {dropdownOpen === row.memberId && (
                    <div className="absolute right-4 mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
                      <div className="py-1">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => {
                            onViewClick(row);
                            setDropdownOpen(null);
                          }}
                        >
                          View Details
                        </button>
                        {canEdit && (
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => {
                              onEditClick(row);
                              setDropdownOpen(null);
                            }}
                          >
                            Edit
                          </button>
                        )}
                        {canDelete && (
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => {
                              onDeleteClick(row);
                              setDropdownOpen(null);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 px-2">
        <div className="text-sm text-gray-600 font-medium order-2 sm:order-1">
          Showing <span className="font-bold text-blue-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-blue-900">{Math.min(currentPage * itemsPerPage, data.length)}</span> of <span className="font-bold text-blue-900">{data.length}</span> members
        </div>

        <div className="flex items-center gap-1 order-1 sm:order-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Prev
          </button>

          <div className="hidden md:flex gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
              <button
                key={pageNumber}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-all ${currentPage === pageNumber
                    ? 'bg-blue-950 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-500'
                  }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          {/* Simple Page Indicator for Mobile */}
          <span className="md:hidden text-sm text-gray-600 px-2 font-bold italic">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
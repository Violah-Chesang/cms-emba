import React, { useState } from "react";
import DataTable from "./DataTable";
import EditForm from "./EditForm";
import useFetchData from "../../../hooks/fetchData";
import { IoMdAdd } from "react-icons/io";

const Fellowship = ({ title, fetchUrl, columns }) => {
  const { data, loading, error } = useFetchData(fetchUrl);
  const [editData, setEditData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filters, setFilters] = useState({
    fellowship: "",
    ministry: "",
    cellGroup: "",
    status: "",
    baptisted: "",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setIsFormVisible(true);
  };

  const handleAddClick = () => {
    setEditData(null);
    setIsFormVisible(true);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredData = data.filter((item) => {
    return (
      (filters.fellowship ? item.fellowship === filters.fellowship : true) &&
      (filters.ministry ? item.ministry === filters.ministry : true) &&
      (filters.status ? item.status === filters.status : true) &&
      (filters.baptisted ? item.baptisted === filters.baptisted : true) &&
      (filters.cellGroup ? item.cellGroup === filters.cellGroup : true)
    );
  });

  return (
    <div className="mt-1">
      <div className="flex justify-between px-5 my-2">
        <p className="text-xl font-bold text-blue-950">{title}</p>
        <div className="flex items-center flex-wrap my-3">
          {renderFilterDropdown("fellowship", "Fellowship", [
            "All",
            "Youth",
            "Women",
            "Men",
            "JSS",
          ])}
          {renderFilterDropdown("ministry", "Ministry", [
            "All",
            "PraiseAndWorship",
            "Intercessory",
            "AwesomeMelodies",
            "Hospitality",
            "Ushering",
            "SacramentStewards",
            "Leader",
          ])}
          {renderFilterDropdown("cellGroup", "Cell Group", [
            "All",
            "Nyayo Embakasi",
            "Embakasi Village",
            "Utawala/Joska",
            "Fedha/Mradi",
            "Syokimau",
            "Diaspora",
          ])}
          {renderFilterDropdown("status", "Status", [
            "All",
            "active",
            "Inactive",
          ])}
          {renderFilterDropdown("baptisted", "Baptism", ["All", "Yes", "No"])}
          <button
          className="bg-blue-950 text-white px-4 py-2 flex items-center rounded-md"
          onClick={handleAddClick}
        >
          Add member <IoMdAdd size={20} />
        </button>
        </div>
        
      </div>
      <DataTable
        data={filteredData.map((item) => ({
          ...item,
          name: `${item.firstName} ${item.secondName} ${item.lastName}`,
        }))}
        columns={columns}
        onEditClick={handleEditClick}
      />
      {isFormVisible && (
        <EditForm
          data={editData}
          columns={columns}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );

  function renderFilterDropdown(name, label, options) {
    return (
      <div className="mr-4">
        <label htmlFor={name} className="mr-2">
        {label}:
        </label>
        <select
          id={name}
          name={name}
          value={filters[name]}
          onChange={handleFilterChange}
          className="border border-gray-300 p-2"
        >
          {options.map((option) => (
            <option key={option} value={option === "All" ? "" : option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
};

export default Fellowship;

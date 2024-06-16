import React, { useState } from "react";
import DataTable from "./DataTable";
import EditForm from "./EditForm";
import ViewForm from "./ViewForm";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";

const Fellowship = ({ title, data, columns, loading, error }) => {
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);
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

  const handleViewClick = (rowData) => {
    setViewData(rowData);
    setIsViewVisible(true);
  };

  const handleAddClick = () => {
    setEditData(null);
    setIsFormVisible(true);
  };

  const handleDeleteClick = async (rowData) => {
    try {
      await axios.post("http://localhost:5500/member/delete", {
        memberId: rowData.memberId,
      });
      alert("Member deleted successfully");
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member");
    }
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
      (filters.isActive ? item.isActive === filters.isActive : true) &&
      (filters.baptisedStatus
        ? item.baptisedStatus === filters.baptisedStatus
        : true) &&
      (filters.cellGroup ? item.cellGroup === filters.cellGroup : true)
    );
  });

  return (
    <div className="mt-1">
      <p className="text-xl font-bold text-blue-950">{title}</p>

      <div className="flex px-5 my-2 justify-end">
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
          {renderFilterDropdown("isActive", "Status", ["All", "true", "false"])}
          {renderFilterDropdown("baptisedStatus", "Baptism", [
            "All",
            "baptised",
            "notBaptised",
          ])}
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
          name: `${item.firstName} ${item.middleName} ${item.surName}`,
        }))}
        columns={columns}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
      />
      {isFormVisible && (
        <EditForm
          data={editData}
          columns={columns}
          onClose={() => setIsFormVisible(false)}
        />
      )}
      {isViewVisible && (
        <ViewForm
          data={viewData}
          columns={columns}
          onClose={() => setIsViewVisible(false)}
        />
      )}
    </div>
  );

  function renderFilterDropdown(name, label, options) {
    return (
      <div className="mr-4 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}:
        </label>
        <select
          id={name}
          name={name}
          value={filters[name]}
          onChange={handleFilterChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import {
  addMember,
  updateMember,
  deleteMember,
} from "../../../store/slice/memberSlice";
import DataTable from "./DataTable";
import EditForm from "./EditForm";
import ViewForm from "./ViewForm";

const Fellowship = ({ title, data, columns, loading, error }) => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.user?.role);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [filters, setFilters] = useState({
    fellowship: "",
    ministry: "",
    cellGroup: "",
    status: "",
    baptised: "",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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

  const handleDeleteClick = (rowData) => {
    dispatch(deleteMember(rowData.memberId))
      .unwrap()
      .then(() => {
        alert("Member deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting member:", error);
        alert("Failed to delete member");
      });
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
      (filters.baptised ? item.baptised === filters.baptised : true) &&
      (filters.cellGroup ? item.cellGroup === filters.cellGroup : true)
    );
  });

  const canAdd = ["Minister", "Executive Leader"].includes(userRole);

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
          ], handleFilterChange)}
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
          ], handleFilterChange)}
          {renderFilterDropdown("cellGroup", "Cell Group", [
            "All",
            "Nyayo Embakasi",
            "Embakasi Village",
            "Utawala/Joska",
            "Fedha/Mradi",
            "Syokimau",
            "Diaspora",
          ], handleFilterChange)}
          {renderFilterDropdown("status", "Status", [
            "All",
            "active",
            "inactive",
          ], handleFilterChange)}
          {renderFilterDropdown("baptised", "Baptised", [
            "All",
            "baptised",
            "Not Baptised",
          ], handleFilterChange)}
        </div>
      </div>

      <div className="flex flex-wrap justify-end px-5 my-2">
        {canAdd && (
          <button
            className="flex justify-center items-center py-2 px-5 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-500"
            onClick={handleAddClick}
          >
            <IoMdAdd size={20} />
            Add New Member
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        userRole={userRole}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
      />

      {isFormVisible && (
        <EditForm
          editData={editData}
          onSave={(newData) => {
            const action = editData ? updateMember : addMember;
            dispatch(action(newData))
              .unwrap()
              .then(() => {
                setIsFormVisible(false);
                alert(`Member ${editData ? "updated" : "added"} successfully`);
              })
              .catch((error) => {
                console.error(
                  `Error ${editData ? "updating" : "adding"} member:`,
                  error
                );
                alert(`Failed to ${editData ? "update" : "add"} member`);
              });
          }}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      {isViewVisible && (
        <ViewForm viewData={viewData} onClose={() => setIsViewVisible(false)} />
      )}
    </div>
  );
};

const renderFilterDropdown = (name, label, options, handleChange) => (
  <div className="flex flex-col px-1 mr-1">
    <label className="text-xs font-medium text-blue-950">{label}</label>
    <select
      name={name}
      className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-lg"
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Fellowship;

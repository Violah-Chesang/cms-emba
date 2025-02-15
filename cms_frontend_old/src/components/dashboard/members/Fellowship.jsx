import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import {
  addMember,
  updateMember,
  deleteMember,
} from "../../../store/slice/memberSlice";
import DataTable from "./DataTable";
import ParentEditForm from "./ParentEditForm";
import ViewForm from "./ViewForm";
import AddForm from "./AddForm";
import { refreshPermissions } from "../../../store/slice/accessControlSlice";

const Fellowship = ({ title, data, columns, loading, error }) => {
  const dispatch = useDispatch();
  const { role, canEdit, canDelete, canView } = useSelector(
    (state) => state.accessControl
  );
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [filters, setFilters] = useState({
    fellowship: "All",
    ministry: "All",
    cellGroup: "All",
    isActive: "All",
    baptisedStatus: "All",
  });

  useEffect(() => {
    dispatch(refreshPermissions());
  }, [dispatch]);

  const uniqueValues = useMemo(() => {
    const unique = (key) => [...new Set(data.map((item) => item[key]))].sort();
    return {
      fellowship: ["All", ...unique("fellowship")],
      ministry: ["All", ...unique("ministry")],
      cellGroup: ["All", ...unique("cellGroup")],
      isActive: ["All", ...unique("isActive")],
      baptisedStatus: ["All", ...unique("baptisedStatus")],
    };
  }, [data]);

  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      return filters[key] === "All" || item[key] === filters[key];
    });
  });

  const handleAction = (action, data, callback) => {
    dispatch(action(data))
      .unwrap()
      .then(() => {
        callback();
        alert("Action completed successfully");
      })
      .catch((error) => {
        console.error("Error performing action:", error);
        alert("Failed to complete action");
      });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;
  if (!canView) return <p>You do not have permission to view this content.</p>;

  return (
    <div className="mt-1">
      <p className="text-xl font-bold text-blue-950">{title}</p>

      <div className="flex px-5 my-2 justify-end items-end">
        <div className="flex items-center flex-wrap">
          {Object.keys(filters).map((key) =>
            renderFilterDropdown(
              key,
              key.replace(/([A-Z])/g, " $1"),
              uniqueValues[key],
              handleFilterChange
            )
          )}
        </div>

        {canEdit && (
          <button
            className="flex justify-center items-center py-2 px-5 text-sm font-medium text-white bg-blue-950 rounded-lg hover:bg-blue-600"
            onClick={() => setIsAddFormVisible(true)}
          >
            <IoMdAdd size={20} />
            Add New Member
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        userRole={role}
        onEditClick={(rowData) => {
          if (canEdit) {
            setEditData(rowData);
            setIsFormVisible(true);
          }
        }}
        onViewClick={(rowData) => {
          if (canView) {
            setViewData(rowData);
            setIsViewVisible(true);
          }
        }}
        onDeleteClick={(rowData) => {
          if (canDelete) {
            handleAction(deleteMember, rowData._id, () => {});
          }
        }}
      />

      {isFormVisible && (
        <ParentEditForm
          editData={editData}
          onSave={(newData) =>
            handleAction(
              updateMember,
              { _id: editData._id, updatedMember: newData },
              () => setIsFormVisible(false)
            )
          }
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      {isAddFormVisible && (
        <AddForm
          onSave={(newData) =>
            handleAction(addMember, newData, () => setIsAddFormVisible(false))
          }
          onCancel={() => setIsAddFormVisible(false)}
          renderFilterDropdown={renderFilterDropdown}
        />
      )}

      {isViewVisible && (
        <ViewForm viewData={viewData} onClose={() => setIsViewVisible(false)} />
      )}
    </div>
  );
};

const renderFilterDropdown = (name, label, options, handleChange) => (
  <div key={name} className="flex flex-col px-1 mr-1">
    <label className="text-xs font-medium text-blue-950">{label}</label>
    <select
      name={name}
      className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-lg capitalize"
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

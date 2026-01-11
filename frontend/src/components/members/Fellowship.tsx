import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd, IoMdRefresh } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import {
  addMember,
  updateMember,
  deleteMember,
  fetchMembers,
} from "../../store/slices/memberSlice";
import DataTable from "./DataTable";
import ViewForm from "./ViewForm";
import AddForm from "./AddForm";
import { refreshPermissions } from "../../store/slices/accessControlSlice";
import { AppDispatch, RootState } from "../../store/store";
import EditForm from "./EditForm";

interface Member {
  _id: string;
  memberId: string;
  firstName: string;
  middleName: string;
  surName: string;
  dob: string;
  phone: string;
  email: string;
  physicalAddress: string;
  nationalId: string;
  cellGroup: string;
  maritalStatus: string;
  marriageType: string;
  spouseName: string;
  gender: string;
  savedStatus: string;
  baptisedStatus: string;
  confirmationStatus: string;
  otherChurchMembership: string;
  marriageCeremonyType: string;
  memberType: string;
  ministry: string;
  fellowship: string;
  age: number;
  leadershipRole: string;
  deleted: boolean;
  isActive: string;
  regDate: string;
  notes: string;
  color: string;
  __v: number;
}

interface FellowshipProps {
  title: string;
  data: Member[];
  columns: Column[];
  loading: boolean;
  error: string | null;
}

interface Filters {
  fellowship: string;
  ministry: string;
  cellGroup: string;
  isActive: string;
  baptisedStatus: string;
}

interface Column {
  header: string;
  accessor: keyof Member | 'name';
}

const Fellowship: React.FC<FellowshipProps> = ({ title, data, columns, loading, error }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { role, canEdit, canDelete, canView } = useSelector((state: RootState) => state.accessControl);

  const [editData, setEditData] = useState<Member | null>(null);
  const [viewData, setViewData] = useState<Member | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const initialFilters: Filters = {
    fellowship: "All",
    ministry: "All",
    cellGroup: "All",
    isActive: "All",
    baptisedStatus: "All",
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    dispatch(refreshPermissions());
  }, [dispatch]);

  const uniqueValues = useMemo(() => {
    const unique = (key: keyof Member) =>
      ["All", ...new Set(data.map(item => String(item[key] || "")))].filter(v => v !== "").sort();
    return {
      fellowship: unique("fellowship"),
      ministry: unique("ministry"),
      cellGroup: unique("cellGroup"),
      isActive: unique("isActive"),
      baptisedStatus: unique("baptisedStatus"),
    };
  }, [data]);

  const filteredData = data.filter(item =>
    Object.keys(filters).every(key =>
      filters[key as keyof Filters] === "All" || String(item[key as keyof Member]) === filters[key as keyof Filters]
    )
  );

  const handleAction = (action: any, actionData: any, callback: any) => {
    dispatch(action(actionData)).unwrap().then(() => {
      callback();
      dispatch(fetchMembers());
    }).catch((err: any) => {
      console.error("Action error:", err);
      alert("Failed to complete action");
    });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const renderFilterDropdown = (name: string, label: string, options: string[], currentValue: string, handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void) => (
    <select
      key={name}
      name={name}
      value={currentValue}
      className=" px-2 text-[13px] font-bold border border-gray-200 rounded bg-white hover:border-blue-400 focus:outline-none transition-all capitalize text-blue-900 cursor-pointer min-w-[85px]"
      onChange={handleChange}
    >
      {options.map(option => (
        <option key={`${name}-${option}`} value={option}>
          {option === "All" ? label : option}
        </option>
      ))}
    </select>
  );

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950"></div></div>;
  if (error) return <p className="p-2 text-red-500 text-[10px] font-bold text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col h-full w-full px-4 py-1">

      {/* HEADER ROW - Compact & All-on-one-line */}
      <div className="flex flex-row items-center justify-between py-2 border-b border-gray-100 mb-1 overflow-hidden">

        {/* LEFT: Title */}
        <h1 className="text-base font-black text-blue-950 uppercase tracking-tighter shrink-0 mr-4">
          {title}
        </h1>

        {/* RIGHT: Filters + Add Button */}
        <div className="flex flex-row items-center justify-end gap-1.5 min-w-0 flex-1 overflow-x-auto no-scrollbar">

          <div className="flex flex-row items-center gap-1 shrink-0 lg:shrink">
            <MdFilterList className="text-gray-400 shrink-0" size={14} />

            <div className="flex flex-row gap-1 items-center overflow-x-auto no-scrollbar py-1">
              {Object.keys(filters).map(key =>
                renderFilterDropdown(
                  key,
                  key.replace(/([A-Z])/g, " $1"),
                  uniqueValues[key as keyof typeof uniqueValues],
                  filters[key as keyof Filters],
                  handleFilterChange
                )
              )}
            </div>

            <button
              onClick={() => setFilters(initialFilters)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
              title="Reset Filters"
            >
              <IoMdRefresh size={14} />
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-[1px] bg-gray-200 mx-1 shrink-0" />

          {/* ADD BUTTON */}
          <button
            className="flex items-center gap-1 py-1.5 px-3 text-[13px] font-black text-white bg-blue-950 rounded-lg hover:bg-blue-800 transition-all shadow-sm capitalize tracking-wider shrink-0"
            onClick={() => setIsAddFormVisible(true)}
          >
            <IoMdAdd size={14} /> Add New Member
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 bg-white rounded-md shadow-sm border border-gray-50 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredData}
          userRole={role}
          onEditClick={(rowData: Member) => { if (canEdit) { setEditData(rowData); setIsFormVisible(true); } }}
          onViewClick={(rowData: Member) => { if (canView) { setViewData(rowData); setIsViewVisible(true); } }}
          onDeleteClick={(rowData: Member) => {
            if (canDelete && window.confirm(`Delete ${rowData.firstName}?`)) {
              handleAction(deleteMember, rowData._id, () => { });
            }
          }}
        />
      </div>

      {/* FORMS */}
      {isFormVisible && editData && (
        <EditForm editData={editData} onSave={(newData: Partial<Member>) => handleAction(updateMember, { _id: editData._id, updatedMember: newData }, () => setIsFormVisible(false))} onCancel={() => setIsFormVisible(false)} />
      )}
      {isAddFormVisible && (
        <AddForm onSave={(newData: Omit<Member, '_id'>) => handleAction(addMember, newData, () => setIsAddFormVisible(false))} onCancel={() => setIsAddFormVisible(false)} renderFilterDropdown={(name, label, options, handleChange) => renderFilterDropdown(name, label, options, filters[name as keyof Filters] || "All", handleChange)} />
      )}
      {isViewVisible && viewData && (
        <ViewForm viewData={viewData} onClose={() => setIsViewVisible(false)} />
      )}
    </div>
  );
};

export default Fellowship;
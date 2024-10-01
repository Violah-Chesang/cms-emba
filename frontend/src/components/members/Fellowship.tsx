import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import {
  addMember,
  updateMember,
  deleteMember,
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
  physicalAddress: string;
  nationalId: string;
  motherPhone: string;
  fatherName: string;
  motherName: string;
  maritalStatus: string;
  marriageType: string;
  spouseName: string;
  gender: string;
  occupation: string;
  savedStatus: string;
  baptisedStatus: string;
  otherChurchMembership: string;
  memberType: string;
  cellGroup: string;
  ministry: string;
  fellowship: string;
  age: number;
  leadershipRole:string;
  deleted: boolean;
  isActive: string;
  regDate: string;
  notes: string;
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

const Fellowship: React.FC<FellowshipProps> = ({
  title,
  data,
  columns,
  loading,
  error
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { role, canEdit, canDelete, canView } = useSelector(
    (state: RootState) => state.accessControl
  );
  const [editData, setEditData] = useState<Member | null>(null);
  const [viewData, setViewData] = useState<Member | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
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
    const unique = (key: keyof Member) =>
      ["All", ...new Set(data.map(item => item[key] as string))].sort();
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
      filters[key as keyof Filters] === "All" || item[key as keyof Member] === filters[key as keyof Filters]
    )
  );

  const handleAction = (action: any, actionData: any, callback: () => void) => {
    console.log('Action being dispatched:', action);
    console.log('Action data:', actionData);
    dispatch(action(actionData))
      .unwrap()
      .then(() => {
        callback();
        alert("Action completed successfully");
      })
      .catch((error: Error) => {
        console.error("Error performing action:", error);
        alert("Failed to complete action");
      });
  };


  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;
  if (!canView) return <p>You do not have permission to view this content.</p>;

  return (
    <div className="mt-1">
      <p className="text-xl font-bold text-blue-950 capitalize">{title}</p>

      <div className="flex px-5 my-2 justify-end items-end">
        <div className="flex items-center flex-wrap">
          {Object.keys(filters).map(key =>
            renderFilterDropdown(
              key,
              key.replace(/([A-Z])/g, " $1"),
              uniqueValues[key as keyof typeof uniqueValues],
              handleFilterChange
            )
          )}
        </div>

        {/* {canEdit && ( */}
          <button
            className="flex justify-center items-center py-2 px-5 text-sm font-medium text-white bg-blue-950 rounded-lg hover:bg-blue-600"
            onClick={() => setIsAddFormVisible(true)}
          >
            <IoMdAdd size={20} />
            Add New Member
          </button>
        {/* )} */}
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        userRole={role}
        onEditClick={(rowData: Member) => {
          if (canEdit) {
            setEditData(rowData);
            setIsFormVisible(true);
          }
        }}
        onViewClick={(rowData: Member) => {
          if (canView) {
            setViewData(rowData);
            setIsViewVisible(true);
          }
        }}
        onDeleteClick={(rowData: Member) => {
          if (canDelete) {
            handleAction(deleteMember, rowData._id, () => { });
          }
        }}
      />

      {isFormVisible && editData && (
        <EditForm
          editData={editData}
          onSave={(newData: Partial<Member>) =>
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
          onSave={(newData: Omit<Member, '_id'>) =>
            handleAction(addMember, newData, () => setIsAddFormVisible(false))
            
          }
          onCancel={() => setIsAddFormVisible(false)}
          renderFilterDropdown={renderFilterDropdown}
        />
      )}

      {isViewVisible && viewData && (
        <ViewForm viewData={viewData} onClose={() => setIsViewVisible(false)} />
      )}
    </div>
  );
};

const renderFilterDropdown = (
  name: string,
  label: string,
  options: string[],
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
) => (
  <div key={name} className="flex flex-col px-1 mr-1">
    <label className="text-xs font-medium text-blue-950">{label}</label>
    <select
      name={name}
      className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-lg capitalize"
      onChange={handleChange}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Fellowship;

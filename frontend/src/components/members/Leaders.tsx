import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../store/slices/memberSlice";
import Fellowship from "./Fellowship";
import { AppDispatch, RootState } from "../../store/store";
import { selectAllMembers, selectLoading, selectError } from "../../store/selectors/memberSelector";

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
  maritalStatus: string;
  leadershipRole: string;
  fellowship: string;
  color: string; // From Database
  isActive: string;
}

interface Column {
  header: string;
  accessor: keyof Member | 'name';
}

const columns: Column[] = [
  { header: "Member ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Email", accessor: "email" },
  { header: "Position", accessor: "leadershipRole" },
  { header: "Fellowship", accessor: "fellowship" },
];

const Leaders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector((state: RootState) => selectAllMembers(state));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    // Only fetch if members list is empty
    if (members.length === 0) {
      dispatch(fetchMembers());
    }
  }, [dispatch, members.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-950"></div>
        <p className="ml-4 text-blue-950 font-bold uppercase tracking-widest text-xs">Loading Leaders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm italic">
        Error: {error}
      </div>
    );
  }

  // Filter and transform leaders
  const leadersData = members
    .filter(member =>
      member.leadershipRole &&
      member.leadershipRole !== "Member" &&
      member.leadershipRole !== "--NONE--" &&
      member.leadershipRole !== "None"
    )
    .map(member => {
      // Logic: Use stored color or fallback to black border
      const avatarStyle = member.color
        ? { backgroundColor: member.color }
        : { backgroundColor: 'transparent', border: '2px solid black' };

      return {
        ...member,
        name: (
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-4 shrink-0"
              style={avatarStyle}
            >
              {member.firstName?.charAt(0) || ""}
              {member.middleName ? member.middleName.charAt(0) : member.surName?.charAt(0) || ""}
            </div>
            <span className="font-medium text-blue-950">
              {`${member.firstName || ''} ${member.middleName ? member.middleName + ' ' : ''}${member.surName || ''}`}
            </span>
          </div>
        )
      };
    });

  return (
    <div className="p-1">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-blue-950 caipatile tracking-tight">Church Leadership</h1>
        <p className="text-gray-500 text-sm italic">Showing all members currently holding leadership positions.</p>
      </div>

      <Fellowship
        title=""
        data={leadersData as any}
        columns={columns as any}
        loading={loading}
        error={error}
      />

      {!loading && leadersData.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl p-10 text-center">
          <p className="text-xl font-bold">No Leaders Found</p>
          <p className="text-sm">Update a member's Leadership Role to see them appear in this list.</p>
        </div>
      )}
    </div>
  );
};

export default Leaders;
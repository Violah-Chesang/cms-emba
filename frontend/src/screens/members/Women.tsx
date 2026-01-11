import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembersByFellowship } from "../../store/slices/memberSlice";
import { RootState, AppDispatch } from "../../store/store";
import FellowshipComponent from "../../components/members/Fellowship";
import { makeSelectFellowshipMembers, selectLoading, selectError } from "../../store/selectors/memberSelector";
import { useRenderLogger } from "../../hooks/useRenderLogger";

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
  color: string; // From Database
  notes: string;
  __v: number;
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
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Ministry", accessor: "ministry" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "isActive" },
];

const WomenFellowship: React.FC = () => {
  useRenderLogger('WomenFellowship');

  const dispatch = useDispatch<AppDispatch>();
  const selectFellowshipMembers = useMemo(() => makeSelectFellowshipMembers(), []);

  const members = useSelector((state: RootState) => selectFellowshipMembers(state, "Women"));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const fetchMembers = useCallback(() => {
    dispatch(fetchMembersByFellowship("Women"));
  }, [dispatch]);

  React.useEffect(() => {
    if (members.length === 0 && !loading && !error) {
      fetchMembers();
    }
  }, [members.length, loading, error, fetchMembers]);

  const transformedMembers = useMemo(() => {
    if (!members || !Array.isArray(members)) return [];

    return members.map((member: Member) => {
      // Logic: Use stored color or fallback to black border if null/undefined
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
              {member.firstName.charAt(0)}
              {member.middleName ? member.middleName.charAt(0) : member.surName.charAt(0)}
            </div>
            <span className="font-medium text-blue-950 truncate max-w-[200px]">
              {`${member.firstName} ${member.middleName ? member.middleName + ' ' : ''}${member.surName}`}
            </span>
          </div>
        )
      };
    });
  }, [members]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950"></div>
        <p className="ml-4 text-blue-950 font-bold uppercase tracking-widest text-sm">Loading Women's Fellowship...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-950 uppercase tracking-tight">Women's Fellowship</h1>
        <p className="text-gray-500 text-sm italic">Detailed records and ministry involvement of church women.</p>
      </div>

      <FellowshipComponent
        title=""
        data={transformedMembers as any}
        columns={columns}
        loading={loading}
        error={error}
      />

      {!loading && members.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl p-10">
          <p className="text-2xl font-bold">No Women's Fellowship data</p>
          <p className="text-sm">New female members will appear here automatically when registered.</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(WomenFellowship);
import React, {  useMemo, useCallback,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembersByFellowship } from "../../store/slices/memberSlice";
import { RootState, AppDispatch } from "../../store/store";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import FellowshipComponent from "../../components/members/Fellowship";
import { makeSelectFellowshipMembers, selectLoading, selectError } from "../../store/selectors/memberSelector";

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
  marriageType: string;
  spouseName: string;
  gender: string;
  savedStatus: string;
  baptisedStatus: string;
  cellGroup: string;
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
  __v: number;
}
interface Column {
  header: string;
  accessor: keyof Member | 'name';
}

const columns: Column[] = [
  { header: "MemberID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Email", accessor: "email" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Ministry", accessor: "ministry" },
  { header: "Gender", accessor: "gender" },
  { header: "Status", accessor: "isActive" },
];

const YouthFellowship: React.FC = () => {
  useRenderLogger('YouthFellowship');

  const dispatch = useDispatch<AppDispatch>();
  const selectFellowshipMembers = useMemo(() => makeSelectFellowshipMembers(), []);
  
  const members = useSelector((state: RootState) => {
    return selectFellowshipMembers(state, "Youth");
  });
  const loading = useSelector((state: RootState) => {
    return selectLoading(state);
  });
  const error = useSelector((state: RootState) => {
    return selectError(state);
  });

  const fetchMembers = useCallback(() => {
    dispatch(fetchMembersByFellowship("Youth"));
  }, [dispatch]);

  React.useEffect(() => {
    if (members.length === 0 && !loading && !error) {
      fetchMembers();
    }
  }, [members.length, loading, error, fetchMembers]);

  const colors = useMemo(() => [
    "#C8D0FE",
    "#FFB6C1",
    "#90EE90",
    "#FFD700",
    "#FF69B4",
    "#E6E6FA",
    "#FFE4E1",
  ], []);

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  const transformedMembers = useMemo(() => {
    if (!members || !Array.isArray(members)) {
      console.error('Youth members is not an array:', members);
      return [];
    }
    return members.map((member: Member) => ({
      ...member,
      name: (
        <div className="flex items-center">
          <button
            className="w-12 h-12 rounded-3xl text-lg font-bold mr-4"
            style={{ backgroundColor: getRandomColor() }}
          >
            {member.firstName.charAt(0)}{member.middleName ? member.middleName.charAt(0) : ""}
          </button>
          <span>{`${member.firstName} ${member.middleName ? member.middleName + ' ' : ''}${member.surName}`}</span>
        </div>
      )
    }));
  }, [members, getRandomColor]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
   <div className="p-2">
      <FellowshipComponent
        title="Youth Fellowship"
        data={transformedMembers}
        columns={columns}
        loading={loading}
        error={error}
      />
      {members.length===0 && <p className="text-center text-red-500 justify-center items-center font-bold text-2xl mt-20">No data available. Please add to manage members</p>}
   </div>
  );
};

export default React.memo(YouthFellowship);

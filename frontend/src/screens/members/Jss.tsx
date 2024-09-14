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
  { header: "Member ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Mother Contact", accessor: "motherPhone" },
  { header: "Father Name", accessor: "fatherName" },
  { header: "Mother Name", accessor: "motherName" },
  { header: "Age", accessor: "age" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Cell Group", accessor: "cellGroup" },
  { header: "Ministry", accessor: "ministry" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "isActive" },
];

const JssFellowship: React.FC = () => {
  useRenderLogger('JssFellowship');

  const dispatch = useDispatch<AppDispatch>();
  const selectFellowshipMembers = useMemo(() => makeSelectFellowshipMembers(), []);
  
  const members = useSelector((state: RootState) => {
    console.log('Selecting members in JssFellowship');
    return selectFellowshipMembers(state, "JSS");
  });
  const loading = useSelector((state: RootState) => {
    console.log('Selecting loading in JssFellowship');
    return selectLoading(state);
  });
  const error = useSelector((state: RootState) => {
    console.log('Selecting error in JssFellowship');
    return selectError(state);
  });

  const fetchMembers = useCallback(() => {
    console.log('Fetching members in JssFellowship');
    dispatch(fetchMembersByFellowship("JSS"));
  }, [dispatch]);

  React.useEffect(() => {
    console.log('useEffect running in JssFellowship');
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
    console.log('Transforming members in JssFellowship');
    if (!members || !Array.isArray(members)) {
      console.error('JSS members is not an array:', members);
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

  console.log("Rendering JssFellowship, loading:", loading, "members:", members);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // if (!members || !Array.isArray(members) || members.length === 0) {
  //   return <p>No JSS members data available</p>;
  // }

  return (
   <div className="p-2">
      <FellowshipComponent
        title="Junior Sunday School (JSS) Fellowship"
        data={transformedMembers}
        columns={columns}
        loading={loading}
        error={error}
      />
      {members.length===0 && <p className="text-center text-red-500 justify-center items-center font-bold text-2xl mt-20">No data available. Please add to manage members</p>}
   </div>
  );
};

export default React.memo(JssFellowship);
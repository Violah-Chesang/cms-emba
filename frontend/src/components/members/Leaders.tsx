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
  { header: "Position", accessor: "leadershipRole" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "isActive" },
];

const colors = [
  "#C8D0FE",
  "#FFB6C1",
  "#90EE90",
  "#FFD700",
  "#FF69B4",
  "#E6E6FA",
  "#FFE4E1",
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const Leaders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector((state: RootState) => selectAllMembers(state));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter and concatenate name
  const leaders: Member[] = members
    .filter(member => member.leadershipRole !== "--NONE--" && member.leadershipRole !== null)
    .map(member => ({
      ...member,
      name: (
        <div className="flex items-center">
          <button
            className="px-2 py-2 rounded-3xl text-lg font-bold mr-4"
            style={{ backgroundColor: getRandomColor() }}
          >
            {member.firstName.charAt(0)}{member.middleName ? member.middleName.charAt(0) : ""}
          </button>
          <span>{`${member.firstName} ${member.middleName ? member.middleName + ' ' : ''}${member.surName}`}</span>
        </div>
      )
      
    }));

  return (
    <Fellowship
      title="Leaders"
      data={leaders}
      columns={columns as any}
      loading={loading}
      error={error}
    />
  );
};

export default Leaders;

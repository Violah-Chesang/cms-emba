import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../store/slices/memberSlice';
import Fellowship from '../../components/members/Fellowship';
import { AppDispatch, RootState } from '../../store/store';

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
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Ministry", accessor: "ministry" },
  { header: "Gender", accessor: "gender" },
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

const AllMembers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { all: members, loading, error } = useSelector((state: RootState) => state.members);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const transformedData: Member[] = (members || []).map((member: Member, index: number) => {
    if (!member || !member.firstName) {
      console.log(`Invalid member at index ${index}:`, member);
      return null as any; // Skip invalid entries
    }

    return {
      ...member,
      name: (
        <div className="flex items-center">
          <button
            className="w-10 h-10 rounded-3xl text-sm font-bold mr-4"
            style={{ backgroundColor: getRandomColor() }}
          >
            {member.firstName.charAt(0)}{member.middleName ? member.middleName.charAt(0) : ""}
          </button>
          <span>{`${member.firstName} ${member.middleName ? member.middleName + ' ' : ''}${member.surName}`}</span>
        </div>
      )
    };
  }).filter(Boolean); 


  const filteredData = transformedData.filter((member: Member) =>
    (member.firstName + ' ' + member.middleName + ' ' + member.surName).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.phone?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (member.physicalAddress?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (member.nationalId?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-4'>
      <div className="flex justify-between pt-1">
        <h1 className="text-xl font-bold text-blue-950 capitalize">Church Members</h1>
        <div>
          <input
            type="search"
            placeholder="Search by Name, Phone no., Address or ID..."
            className="border-x-2 border-blue-950 w-96 h-11 rounded-lg border-spacing-2 border-gray-1 pl-5 bg-blue-950 text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Fellowship
        title=""
        data={filteredData as any}
        columns={columns}
        loading={loading}
        error={error}
      />
      {members.length === 0 && <p className="text-center text-red-500 justify-center items-center font-bold text-2xl mt-20">No data available. Please add to manage members</p>}
    </div>
  );
};

export default AllMembers;

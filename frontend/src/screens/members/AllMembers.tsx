import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../store/slices/memberSlice';
import FellowshipComponent from "../../components/members/Fellowship";
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
  color: string; // Added color to the interface
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

  const transformedData = (members || []).map((member: Member, index: number) => {
    if (!member || !member.firstName) {
      console.log(`Invalid member at index ${index}:`, member);
      return null;
    }

    // Determine the style based on whether member.color exists
    const avatarStyle = member.color
      ? { backgroundColor: member.color }
      : { backgroundColor: 'transparent', border: '2px solid black' };

    return {
      ...member,
      name: (
        <div className="flex items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-4"
            style={avatarStyle}
          >
            {member.firstName.charAt(0)}
            {member.middleName ? member.middleName.charAt(0) : member.surName.charAt(0)}
          </div>
          <span className="font-medium text-blue-950">
            {`${member.firstName} ${member.middleName ? member.middleName + ' ' : ''}${member.surName}`}
          </span>
        </div>
      )
    };
  }).filter(Boolean);

  const filteredData = transformedData.filter((member: any) =>
    (member.firstName + ' ' + (member.middleName || '') + ' ' + member.surName).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.phone?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (member.physicalAddress?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (member.nationalId?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-6'>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blue-950 uppercase tracking-tight">
          Church Members Management
        </h1>
        <div className="relative w-full md:w-auto">
          <input
            type="search"
            placeholder="Search members..."
            className="w-full md:w-96 h-12 rounded-xl pl-5 bg-blue-950 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <FellowshipComponent
        title=""
        data={filteredData as any}
        columns={columns}
        loading={loading}
        error={error}
      />

      {!loading && members.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <p className="text-2xl font-bold">No data available</p>
          <p className="text-sm">Please add members to manage the database</p>
        </div>
      )}
    </div>
  );
};

export default AllMembers;
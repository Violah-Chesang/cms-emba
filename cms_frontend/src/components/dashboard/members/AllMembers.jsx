import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../../store/slice/memberSlice';
import Fellowship from './Fellowship';

const columns = [
  { header: "ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Physical Address", accessor: "physicalAddress" },
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Cell Group", accessor: "cellGroup" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "isActive" },
];

const AllMembers = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.members);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const transformedData = data.map((member) => ({
    ...member,
    name: `${member.firstName} ${member.middleName} ${member.surName}`,
  }));

  const filteredData = transformedData.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.physicalAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.nationalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between m-6 pt-5">
        <h1 className="text-2xl font-bold text-blue-900">Church Members</h1>
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
        data={filteredData}
        columns={columns}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AllMembers;

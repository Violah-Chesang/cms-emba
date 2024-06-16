import React, { useState } from "react";
import Fellowship from "./Fellowship";
import useFetchData from "../../../hooks/fetchData";

const columns = [
  { header: "Member ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone No.", accessor: "phone" },
  { header: "Address", accessor: "physicalAddress" },
  { header: "ID No.", accessor: "nationalId" },
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Cell Group", accessor: "cellGroup" },
  { header: "Ministry", accessor: "ministry" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "isActive" },
];

const AllMembers = () => {
  const { data, loading, error } = useFetchData("http://localhost:5500/member/find/all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((member) =>
    `${member.firstName} ${member.middleName} ${member.surName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
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

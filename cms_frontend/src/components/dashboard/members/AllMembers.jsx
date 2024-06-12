import React, { useState } from "react";
import Fellowship from "./Fellowship";
import useFetchData from "../../../hooks/fetchData";

const columns = [
  { header: "Member ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Physical Address", accessor: "physicalAddress" },
  { header: "National ID No.", accessor: "nationalId" },
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Baptised", accessor: "baptisted" },
  { header: "Cell Group", accessor: "cellGroup" },
  { header: "Ministry", accessor: "ministry" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "status" },
];

const AllMembers = () => {
  const { loading, error } = useFetchData("http://localhost:3000/api/users");

  return (
    <div>
      <div className="flex justify-between m-6 pt-5">
        <h1 className="text-2xl font-bold text-blue-900">Church Members</h1>
        <div>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search by Name, Phone no., ddress or ID....."
            className="border-x-2 border-blue-950 w-96 h-11 rounded-lg border-spacing-2 border-gray-1 pl-5  bg-blue-950 text-white"
          />
        </div>
      </div>
      <Fellowship
        title=""
        fetchUrl="http://localhost:3000/api/users"
        columns={columns}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AllMembers;

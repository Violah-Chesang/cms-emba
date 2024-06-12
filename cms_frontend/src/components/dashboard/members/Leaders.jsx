import React from "react";
import FellowshipComponent from "./Fellowship";

const columns = [
  { header: "ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Physical Address", accessor: "physicalAddress" },
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Baptised", accessor: "baptisted" },
  { header: "Cell Group", accessor: "cellGroup" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "status" },
];

function Leaders() {
  return (
    <FellowshipComponent
      title="Leaders"
      fetchUrl="http://localhost:3000/api/users/by-ministry/leader"
      columns={columns}
    />
  );
}

export default Leaders;

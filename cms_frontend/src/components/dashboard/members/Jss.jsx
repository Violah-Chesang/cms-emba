import React from "react";
import FellowshipComponent from "./Fellowship";

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

function JssFellowship() {
  return (
    <FellowshipComponent
      title="Junior Sunday School (JSS) Fellowship"
      fetchUrl="http://localhost:3000/api/users/by-fellowship/jss"
      columns={columns}
    />
  );
}

export default JssFellowship;




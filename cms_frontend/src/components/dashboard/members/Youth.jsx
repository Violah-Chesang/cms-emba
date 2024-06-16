import React from "react";
import FellowshipComponent from "./Fellowship";
import useFetchData from "../../../hooks/fetchData";

const columns = [
  { header: "Member ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Physical Address", accessor: "physicalAddress" },
  { header: "National ID No.", accessor: "nationalId" },
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Cell Group", accessor: "cellGroup" },
  { header: "Ministry", accessor: "ministry" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "isActive" },
];

function YouthFellowship() {
  const { data, loading, error } = useFetchData(
    "http://localhost:5500/reports/youth-fellowship"
  );
  return (
    <FellowshipComponent
      title="Women Fellowship"
      data={data}
      columns={columns}
      loading={loading}
      error={error}
    />
  );
}

export default YouthFellowship;

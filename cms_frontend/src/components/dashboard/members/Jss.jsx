import React from "react";
import FellowshipComponent from "./Fellowship";
import useFetchData from "../../../hooks/fetchData";

const columns = [
  { header: "Member ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Mother Contact", accessor: "motherPhone" },
  { header: "Father Name", accessor: "fatherName" },
  { header: "Mother Name", accessor: "motherName" },
  { header: "Physical Address", accessor: "physicalAddress" },
  { header: "Age", accessor: "age" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Cell Group", accessor: "cellGroup" },
  { header: "Ministry", accessor: "ministry" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "isActive" },
];

function JssFellowship() {
  const { data, loading, error } = useFetchData(
    "http://localhost:5500/reports/jss"
  );
  return (
    <FellowshipComponent
      title="Junior Sunday School (JSS) Fellowship"
      data={data}
      columns={columns}
      loading={loading}
      error={error}
    />
  );
}

export default JssFellowship;

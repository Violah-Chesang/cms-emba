// Leaders.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../../store/slice/memberSlice";
import Fellowship from "./Fellowship";

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

const Leaders = () => {
  const dispatch = useDispatch();
  const { data: members, loading, error } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  // Filter and concatenate name
  const leaders = members
    .filter((member) => member.ministry === "Leader")
    .map((member) => ({
      ...member,
      name: `${member.firstName} ${member.middleName} ${member.surName}`,
    }));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Fellowship
      title="Leaders"
      data={leaders}
      columns={columns}
      loading={loading}
      error={error}
    />
  );
};

export default Leaders;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembersByFellowship } from "../../../store/slice/memberSlice";
import FellowshipComponent from "./Fellowship";

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

const WomenFellowship = () => {
  const dispatch = useDispatch();
  const { data: members, loading, error } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembersByFellowship("Women Fellowship"));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const transformedMembers = members.map(member => ({
    ...member,
    name: `${member.firstName} ${member.middleName} ${member.surName}`
  }));

  return (
    <FellowshipComponent
      title="Women Fellowship"
      data={transformedMembers}
      columns={columns}
      loading={loading}
      error={error}
    />
  );
};

export default WomenFellowship;

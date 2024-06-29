import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembersByFellowship } from "../../../store/slice/memberSlice";
import FellowshipComponent from "./Fellowship";

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

const JssFellowship = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembersByFellowship("Jss Fellowship"));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const transformedMembers = data.map(member => ({
    ...member,
    name: `${member.firstName} ${member.middleName} ${member.surName}`
  }));

  return (
    <FellowshipComponent
      title="Junior Sunday School (JSS) Fellowship"
      data={transformedMembers}
      columns={columns}
      loading={loading}
      error={error}
    />
  );
};

export default JssFellowship;

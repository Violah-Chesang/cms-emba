import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../../store/slice/memberSlice";
import AnalyticsCard from "./AnalyticsCard";

const FellowshipAnalytics = ({ totalMembers }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data.map((groupData) => (
        <AnalyticsCard
          key={groupData.group}
          group={groupData.label}
          number={groupData.members ? groupData.members.length : 0} // Check if members exists
          percentage={
            groupData.members
              ? (groupData.members.length / totalMembers) * 100
              : 0
          }
        />
      ))}
    </>
  );
};

export default FellowshipAnalytics;

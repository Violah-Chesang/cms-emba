import React, { useEffect, useState } from "react";
import useFetchData from "../../../hooks/fetchData";
import lineChart from '../../../assets/line-chart-removebg-preview.png';

const fellowshipGroups = [
  { group: "men-fellowship", label: "Men" },
  { group: "women-fellowship", label: "Women" },
  { group: "youth-fellowship", label: "Youth" },
  { group: "jss", label: "JSS" },
  { group: "all", label: "All" },
];

function AnalyticsCard({ group, number, percentage }) {
  return (
    <div className="bg-blue-100 p-3 rounded-lg m-1 flex-1 w-full md:w-1/2 lg:w-1/3">
      <div className="flex flex-row items-center justify-between">
        <div className="w-full">
          <p className="capitalize font-bold text-md">{group} Fellowship</p>
          <p className="text-3xl py-3 font-semibold">{number}</p>
        </div>
        <div>
          <img
            src={lineChart}
            alt="Line Chart"
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between gap-2">
        <p className="w-full text-sm">Percentage</p>
        <p className="font-semibold text-lg">{percentage}%</p>
      </div>
    </div>
  );
}

const FellowshipAnalytics = ({ group, totalMembers }) => {
  const url =
    group.group === "all"
      ? "http://172.17.0.1:5500/member/find/all"
      : `http://172.17.0.1:5500/reports/${group.group}`;

  const { data, loading, error } = useFetchData(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const number = data.length;
  const percentage = (number / totalMembers) * 100;

  return (
    <AnalyticsCard
      group={group.label}
      number={number}
      percentage={percentage.toFixed(1)}
    />
  );
};

const AnalyticsList = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const { data, loading, error } = useFetchData(
    "http://172.17.0.1:5500/member/find/all"
  );

  useEffect(() => {
    if (data) {
      setTotalMembers(data.length);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p className="text-xl font-bold pt-2">Member Statistics</p>
      <div className="flex flex-row flex-wrap mt-4">
        {fellowshipGroups.map((group) => (
          <FellowshipAnalytics
            key={group.group}
            group={group}
            totalMembers={totalMembers}
          />
        ))}
      </div>
    </div>
  );
};

export default AnalyticsList;

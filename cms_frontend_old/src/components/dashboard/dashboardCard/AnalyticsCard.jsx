import React from "react";

const AnalyticsCard = ({ group, number, percentage }) => {
  return (
    <div className="bg-blue-100 p-3 rounded-lg m-1 flex-1">
      <div className="flex flex-row items-center justify-between">
        <div className="w-full">
          <p className="capitalize font-bold text-md">{group} Fellowship</p>
          <p className="text-3xl py-3 font-semibold">{number}</p>
        </div>
        <div>
          <img
            src="src/assets/line-chart-removebg-preview.png"
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
};

export default AnalyticsCard;

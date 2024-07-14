import React from "react";

const DashboardCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center">
      <div className="p-4 bg-green-100 rounded-full">
        <img src={icon} alt={title} className="h-8 w-8" />
      </div>
      <div className="ml-4">
        <div className="text-xl font-bold">{count}</div>
        <div className="text-gray-500">{title}</div>
      </div>
    </div>
  );
};

export default DashboardCard;

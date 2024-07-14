import React from "react";
import DashboardCard from "./DashboardCard";
import projectIcon from "../../assets/icons/porjectsList.png";
import engineerIcon from "../../assets/icons/engineer.png";
import salesUserIcon from "../../assets/icons/sales.png";
import iterationIcon from "../../assets/icons/iterations.png";

const DashboardCards = ({ stats }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 max-w-7xl mx-auto mt-8 px-4">
      <DashboardCard
        title="Total Projects"
        count={stats.totalProjects}
        icon={projectIcon}
      />
      <DashboardCard
        title="Total Engineers"
        count={stats.totalEngineers}
        icon={engineerIcon}
      />
      <DashboardCard
        title="Total Sales Users"
        count={stats.totalSalesUsers}
        icon={salesUserIcon}
      />
      <DashboardCard
        title="Remaining Iterations"
        count={`${stats.iterations}/480`}
        icon={iterationIcon}
      />
    </div>
  );
};

export default DashboardCards;

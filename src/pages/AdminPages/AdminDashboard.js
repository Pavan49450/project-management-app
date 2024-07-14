import React, { useState, useEffect } from "react";
import DashboardCards from "../../components/AdminDashboard/DashboardCards";
import MainContainer from "./MainContainer";
import { getAdminDetailsAPI } from "../../api/admin/getAdminDetailsAPI";
import { CircularProgress } from "@material-ui/core";

const AdminDashboard = () => {
  const [adminDetails, setAdminDetails] = useState();

  const [stats, setStats] = useState({
    totalProjects: 96,
    totalEngineers: 3,
    totalSalesUsers: 4,
    iterations: 0,
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const result = await getAdminDetailsAPI();
        setAdminDetails(result);
        // console.log(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAdminDetails();
  }, []);

  useEffect(() => {
    if (adminDetails && adminDetails.iterations !== stats.iterations) {
      setStats((prevStats) => ({
        ...prevStats,
        iterations: adminDetails.iterations,
      }));
    }
  }, [adminDetails]);

  return (
    <MainContainer>
      {adminDetails ? (
        <DashboardCards stats={stats} />
      ) : (
        <div className="m-auto w-full h-full flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </MainContainer>
  );
};

export default AdminDashboard;

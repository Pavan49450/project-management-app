import React, { useEffect, useState } from "react";
import { getUserDetailsAPI } from "../../../api/user/userDetails";
import CustomImage from "../../../ui/Image/Image";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { startTour } from "../UserTour";

const UserDashboardHeader = ({ runTourWithAllElements }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await getUserDetailsAPI();
        setUserDetails(result);
        // console.log(result);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserDetails();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear cookies or tokens here
    const cookie = new Cookies();
    cookie.remove("auth-token");
    cookie.remove("role");
    cookie.remove("id");
    cookie.remove("isAdmin");

    // Redirect to login page
    navigate("/");
  };

  return (
    <header className="bg-white  w-full p-2 mb-8 items-end relative ">
      <div className="flex justify-between max-w-7xl mx-auto">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/user-dashboard");
          }}
        >
          <h1 className="text-4xl ml-4">LOGO</h1>
        </div>
        <div>
          {userDetails && (
            <div className="flex gap-4 sm:items-end items-center font-semibold relative">
              <button
                className="ml-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={runTourWithAllElements}
                id="user-tour-btn" // Ensure this ID matches
              >
                Take Tour
              </button>

              <div className="flex gap-2 sm:items-end items-center">
                <img
                  src={require(`../../../assets/icons/learningCenter.gif`)}
                  alt="Learning Center"
                  className="w-8"
                />
                <span className="hidden sm:block">Learning Center</span>
              </div>
              <div className="flex-col sm:flex hidden">
                <span className="text-gray-700 text-sm text-end">Hello! </span>
                <span className="text-gray-700">{userDetails.name}</span>
              </div>
              <div className="relative">
                <CustomImage
                  src={require(`../../../assets/icons/profilePic.png`)}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserDashboardHeader;

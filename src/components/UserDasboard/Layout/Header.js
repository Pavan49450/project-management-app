import React, { useEffect, useState } from "react";
import { getUserDetailsAPI } from "../../../api/user/userDetails";
import CustomImage from "../../../ui/Image/Image";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const UserDashboardHeader = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await getUserDetailsAPI();
        setUserDetails(result);
        console.log(result);
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
        <div>
          <h1 className="text-4xl ml-4">LOGO</h1>
        </div>
        <div>
          {userDetails && (
            <div className="flex gap-4 items-end font-semibold relative">
              <span>Learning Center</span>
              <div className="flex flex-col">
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

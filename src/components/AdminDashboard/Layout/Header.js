import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import MenuIcon from "../../../ui/MenuIcon/MenuIcon";

const Header = ({ toggleSidebar, isOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();

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
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <MenuIcon show={isOpen} action={toggleSidebar} />
          <h1 className="text-3xl font-bold text-gray-900 hidden sm:block">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center">
          <div className="flex gap-2 items-center">
            <img
              src={require(`../../../assets/icons/learningCenter.gif`)}
              alt="Learning Center"
              className="w-8 hidden sm:block"
            />
            <span className="mr-4 hidden sm:block">Learning Center</span>
          </div>
          <div className="relative flex gap-2 items-center">
            <img
              src={require(`../../../assets/icons/profilePic.png`)}
              alt="profile pic"
              className="w-8 rounded-full"
            />
            <span className="hidden sm:block">Demo Contractors</span>
            <img
              src={require(`../../../assets/icons/arrowDown.png`)}
              alt="arrow down"
              className="w-7 p-2 hover:bg-zinc-200 transition-all rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const links = [
    { to: "/admin-dashboard", label: "Dashboard" },
    { to: "/projects-list", label: "Projects" },
    { to: "/users", label: "Users" },
    { to: "/checkout", label: "Recharge your iterations" },
  ];

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 min-h-screen transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:static fixed top-0 right-0 lg:block z-50`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">LOGO</h2>
        </div>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-gray-700"
                  : "block px-4 py-2 hover:bg-gray-700"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
    </div>
  );
};

export default Sidebar;

import { useState } from "react";
import Header from "../../components/AdminDashboard/Layout/Header";
import Sidebar from "../../components/AdminDashboard/Layout/Sidebar";

const MainContainer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <main className="p-2 sm:p-4 lg:p-6">{children}</main>
        <footer className="mt-8 text-center text-gray-500">
          Powered by Structurology
        </footer>
      </div>
    </div>
  );
};

export default MainContainer;

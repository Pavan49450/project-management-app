import { useEffect, useState } from "react";
import DashboardHead from "../../components/UserDasboard/DashboardHead";
import ProjectsList from "../../components/UserDasboard/ProjectsList";
import UserDashboardHeader from "../../components/UserDasboard/Layout/Header";
import { getProjectsAPI } from "../../api/projects/getProjectsAPI";
import usePagination from "../../hooks/use-Pagination";
import Pagination from "../../ui/Pagination/Pagination";

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name");

  const fetchAllProjects = async () => {
    try {
      const result = await getProjectsAPI();
      setProjects(result);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSortOrder("name");
  };

  // Filter projects based on the search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort projects based on the sort order
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "createdOn") {
      return new Date(a.createdOn) - new Date(b.createdOn);
    }
    return 0;
  });

  const { itemsPerPage, currentItems, paginate, totalItems, currentPage } =
    usePagination({
      items: sortedProjects,
      itemsPerPage: 6,
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <UserDashboardHeader />
      <div className="max-w-7xl mx-auto p-4">
        <DashboardHead
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          sortOrder={sortOrder}
          handleSort={handleSort}
          resetSearch={resetSearch}
        />
        {projects.length > 0 ? (
          <ProjectsList projects={currentItems} />
        ) : (
          <p>Loading...</p>
        )}
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={paginate}
        />
      </div>
      <footer className="mt-8 text-center text-gray-500">
        Powered by Structurology
      </footer>
    </div>
  );
};

export default UserDashboard;

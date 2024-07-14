import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import usePagination from "../../hooks/use-Pagination";
import DashboardHead from "../../components/UserDasboard/DashboardHead";
import Pagination from "../../ui/Pagination/Pagination";
import { getProjectsWithAdminId } from "../../api/projects/getProjectsWithAdminId";
import ProjectsList from "../../components/UserDasboard/ProjectsList";
import { CircularProgress } from "@material-ui/core";

const AdminProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name");

  const fetchAllProjects = async () => {
    try {
      const result = await getProjectsWithAdminId();
      setProjects(result);
      //   console.log(result);
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
    <MainContainer>
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
        <div className="m-auto w-full h-full flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={paginate}
      />
    </MainContainer>
  );
};

export default AdminProjectsList;

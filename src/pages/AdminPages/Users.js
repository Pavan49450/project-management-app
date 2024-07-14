// src/pages/UsersPage.js
import React, { useState, useEffect } from "react";
import MainContainer from "./MainContainer";
import usePagination from "../../hooks/use-Pagination";
import DashboardHead from "../../components/UserDasboard/DashboardHead";
import Pagination from "../../ui/Pagination/Pagination";
import { getAdminDetailsAPI } from "../../api/admin/getAdminDetailsAPI";
import { CircularProgress } from "@material-ui/core";
import UserList from "../../components/AdminDashboard/UserList";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name");

  const fetchAdminDetails = async () => {
    try {
      const result = await getAdminDetailsAPI();
      setUsers(result.children);
      //   console.log(result.children);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
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

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users based on the sort order
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "createdOn") {
      return new Date(a.createdOn) - new Date(b.createdOn);
    }
    return 0;
  });

  const { itemsPerPage, currentItems, paginate, totalItems, currentPage } =
    usePagination({
      items: sortedUsers,
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
        title={"All Users"}
      />
      {users.length > 0 ? (
        <UserList users={currentItems} />
      ) : (
        <div className="m-auto w-full h-full flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={paginate}
        currentPage={currentPage}
      />
    </MainContainer>
  );
};

export default UsersPage;

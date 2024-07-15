import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { startTour } from "./UserTour";
const DashboardHead = ({
  searchTerm,
  handleSearch,
  sortOrder,
  handleSort,
  resetSearch,
  title,
}) => {
  const navigate = useNavigate();

  const cookie = new Cookies();

  return (
    <div className="flex justify-between items-center pb-4 gap-4 bg-white rounded-lg p-4 mb-4  md:flex-row flex-col">
      <div className="flex gap-4 items-center md:flex-row flex-col w-full">
        <h1
          id="dashboard-title"
          className="text-2xl font-semibold text-gray-700"
        >
          {title ? title : "Projects"}
        </h1>
        <div className=" flex gap-4 items-center w-full sm:flex-row flex-col">
          <input
            type="text"
            className="border-none bg-zinc-100 focus:outline-none rounded  py-2 px-1 min-w-40 max-w-lg w-full"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="border-none bg-zinc-100 focus:outline-none rounded py-2 px-1 min-w-40 max-w-lg w-full"
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="name">Name</option>
            <option value="date">sort by latest to old</option>
          </select>
          <Button onClick={resetSearch}>clear</Button>
        </div>
      </div>
      {cookie.get("isAdmin") ? null : (
        <div className="flex justify-end w-full">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              navigate("/create-project");
            }}
            id="create-project-btn"
          >
            + Create New
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHead;

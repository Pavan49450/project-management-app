import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

const DashboardHead = ({
  searchTerm,
  handleSearch,
  sortOrder,
  handleSort,
  resetSearch,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center pb-4  bg-white rounded-lg p-4 mb-4">
      <div className="flex gap-4 items-center">
        <h1 className="text-2xl font-semibold text-gray-700">Projects</h1>
        <div className=" flex gap-4 items-center">
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
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => {
          navigate("/create-project");
        }}
      >
        + Create New
      </button>
    </div>
  );
};

export default DashboardHead;

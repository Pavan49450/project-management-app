import React, { useEffect, useState } from "react";
import formatDate from "../../hooks/formatDate";
import CustomImage from "../../ui/Image/Image";
import { useNavigate } from "react-router-dom";
import iterateByUserId from "../../api/projects/iterateByUserId";
import SuccessMessage from "../Projects/SuccessMessage";

const ProjectsList = ({ projects }) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = (projectId) => {
    if (dropdownVisible === projectId) {
      setDropdownVisible(null);
    } else {
      setDropdownVisible(projectId);
    }
  };

  const handleIteration = async () => {
    try {
      const result = await iterateByUserId();
      const message = `${result.msg}, remaining iterations: ${result.admin.iterations}`;
      setSuccessMessage(message);
      // console.log(result);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // Hide message after 3 seconds
    } catch (e) {
      console.error("Error fetching iterations", e);
      alert("Error fetching iterations");
    }
  };

  // useEffect(() => {
  //   console.log(dropdownVisible);
  // });

  return (
    <>
      <SuccessMessage
        setSuccessMessage={setSuccessMessage}
        successMessage={successMessage}
      />
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-white border-b border-gray-200 p-2 font-semibold">
          <div className="w-1/3">
            <p className="text-zinc-400">Project name</p>
          </div>
          <div className="w-1/3 text-zinc-400">
            <p>Created Date</p>
          </div>
          <div className="w-1/3 flex justify-between items-center text-zinc-400">
            <span className="py-1 rounded">Status</span>
          </div>
        </div>
        {projects.map((project) => (
          <div
            key={project._id}
            className="flex justify-between items-center bg-white last:border-none border-b border-gray-200 p-3 pl-8"
          >
            <div className="w-1/3 font-bold">
              <p className="text-gray-700">{project.name}</p>
            </div>
            <div className="w-1/3 text-gray-500 font-semibold">
              <p>{formatDate(project.createdOn).date}</p>
            </div>
            <div className="w-1/3 flex justify-between items-center relative">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                {project.status}
              </span>
              <div className="flex gap-4 items-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                  onClick={handleIteration}
                  id="iteration-run-btn"
                >
                  <CustomImage
                    src={require(`../../assets/icons/play.png`)}
                    alt="play"
                    width="20"
                    height="20"
                    className="w-5"
                  />
                  <span className="ml-2">Run</span>
                </button>
                <span
                  className="text-lg font-bold rounded-full hover:bg-zinc-200 cursor-pointer px-2 py-1 transition-all"
                  onClick={() => toggleDropdown(project._id)}
                  id="project-options"
                >
                  &#x22EE;
                </span>
                <span
                  className="hidden"
                  onClick={() => setDropdownVisible(projects[0]._id)}
                  id="project-options-start"
                >
                  &#x22EE;
                </span>
                <span
                  className="hidden"
                  onClick={() => setDropdownVisible(null)}
                  id="project-options-end"
                >
                  &#x22EE;
                </span>
                {dropdownVisible === project._id && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                    <button
                      className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => navigate(`/edit-project/${project._id}`)}
                      id="project-edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      className="block px-4 py-2 text-left text-gray-300 cursor-not-allowed w-full"
                      disabled={true}
                    >
                      Deactivate
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsList;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iterateByUserId from "../../api/projects/iterateByUserId";

const ProjectHead = ({ projectNameInput, setSuccessMessage }) => {
  const navigate = useNavigate();
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
  return (
    <div className="flex gap-4 justify-between">
      <div className="flex items-center">
        <img
          src={require(`../../assets/icons/previousIcon_s.png`)}
          style={{ width: "25px" }} // Adjust width as needed
          className="hover:bg-zinc-100 rounded-full p-1 transition-all object-contain cursor-pointer"
          alt="edit name"
          onClick={() => {
            navigate("/user-dashboard");
          }}
        />
        <div className="relative">
          <input
            value={projectNameInput.value}
            onChange={(e) => {
              projectNameInput.AssignValue(e.target.value);
            }}
            className=" ml-2 focus:outline-none font-bold text-lg w-44"
          />
        </div>
        <img
          src={require(`../../assets/icons/edit.png`)}
          style={{ width: "30px" }} // Adjust width as needed
          className="hover:bg-zinc-100 rounded-full p-1 transition-all object-contain cursor-pointer"
          alt="edit name"
        />
      </div>
      <div className="flex gap-2">
        <button className="border border-blue-500 text-blue-500 p-2 rounded hover:bg-blue-100 flex items-center justify-center w-20">
          <img
            src={require(`../../assets/icons/save.png`)}
            alt="play"
            width="20"
            height="20"
            className={"w-5"}
          />
          <span className="ml-2 font-semibold">Draft</span>
        </button>
        <button className="border border-blue-500 text-blue-500 p-2 rounded hover:bg-blue-100 flex items-center justify-center w-20">
          <img
            src={require(`../../assets/icons/save.png`)}
            alt="play"
            width="20"
            height="20"
            className={"w-5"}
          />
          <span className="ml-2 font-semibold">Save</span>
        </button>

        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center w-20"
          onClick={handleIteration}
        >
          <img
            src={require(`../../assets/icons/play.png`)}
            alt="play"
            width="20"
            height="20"
            className={"w-5"}
          />
          <span className="ml-2">Run</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectHead;

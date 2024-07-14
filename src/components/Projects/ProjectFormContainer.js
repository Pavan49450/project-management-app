import Cookies from "universal-cookie";
import useInput from "../../hooks/use-Input";
import {
  fullNameValidation,
  ValueUndefinedValidations,
} from "../../InputValidations/InputValidations";
import CustomFileUploader from "../../ui/FileUploader/FileUploader";
import ProjectForm from "./ProjectForm";
import ProjectHead from "./ProjectHead";
import { editProjectWithUserId } from "../../api/projects/editProjectWithUserId";
import { createProject } from "../../api/projects/createProject";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SuccessMessage from "./SuccessMessage";

const ProjectFormContainer = ({ project }) => {
  const cookie = new Cookies();
  const userId = cookie.get("id");
  const imageInput = useInput({ validateValue: ValueUndefinedValidations });

  const projectNameInput = useInput({
    validateValue: fullNameValidation,
    initialValue: project ? project.name : "Project Name",
  });

  const navigate = useNavigate();

  const HandleFormSubmit = (
    description,
    createdBy,
    createdOn,
    start,
    end,
    soilLayers
  ) => {
    const body = {
      name: projectNameInput.value,
      description: description,
      createdBy: userId,
      createdOn: createdOn,
      pMultiplier: {
        start: start,
        end: end,
        soilLayers: soilLayers,
      },
    };

    const projectApi = async () => {
      try {
        const result = project
          ? await editProjectWithUserId(project._id, body)
          : await createProject(body);
        // console.log(result);

        navigate("/user-dashboard");
      } catch (error) {
        console.error(error.message);
      }
    };

    projectApi();
  };

  const [successMessage, setSuccessMessage] = useState("");

  return (
    <>
      <SuccessMessage
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <div
        className="rounded-lg shadow-lg p-4 pt-6 bg-white mt-4 h-full"
        style={{ maxHeight: "600px", height: "600px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full items-center">
          <div className="h-full flex flex-col w-full">
            <ProjectHead
              projectNameInput={projectNameInput}
              setSuccessMessage={setSuccessMessage}
            />
            <ProjectForm project={project} onSubmit={HandleFormSubmit} />
          </div>
          <div>
            <CustomFileUploader
              onChange={(file) => imageInput.AssignValue(file)}
              buttonText="Upload File"
              acceptedFileType={[
                "image/jpeg",
                "image/png",
                "application/pdf",
                "application/msword",
              ]}
              borderColor="#ff6501"
              height="h-96" // Example class for height from Tailwind CSS
              colorTheme="#ececec"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectFormContainer;

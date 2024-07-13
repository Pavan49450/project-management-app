import React, { useState } from "react";
import DetailsForm from "./DetailsForm";
import InputSection from "./InputSection";
import useInput from "../../hooks/use-Input";
import {
  fromDateValidation,
  fullNameValidation,
  ValueUndefinedValidations,
} from "../../InputValidations/InputValidations";

const ProjectForm = ({ project, onSubmit }) => {
  const descriptionInput = useInput({
    validateValue: ValueUndefinedValidations,
    initialValue: project ? project.description : null,
  });
  const createdByInput = useInput({
    validateValue: ValueUndefinedValidations,
    initialValue: project ? project.createdBy : null,
  });
  const createdOnInput = useInput({
    validateValue: fromDateValidation,
    initialValue: project ? project.createdOn : null,
  });
  const detailsFormErrorsInput = useInput({
    validateValue: ValueUndefinedValidations,
  });

  const startInput = useInput({
    validateValue: ValueUndefinedValidations,
    initialValue:
      project && project.pMultiplier ? project.pMultiplier.start : null,
  });
  const endInput = useInput({
    validateValue: ValueUndefinedValidations,
    initialValue:
      project && project.pMultiplier ? project.pMultiplier.end : null,
  });
  //   const soilLayersInput = useInput({
  //     validateValue: fromDateValidation,
  //     initialValue: [],
  //   });
  const pMultiplierFormErrorsInput = useInput({
    validateValue: ValueUndefinedValidations,
  });

  //   const [start, setStart] = useState(0);
  //   const [end, setEnd] = useState(0);
  const [soilLayers, setSoilLayers] = useState(
    project
      ? project.pMultiplier.soilLayers
        ? project.pMultiplier.soilLayers
        : []
      : []
  );

  const handleSubmit = () => {
    console.log({
      description: descriptionInput.value,
      createdBy: createdByInput,
      createdOn: createdOnInput.value,
      start: startInput.value,
      end: endInput.value,
      soilLayers: soilLayers,
    });
    onSubmit(
      descriptionInput.value,
      createdByInput.value,
      createdOnInput.value,
      startInput.value,
      endInput.value,
      soilLayers
    );
  };

  const projectSections = [
    {
      title: "Details",
      element: (
        <DetailsForm
          descriptionInput={descriptionInput}
          createdByInput={createdByInput}
          createdOnInput={createdOnInput}
          errorsInput={detailsFormErrorsInput}
        />
      ),
    },
    {
      title: "Input",
      element: (
        <InputSection
          startInput={startInput}
          endInput={endInput}
          soilLayers={soilLayers}
          setSoilLayers={setSoilLayers}
          errorsInput={pMultiplierFormErrorsInput}
        />
      ),
    },
    // Add more sections as needed
  ];

  const [formSection, setFormSection] = useState("Details");

  //   const [errors, setErrors] = useState({});

  const handleSectionChange = (sectionTitle) => {
    setFormSection(sectionTitle);
  };

  const getNextSectionTitle = () => {
    const currentIndex = projectSections.findIndex(
      (section) => section.title === formSection
    );
    if (currentIndex < projectSections.length - 1) {
      return projectSections[currentIndex + 1].title;
    }
    return null;
  };

  const handleNextClick = () => {
    const nextSectionTitle = getNextSectionTitle();
    if (nextSectionTitle) {
      setFormSection(nextSectionTitle);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex my-4">
          {projectSections.map((section, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 ${
                formSection === section.title
                  ? "border-b border-blue-500 "
                  : "text-gray-300"
              }`}
              onClick={() => handleSectionChange(section.title)}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div
          className="overflow-auto bg-white p-4"
          style={{ maxHeight: "380px" }}
        >
          {
            projectSections.find((section) => section.title === formSection)
              ?.element
          }
        </div>
      </div>

      <div className="flex justify-end my-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleNextClick}
        >
          {getNextSectionTitle() ? "next: " + getNextSectionTitle() : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;

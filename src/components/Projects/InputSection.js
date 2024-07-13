import { useState } from "react";
import PMultiplierForm from "./PMultiplierForm";

const InputSection = ({
  startInput,
  endInput,
  errorsInput,
  soilLayers,
  setSoilLayers,
}) => {
  const subsections = [
    {
      title: "P Multiplier",
      element: (
        <PMultiplierForm
          startInput={startInput}
          endInput={endInput}
          soilLayers={soilLayers}
          errorsInput={errorsInput}
          setSoilLayers={setSoilLayers}
        />
      ),
    },
    // Add more subsections as needed
  ];

  const [activeSubsection, setActiveSubsection] = useState("P Multiplier");

  return (
    <div>
      <div className="flex pb-4">
        {subsections.map((subsection, index) => (
          <div
            className={`pb-2 ${
              activeSubsection === subsection.title
                ? "border-b border-blue-500"
                : "text-gray-300"
            }`}
          >
            <button
              key={index}
              className={`px-3 py-1 ${
                activeSubsection === subsection.title
                  ? "border border-blue-500 rounded-3xl text-blue-500 font-semibold bg-blue-50"
                  : "text-gray-300"
              }`}
              onClick={() => setActiveSubsection(subsection.title)}
            >
              {subsection.title}
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white p-4">
        {
          subsections.find(
            (subsection) => subsection.title === activeSubsection
          )?.element
        }
      </div>
    </div>
  );
};

export default InputSection;

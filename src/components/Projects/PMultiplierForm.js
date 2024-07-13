import { useState } from "react";

const PMultiplierForm = ({
  startInput,
  endInput,
  soilLayers,
  setSoilLayers,
  errorsInput,
}) => {
  const [newSoilLayer, setNewSoilLayer] = useState("");

  const handleStartChange = (e) => {
    startInput.AssignValue(e.target.value);
  };

  const handleEndChange = (e) => {
    endInput.AssignValue(e.target.value);
  };

  const handleNewSoilLayerChange = (e) => {
    setNewSoilLayer(e.target.value);
  };

  const handleAddSoilLayer = () => {
    if (newSoilLayer.trim() !== "") {
      const layer = Number(newSoilLayer.trim());
      if (!isNaN(layer)) {
        setSoilLayers([...soilLayers, layer]);
        setNewSoilLayer("");
      }
    }
  };

  const handleDeleteSoilLayer = (index) => {
    const updatedSoilLayers = soilLayers.filter((_, i) => i !== index);
    setSoilLayers(updatedSoilLayers);
  };

  const validate = () => {
    const newErrors = {};
    if (!startInput.value) newErrors.start = "Start is required";
    if (!endInput.value) newErrors.end = "End is required";
    if (soilLayers.length === 0)
      newErrors.soilLayers = "At least one soil layer is required";
    errorsInput.AssignValue(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <form className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-zinc-400 text-sm font-semibold">
            P Multiplier Start
          </label>
          <input
            type="number"
            value={startInput.value}
            onChange={handleStartChange}
            className="bg-zinc-200 p-2 rounded-md focus:outline-none"
          />
          {errorsInput.value.start && (
            <span className="text-red-500 text-sm">
              {errorsInput.value.start}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-zinc-400 text-sm font-semibold">
            P Multiplier End
          </label>
          <input
            type="number"
            value={endInput.value}
            onChange={handleEndChange}
            className="bg-zinc-200 p-2 rounded-md focus:outline-none"
          />
          {errorsInput.value.end && (
            <span className="text-red-500 text-sm">
              {errorsInput.value.end}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 col-span-2">
          <label className="text-zinc-400 text-sm font-semibold">
            New Soil Layer
          </label>
          <div className="flex gap-4 items-center justify-between">
            <input
              type="text"
              value={newSoilLayer}
              onChange={handleNewSoilLayerChange}
              className=" bg-zinc-200 p-2 rounded-md focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSoilLayer}
              className="text-blue-500 hover:bg-zinc-200 rounded-lg p-1  font-semibold  transition-all"
            >
              + Add Soil Layer
            </button>
          </div>
          {errorsInput.value.soilLayers && (
            <span className="text-red-500 text-sm">
              {errorsInput.value.soilLayers}
            </span>
          )}
        </div>
        <div
          className="col-span-2 overflow-y-auto"
          style={{ maxHeight: "200px" }}
        >
          <label className="text-zinc-400 text-sm font-semibold">
            Soil Layers
          </label>
          <ul className="flex flex-col gap-2">
            {soilLayers.map((layer, index) => (
              <li
                key={index}
                className="flex items-center justify-between shadow-sm py-2"
              >
                {layer}
                <button
                  type="button"
                  onClick={() => handleDeleteSoilLayer(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default PMultiplierForm;

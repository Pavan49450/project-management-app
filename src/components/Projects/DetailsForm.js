const DetailsForm = ({
  descriptionInput,
  createdByInput,
  createdOnInput,
  errorsInput,
}) => {
  const handleDescriptionChange = (e) => {
    descriptionInput.AssignValue(e.target.value);
  };

  const handleCreatedByChange = (e) => {
    createdByInput.AssignValue(e.target.value);
  };

  const handleCreatedOnChange = (e) => {
    createdOnInput.AssignValue(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!descriptionInput.value)
      newErrors.description = "Description is required";
    if (!createdByInput.value) newErrors.createdBy = "Created By is required";
    if (!createdOnInput.value) newErrors.createdOn = "Created On is required";
    errorsInput.AssignValue(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      // Move to the next section
    }
  };

  return (
    <div>
      <form className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-zinc-400 text-sm font-semibold">
            Description
          </label>
          <input
            type="text"
            value={descriptionInput.value}
            onChange={handleDescriptionChange}
            className="bg-zinc-200 p-2 rounded-md focus:outline-none"
          />
          {errorsInput.value.description && (
            <span className="text-red-500 text-sm">
              {errorsInput.value.description}
            </span>
          )}
        </div>
        {/* <div className="flex flex-col gap-1">
          <label className="text-zinc-400 text-sm font-semibold">
            Created By
          </label>
          <input
            type="text"
            value={createdByInput.value}
            onChange={handleCreatedByChange}
            className="bg-zinc-200 p-2 rounded-md focus:outline-none"
          />
          {errorsInput.value.createdBy && (
            <span className="text-red-500 text-sm">
              {errorsInput.value.createdBy}
            </span>
          )}
        </div> */}
        <div className="flex flex-col gap-1">
          <label className="text-zinc-400 text-sm font-semibold">
            Created On
          </label>
          <input
            type="date"
            value={createdOnInput.value}
            onChange={handleCreatedOnChange}
            className="bg-zinc-200 p-2 rounded-md focus:outline-none"
          />
          {errorsInput.value.createdOn && (
            <span className="text-red-500 text-sm">
              {errorsInput.value.createdOn}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;

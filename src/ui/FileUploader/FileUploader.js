import React, { useRef, useState } from "react";
import style from "./FileUploader.module.css";
import CustomImage from "../Image/Image";
import HideExtraText from "../HideExtraText/HideExtraText";
import LoadingBar from "../loadingBar/loadingBar";

const ContainerClasses =
  " rounded-lg text-center cursor-pointer w-full relative z-10 overflow-hidden";

const CustomFileUploader = ({
  onChange,
  buttonText,
  acceptedFileType = [],
  mandatory,
  className,
  borderColor,
  height,
  colorTheme,
}) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL

  const loadingTime = 1;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    setDragOver(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    setIsLoading(true); // Set loading state to true when file upload starts
    if (file && acceptedFileType.includes(file.type) && file.size <= 5242880) {
      // Simulating delay for demonstration purposes (remove in actual implementation)
      setTimeout(() => {
        onChange(file);
        setFileName(file.name);
        setFileSize(file.size);
        setIsLoading(false); // Set loading state to false when file upload completes
        // Handle image preview
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview(null);
        }
      }, loadingTime * 1000); // Simulated delay of 2 seconds
    } else {
      setIsLoading(false); // Set loading state to false if file is invalid
      // Handle invalid file
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDelete = () => {
    setFileName(null);
    setFileSize(null);
    setImagePreview(null);
    onChange(null); // Clear file from onChange handler (if any)
  };

  return (
    <div
      style={{ position: "relative", width: "100%" }}
      className={`${height} ${className}`}
    >
      <div
        className={`${ContainerClasses} ${style.container} ${height}`}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleButtonClick}
        style={{ borderColor: colorTheme || "#ff6501" }}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept={acceptedFileType.join(",")}
        />
        <DragComponent height={height} dragOver={dragOver} />
        <ContentComponent
          height={height}
          dragOver={dragOver}
          fileName={fileName}
          isLoading={isLoading}
          buttonText={buttonText}
          fileSize={fileSize}
          loadingTime={loadingTime}
          imagePreview={imagePreview} // Pass image preview to ContentComponent
          onDelete={handleDelete} // Pass delete function to ContentComponent
        />
      </div>
    </div>
  );
};

export default CustomFileUploader;

const ContentComponent = ({
  height,
  fileName,
  dragOver,
  isLoading,
  buttonText,
  fileSize,
  loadingTime,
  imagePreview, // Receive image preview URL
  onDelete, // Receive delete function
}) => {
  return (
    <div
      className={`flex flex-col justify-center gap-4 items-center content-center w-full p-4 relative ${height} ${
        dragOver ? " hidden" : "flex"
      } ${style.box}`}
    >
      {isLoading ? (
        <LoadingBar loadingTime={loadingTime} />
      ) : (
        <>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt=""
              width={60}
              height={60}
              style={{ width: "100%", height: "80%" }}
              className={`hover:scale-105 transition-all`}
            />
          ) : (
            <img
              src={`/assets/icons/${
                fileName ? "fileReplaceIcon.png" : "fileUploaderIcon.png"
              }`}
              alt=""
              width={60}
              height={60}
              className={`${style.imageContainer} w-24`}
            />
          )}
          <div className="text-center">
            {fileName ? (
              <div className="flex justify-between w-full items-center gap-4">
                <HideExtraText lines={2} className="block">
                  {fileName}{" "}
                  {fileSize && ` (${(fileSize / 1024).toFixed(2)} KB)`}
                </HideExtraText>
                <div>
                  <img
                    src={require(`../../assets/icons/delete.png`)}
                    className="w-9 p-2 hover:bg-zinc-200 transition-all rounded-full "
                    alt="delete"
                    onClick={onDelete} // Call onDelete function on click
                  />
                </div>
              </div>
            ) : (
              <DefaultText buttonText={buttonText} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const DragComponent = ({ height, dragOver }) => {
  return (
    <div
      className={`${
        dragOver
          ? "flex flex-col justify-center items-center content-center w-full bg-zinc-100 "
          : "hidden"
      } ${style.box} ${height} absolute top-0 left-0 right-0 bottom-0`}
    >
      <>
        <span className="sm:text-base text-sm">
          {"Drag and Drop the file here"}
        </span>
        <p className="text-xs text-zinc-500">
          File can be PDF, DOC; of size 5MB
        </p>
      </>
    </div>
  );
};

const DefaultText = ({ buttonText }) => {
  return (
    <>
      <p className="sm:text-xl font-semibold text-black text-center">
        {buttonText}
      </p>
      <p className="text-xs ">Drag and Drop the file</p>
    </>
  );
};

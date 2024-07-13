import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Image.css";
import GhostLoading from "../../animations/GhostLoading";

const CustomImage = ({
  src,
  alt,
  className,

  style,
  onClick,
  classForDiv,
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`custom-image-wrapper ${classForDiv}`}>
      {loading && <GhostLoading count={1} />}
      <img
        src={src}
        alt={alt}
        className={`custom-image  ${className} ${loading ? "loading" : ""}`}
        onLoad={handleImageLoad}
        style={style}
        onClick={onClick}
      />
    </div>
  );
};

CustomImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loadingComponent: PropTypes.element,
};

CustomImage.defaultProps = {
  className: "",
  loadingComponent: <div>Loading...</div>,
};

export default CustomImage;

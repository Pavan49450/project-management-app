import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import Image from "next/image";
import CustomImage from "../Image/Image";
import HideExtraText from "../HideExtraText/HideExtraText";

const Dropdown = ({
  options,
  onSelect,
  onDeselect, // Add onDeselect prop
  placeholder,
  className,
  style,
  mandatory,
  inputStyles,
  optionStyles,
  initialValue,
  colorTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (onDeselect) {
      handleDeselect();
    }
  }, [onDeselect]);

  // Function to handle deselection
  const handleDeselect = () => {
    setSelectedOption(null);
    setIsOpen(false);
    onSelect(null);
  };

  const InputStyles = {
    ...inputStyles,
    borderColor: colorTheme,
  };

  const OptionStyles = {
    ...optionStyles,
    borderColor: colorTheme,
  };

  return (
    <div className={`${styles.customDropdown} ${className}`} style={style}>
      <div
        className={styles.selectedOption}
        onClick={toggleDropdown}
        style={InputStyles}
      >
        <span
          className={`${
            selectedOption ? styles.transition : styles.placeholder
          }`}
        >
          {placeholder}
          <span style={{ color: "red" }}>&nbsp;{mandatory && "*"}</span>
        </span>
        {(selectedOption && selectedOption.label) || selectedOption}

        <CustomImage
          src={`/assets/icons/${
            isOpen ? "arrowUpPrimary.png" : "arrowDownPrimary.png"
          }`}
          className={`${styles.arrow} ${colorTheme && "grayscale"}`}
          classForDiv={`${styles.arrowContainer} `}
          alt=""
        />
      </div>

      {options && options.length > 0 && (
        <ul
          className={`${styles.options} ${isOpen && styles.optionsActive}`}
          style={OptionStyles}
        >
          {options.map((option) => (
            <li
              key={option.value || option}
              onClick={() => handleOptionClick(option)}
            >
              {option.label || option}
            </li>
          ))}
          {selectedOption && ( // Render deselect option if an option is selected
            <li onClick={handleDeselect} className="bg-zinc-300">
              Clear Selection
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

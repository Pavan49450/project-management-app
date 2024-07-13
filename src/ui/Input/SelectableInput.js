import { useEffect, useState } from "react";
import InputWithInvalidText from "./InputWithInvalidText";
import useInput from "@/hooks/use-Input";
import { nameValidation } from "@/components/InputValidations/InputValidations";
import {
  optionClasses,
  selectedOptionClasses,
} from "@/components/tailwindClasses/ButtonClassess";

const SuggestionClasses =
  "bg-white rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-zinc-100 transition-all";

const SelectableInput = ({
  options,
  placeholder,
  onChange,
  minNoOfOptions,
  initialValue,
  cancelInput,
}) => {
  // const [optionsInput.value, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(initialValue || []);

  const optionsInput = useInput({ validateValue: nameValidation });

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        option,
      ]);
      optionsInput.AssignValue("");
    }
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  useEffect(() => {
    setSelectedOptions(initialValue);
  }, [cancelInput?.value]);

  const handleRemoveOption = (index) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((_, i) => i !== index)
    );
  };

  const handleAddCustomOption = () => {
    if (
      optionsInput.value.trim() !== "" &&
      !options.includes(optionsInput.value)
    ) {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        optionsInput.value,
      ]);
      optionsInput.AssignValue("");
    }
  };

  const filteredOptions = options
    .filter((option) =>
      option.toLowerCase().includes(optionsInput.value.toLowerCase())
    )
    .filter((option) => !selectedOptions.includes(option)); // Filter out selected options

  return (
    <div className="max-w-4xl mx-auto mt-4 w-full ">
      <div id="selectedOptions" className="flex flex-wrap gap-2 mb-4 min-h-8">
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className={selectedOptionClasses}
            onClick={() => handleRemoveOption(index)}
          >
            {option} &#x2715;
          </div>
        ))}
      </div>

      <InputWithInvalidText
        type="text"
        id="input"
        inputFields={optionsInput}
        placeholder={placeholder || "Type here..."}
        className="mb-4"
        colorTheme="#00000021"
      />
      <div className="flex flex-wrap gap-2">
        {filteredOptions.slice(0, minNoOfOptions || 6).map((option, index) => (
          <span
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`${optionClasses} min-w-fit`}
          >
            {option}
            {" +"}
          </span>
        ))}
        {optionsInput.value.trim() !== "" &&
          !options.includes(optionsInput.value) && (
            <span className={optionClasses} onClick={handleAddCustomOption}>
              {optionsInput.value}
              {" +"}
            </span>
          )}
      </div>
    </div>
  );
};

export default SelectableInput;

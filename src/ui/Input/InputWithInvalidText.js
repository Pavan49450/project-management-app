import React, { useState } from "react";
import CustomInput from "./Input";
import style from "./CustomInput.module.css";
import CustomImage from "../Image/Image";
const InputWithInvalidText = ({
  ErrorMessage,
  inputFields,
  className,
  mandatory,
  type,
  placeholder,
  styles,
  inputStyles,
  colorTheme,
}) => {
  // const inputRef = useRef(null);

  const [checkPassword, setCheckPassword] = useState(false);

  // const handleLabelClick = () => {
  //   inputRef.current.focus();
  // };

  // useEffect(() => {
  //   if (inputFields.value) {
  //     inputFields.focusHandler();
  //   }
  // });

  return (
    <div className={`${style.InputContainer}  ${className}`} style={styles}>
      <CustomInput
        className={`${style.checkoutFormControl} ${
          inputFields.hasError && style.invalid
        }`}
        placeholder={placeholder}
        value={inputFields.value}
        colorTheme={colorTheme}
        // onFocus={inputFields.focusHandler}
        // onBlur={inputFields.validateValueHandler}
        onChange={inputFields.valueChangeHandler}
        type={`${type === "password" && checkPassword ? "text" : type}`}
        style={inputStyles}
        mandatory={mandatory}
      />
      {type === "password" && (
        <CustomImage
          src={require(`../../assets/icons/${
            checkPassword ? "showPassword.png" : "hidePassword.png"
          }`)}
          alt=""
          className={`${style.checkPassword} ${
            colorTheme && "grayscale"
          } transition-all`}
          classForDiv={style.checkPasswordContainer}
          onClick={() => setCheckPassword(!checkPassword)}
        />
      )}

      {ErrorMessage && (
        <p
          className={style.invalidText}
          style={{
            opacity: inputFields.hasError ? "1" : "0",
          }}
        >
          {ErrorMessage}
        </p>
      )}
    </div>
  );
};

export default InputWithInvalidText;

import { passwordValidation } from "../../../InputValidations/InputValidations";
import CustomImage from "../../Image/Image";
import style from "./PasswordValidationBox.module.css";
const PasswordValidationBox = ({ enteredPassword, isTouched }) => {
  return (
    <div
      className={`${
        !passwordValidation(enteredPassword) && isTouched
          ? "opacity-100 z-20"
          : "opacity-0 translate-y-full -z-50"
      } ${style.passwordValidationContainer} transition-all `}
    >
      {[
        {
          condition: enteredPassword.length >= 8,
          message: "Password must be 8 Characters long",
        },
        {
          condition: /[A-Z]/.test(enteredPassword),
          message: "Should contain at least one Capital letter",
        },
        {
          condition: /[!@#$%^&*(),.?":{}|<>]/.test(enteredPassword),
          message: "Should contain one Special character",
        },
        {
          condition: /\d/.test(enteredPassword),
          message: "Should contain one Numeric digit",
        },
      ].map((item, index) => (
        <div key={index} className={style.passwordValidation}>
          <ValidatePasswordFunction validate={item.condition} />
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
};

export default PasswordValidationBox;

const ValidatePasswordFunction = ({ validate }) => (
  <CustomImage
    src={require(`../../../assets/icons/${
      validate ? "correct.png" : "wrong.png"
    }`)}
    alt=""
  />
);

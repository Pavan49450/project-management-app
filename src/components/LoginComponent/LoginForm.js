import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import InputWithInvalidText from "../../ui/Input/InputWithInvalidText";

const LoginForm = ({
  emailInput,
  passwordInput,
  onSubmit,
  isAdmin,
  setIsAdmin,
}) => {
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(emailInput.isValid && passwordInput.isValid);
  }, [emailInput.isValid, passwordInput.isValid]);

  const handleAdminCheckboxChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <div className="w-full max-w-lg mt-44 flex flex-col gap-4 p-4">
      <h2 className="text-5xl font-bold text-center mb-8">Sign in</h2>
      <p className="text-gray-400 text-center mb-4 text-xl">
        Please login to your account
      </p>
      <div>
        <InputWithInvalidText
          inputFields={emailInput}
          placeholder={"Enter your E-mail address"}
          ErrorMessage={"Invalid email"}
          colorTheme={"#cccccc2b"}
        />
        <InputWithInvalidText
          inputFields={passwordInput}
          placeholder={"Enter your Password"}
          ErrorMessage={"Invalid password"}
          colorTheme={"#cccccc2b"}
          type={"password"}
        />
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={handleAdminCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="isAdmin" className="text-gray-500">
            I am an admin
          </label>
        </div>
      </div>
      <Button
        onClick={() => {
          onSubmit(emailInput.value, passwordInput.value, isAdmin);
        }}
        disabled={!formIsValid}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginForm;

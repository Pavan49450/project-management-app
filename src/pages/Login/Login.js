import { useState } from "react";
import LoginForm from "../../components/LoginComponent/LoginForm";
import useInput from "../../hooks/use-Input";

import { loginAPI } from "../../api/Login/Login"; // Import the API function
import {
  emailValidation,
  passwordValidation,
} from "../../InputValidations/InputValidations";
import SignUpOrLoginContainer from "../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailInput = useInput({ validateValue: emailValidation });
  const passwordInput = useInput({ validateValue: passwordValidation });

  const [isAdmin, setIsAdmin] = useState(false);

  const loginScreenData = {
    description:
      "You’re one step away to unlock all the possible features of Udhyogi ",
    image: "LoginPageScreen.svg",
  };

  const cookie = new Cookies();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email, password) => {
    setIsLoading(true); // Start loading spinner
    const data = await loginAPI(email, password, isAdmin);
    console.log(data);
    if (data.apiReturned) {
      cookie.set("auth-token", data.result.token);
      cookie.set("role", data.result.role);
      cookie.set("id", data.result.id);
      cookie.set("isAdmin", data.result.role === "admin");
      setIsLoading(false); // Stop loading spinner after successful login or error occurred.

      if (data.result.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      alert(data.errorMsg);
      setIsLoading(false); // Stop loading spinner after successful login or error occurred.
    }
  };

  return (
    <SignUpOrLoginContainer screenData={loginScreenData} smallFrame={true}>
      <LoginForm
        emailInput={emailInput}
        passwordInput={passwordInput}
        onSubmit={handleSubmit}
        setIsAdmin={setIsAdmin}
        isAdmin={isAdmin}
        isLoading={isLoading}
      />
    </SignUpOrLoginContainer>
  );
};

export default Login;

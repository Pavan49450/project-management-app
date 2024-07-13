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

  const handleSubmit = async (email, password) => {
    try {
      const result = await loginAPI(email, password, isAdmin);
      // console.log(result);

      cookie.set("auth-token", result.token);
      cookie.set("role", result.role);
      cookie.set("id", result.id);
      cookie.set("isAdmin", result.role === "admin");

      if (result.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
      // Handle success (e.g., store user data, navigate to dashboard)
    } catch (error) {
      console.error(error.message);
      // Handle error (e.g., show error message to user)
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
      />
    </SignUpOrLoginContainer>
  );
};

export default Login;

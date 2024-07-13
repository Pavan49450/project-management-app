import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import UserDashboard from "./pages/UserPages/UserDashboard";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import EditProject from "./pages/UserPages/EditProject";
import NewProject from "./pages/UserPages/NewProject";

const cookies = new Cookies();

function App() {
  const [token, setToken] = useState(cookies.get("auth-token"));
  const [isAdmin, setIsAdmin] = useState(cookies.get("isAdmin"));

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = cookies.get("auth-token");
      const newIsAdmin = cookies.get("isAdmin");

      if (newToken !== token || newIsAdmin !== isAdmin) {
        setToken(newToken);
        setIsAdmin(newIsAdmin);
      }
    }, 1000); // Check every 1 second

    return () => clearInterval(interval);
  }, [token, isAdmin]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: !token ? <Login /> : <ErrorPage />,
    },
    {
      path: "/user-dashboard",
      element: token && !isAdmin ? <UserDashboard /> : <ErrorPage />,
    },
    {
      path: "create-project",
      element: token && !isAdmin ? <NewProject /> : <ErrorPage />,
    },
    {
      path: "edit-project/:projectId",
      element: token && !isAdmin ? <EditProject /> : <ErrorPage />,
    },
    {
      path: "/admin-dashboard",
      element: token && isAdmin ? <AdminDashboard /> : <ErrorPage />,
    },
    {
      path: "project-list",
      element: token && isAdmin ? <AdminDashboard /> : <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

const ErrorPage = () => {
  return (
    <div>
      <h1>Error 404: Page Not Found</h1>
    </div>
  );
};

// const UserLoggedInErrorPage = () => {
//   const token = useState(cookies.get("auth-token"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     } else {
//       navigate("/user-dashboard");
//     }
//   }, []);
//   return (
//     <div>
//       <h1>Error 404: Page Not Found</h1>
//     </div>
//   );
// };

import ProjectForm from "../../components/Projects/ProjectFormContainer";
import UserDashboardHeader from "../../components/UserDasboard/Layout/Header";
import NavigationLinks from "../../components/NavigationLinks";

const navigationData = [
  {
    to: "/user-dashboard",
    label: "dashboard",
    iconSrc: "nextIcon_s.png",
    alt: "next",
  },
  {
    to: "/create-project",
    label: "create new",
  },
];

const NewProject = () => {
  return (
    <div className="bg-zinc-100 min-h-screen">
      <UserDashboardHeader />
      <div className="max-w-7xl mx-auto">
        <NavigationLinks navigationData={navigationData} />
        <ProjectForm />
      </div>
    </div>
  );
};

export default NewProject;

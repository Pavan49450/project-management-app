import { useEffect, useState } from "react";
import { getProjectWithIdAPI } from "../../api/projects/getProjectWithIdAPI";
import { useParams } from "react-router-dom";
import UserDashboardHeader from "../../components/UserDasboard/Layout/Header";
import ProjectForm from "../../components/Projects/ProjectFormContainer";
import NavigationLinks from "../../components/NavigationLinks";

const EditProject = () => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  const { projectId } = useParams();

  const fetchProject = async (id) => {
    try {
      const projectData = await getProjectWithIdAPI(id);
      setProject(projectData);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    console.log(projectId);

    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId]);

  const navigationData = [
    {
      to: "/user-dashboard",
      label: "dashboard",
      iconSrc: "nextIcon_s.png",
      alt: "next",
    },
    {
      to: `/edit-project/${projectId}`,
      label: `edit Project`,
    },
  ];

  return (
    <div className="bg-zinc-100 min-h-screen">
      <UserDashboardHeader />
      {error && <p className="text-red-500">{error}</p>}
      {project ? (
        <div className="max-w-7xl mx-auto">
          <NavigationLinks navigationData={navigationData} />
          <ProjectForm project={project} />
        </div>
      ) : (
        <p>Loading project details...</p>
      )}
      {/* Form to edit the project */}
    </div>
  );
};

export default EditProject;

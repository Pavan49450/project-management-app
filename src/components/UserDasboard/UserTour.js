import introJs from "intro.js";
import "intro.js/introjs.css";

export const startTour = () => {
  const intro = introJs();

  // Function to click the options button before showing the corresponding step
  const clickOptionsButton = () => {
    document.getElementById("project-options-start").click(); // Replace with your actual logic
  };

  intro.setOptions({
    steps: [
      {
        element: "#dashboard-section",
        intro:
          "Welcome to your dashboard! This is where you manage your projects.",
        // Run clickOptionsButton before showing this step
        onbeforechange: () => {
          clickOptionsButton();
        },
      },
      {
        element: "#create-project-btn",
        intro: "Click here to create a new project.",
      },
      {
        element: "#iteration-run-btn",
        intro:
          "Click here to run a project which deducts the from the total iterations",
      },
      {
        element: "#project-options",
        intro: "You can explore more options for the project here",
      },
      {
        element: "#project-edit-btn",
        intro:
          "Clicking here takes you to the project edit page where you can make changes accordingly.",
      },
    ],
  });

  // Handle completion of the tour
  intro.oncomplete(() => {
    // Execute code after the tour completes
    closeOptionsDropdown();
  });

  // Start the tour
  intro.start();

  // Function to close options dropdown
  const closeOptionsDropdown = () => {
    document.getElementById("project-options-end").click(); // Replace with your actual logic
  };
};

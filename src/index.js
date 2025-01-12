import { renderProjects, setupNewProjectForm } from "./modules/dom";
import { initializeData } from "./modules/storage";

window.addEventListener("load", () => {
  initializeData();
  renderProjects();
  setupNewProjectForm();
});

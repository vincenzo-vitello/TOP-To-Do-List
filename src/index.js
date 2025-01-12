import { renderProjects, setupNewProjectForm } from "./modules/dom";
import { loadData, initializeData } from "./modules/storage";

window.addEventListener("load", () => {
  initializeData();
  const { projects } = loadData();
  renderProjects(projects);
  setupNewProjectForm();
});

import {
  renderProjects,
  setupNewProjectForm,
  filterProjects,
} from "./modules/dom";
import { initializeData } from "./modules/storage";

window.addEventListener("load", () => {
  initializeData();
  renderProjects();
  setupNewProjectForm();
  filterProjects();
});

import { getOpenProjects } from "./modules/controller";
import {
  renderProjects,
  setupNewProjectForm,
  filterProjects,
  handleAddProjectBtn,
  cancelProjectCreation,
  setColorScheme,
} from "./modules/dom";
import { initializeData } from "./modules/storage";
import "./styles.css";
window.addEventListener("load", () => {
  initializeData();
  renderProjects(getOpenProjects);
  setupNewProjectForm();
  filterProjects();
  handleAddProjectBtn();
  cancelProjectCreation();
  setColorScheme();
});

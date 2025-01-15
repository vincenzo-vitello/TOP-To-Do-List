import {
  renderProjects,
  setupNewProjectForm,
  filterProjects,
  handleAddProjectBtn,
} from "./modules/dom";
import { initializeData } from "./modules/storage";
import "./styles.css";
window.addEventListener("load", () => {
  initializeData();
  renderProjects();
  setupNewProjectForm();
  filterProjects();
  handleAddProjectBtn();
});

import { loadData, deleteProject } from "./storage";
import { renderProjects } from "./dom";

function removeProject(id) {
  deleteProject(id);
  const updatedData = loadData();
  renderProjects(updatedData.projects);
}

export { removeProject };

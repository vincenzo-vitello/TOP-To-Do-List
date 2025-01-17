import { deleteProject, loadData, saveData } from "./storage";

export function removeProject(id) {
  deleteProject(id);
}

export function isDueThisWeek(project) {
  const today = new Date();
  const startOfWeek = new Date(today);
  const endOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  endOfWeek.setDate(today.getDate() - today.getDay() + 7);
  endOfWeek.setHours(23, 59, 59, 999);

  const projectDate = new Date(project.dueDate);

  return projectDate >= startOfWeek && projectDate <= endOfWeek;
}
export function isDueToday(project) {
  const today = new Date();
  const projectDate = new Date(project.dueDate);

  today.setHours(0, 0, 0, 0);
  projectDate.setHours(0, 0, 0, 0);

  return today.getTime() === projectDate.getTime();
}
export function getCompletedProjects() {
  const data = loadData();
  return data.projects.filter((project) => project.isDone === true);
}
export function getOpenProjects() {
  const data = loadData();
  return data.projects.filter((project) => !project.isDone);
}
export function updateProjectStatus(projectId, status) {
  const data = loadData();
  const project = data.projects.find((p) => p.id === projectId);

  if (project) {
    project.isDone = status;
    saveData(data);
  } else {
    console.warn("Project not found!");
  }
}

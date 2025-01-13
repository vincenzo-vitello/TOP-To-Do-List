import { createProject } from "./project";
import { generateUniqueId } from "../global_functions/generateUniqueId";

const STORAGE_KEY = "todoAppData";

const initialData = {
  projects: [],
};

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function loadData() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  //   console.log("Loaded data:", storedData);
  return storedData ? JSON.parse(storedData) : { projects: [] };
}
function initializeData() {
  const data = loadData();
  if (!data) {
    saveData(initialData);
  }
}
function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}
function addProject(title, description, dueDate, priority, tasks = []) {
  const data = loadData();
  const newProject = createProject(
    generateUniqueId(),
    title,
    description,
    dueDate,
    priority,
    tasks
  );
  data.projects.push(newProject);
  saveData(data);
}
function updateProject(updatedProject) {
  const data = loadData();
  data.projects = data.projects.map((project) => {
    if (project.id === updatedProject.id) {
      return updatedProject;
    }
    return project;
  });
  saveData(data);
}
function deleteProject(projectId) {
  const data = loadData();
  data.projects = data.projects.filter((project) => project.id !== projectId);
  saveData(data);
}
function addTaskToProject(projectId, taskTitle) {
  const data = loadData(); // Carica i dati dal localStorage
  const project = data.projects.find((project) => project.id === projectId); // Trova il progetto

  if (project) {
    project.tasks.push({ title: taskTitle }); // Aggiungi il task al progetto
    updateProject(project); // Salva il progetto aggiornato
  } else {
    console.error(`Project with ID ${projectId} not found`);
  }
}
function removeTaskFromProject(projectId, taskTitle) {
  const data = loadData();
  const project = data.projects.find((project) => project.id === projectId);

  if (project) {
    project.tasks = project.tasks.filter((task) => task.title !== taskTitle);
    updateProject(project);
  } else {
    console.error(`Project with ID ${projectId} not found`);
  }
}
export {
  loadData,
  initializeData,
  clearData,
  addProject,
  updateProject,
  deleteProject,
  addTaskToProject,
  removeTaskFromProject,
};

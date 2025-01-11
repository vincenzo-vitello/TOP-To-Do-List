// import { createProject } from "./project";
const STORAGE_KEY = "todoAppData";

const initialData = {
  projects: [{}],
};

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function loadData() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : null;
}
// saveData([
//   { title: "test", description: "test" },
//   { title: "test2", description: "test2" },
// ]);
// loadData();
// console.log(localStorage.getItem("todoAppData"));
function initializeData() {
  const data = loadData();
  if (!data) {
    saveData(initialData);
  }
}
function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}
function addProject() {
  const data = loadData();
  data.projects.push(project);
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
  saveData();
}
// const projectTest = createProject(
//   1,
//   "test",
//   "test description",
//   "due date test",
//   "high priority",
//   ["check functionality", "test"]
// );
// saveData(projectTest);
// // initializeData();
// console.log(localStorage.getItem("todoAppData"));
export {
  loadData,
  initializeData,
  clearData,
  addProject,
  updateProject,
  deleteProject,
};

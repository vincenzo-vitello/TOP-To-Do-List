import { createProject } from "./project";
import { loadData, addProject, updateProject, deleteProject } from "./storage";

const { projects } = loadData();
//TODO: muovi la funzione di rendering dentro dom.js e usa controller solo per la gestione dei dati
function renderProjects() {
  const container = document.getElementById("projects_container");

  container.innerHTML = "";
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project_card");
    const taskList = project.tasks
      .map((task) => `<li class="task">${task.title}</li>`)
      .join("");
    projectCard.innerHTML = `
        <h3 class="title">${project.title}</h3>
        <p class="description">${project.description}</p>
        <p class="due_date">${project.dueDate}</p>
        <p class="priority">Priority: ${project.priority}</p>
        <ul class="task_list">
            ${taskList}
        </ul>
        <button class="complete_btn">Mark As Complete</button>
        <button class="expand_btn">Expand</button>
        <button class="delete_project_btn">Delete Project</button>
    `;

    const deleteBtn = projectCard.querySelector(".delete_project_btn");
    deleteBtn.addEventListener("click", () => removeProject(project.id));

    container.appendChild(projectCard);
  });
}
function removeProject(id) {
  deleteProject(id);
  renderProjects();
}

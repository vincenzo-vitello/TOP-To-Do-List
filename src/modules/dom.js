import { removeProject } from "./controller";
import { addProject, loadData } from "./storage";

function handleProjectCreation(event) {
  event.preventDefault();

  const title = document.getElementById("title-input").value;
  const description = document.getElementById("description-input").value;
  const dueDate = document.getElementById("dueDate-input").value;
  const priority = document.getElementById("priority-input").value;

  addProject(title, description, dueDate, priority);

  renderProjects();
  document.getElementById("project-form").reset();
}

function setupNewProjectForm() {
  const form = document.getElementById("project-form");
  form.addEventListener("submit", handleProjectCreation);
}

function createProjectCard(project) {
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
  deleteBtn.addEventListener("click", () => {
    removeProject(project.id);
    renderProjects();
  });
  return projectCard;
}

function renderProjects() {
  const container = document.getElementById("projects_container");
  const { projects } = loadData();
  //   console.log(projects);
  //   console.log(projects.length);
  container.innerHTML = "";

  const emptyContainer = document.createElement("p");
  emptyContainer.className = "empty-container-message";
  emptyContainer.textContent = "no projects created";

  if (projects.length !== 0) {
    projects.forEach((element) => {
      container.appendChild(createProjectCard(element));
    });
  } else {
    container.appendChild(emptyContainer);
  }
}

export { renderProjects, setupNewProjectForm };

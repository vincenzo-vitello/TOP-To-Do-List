import { removeProject } from "./controller";
import {
  addProject,
  loadData,
  addTaskToProject,
  removeTaskFromProject,
} from "./storage";
import { isValidDate } from "../global_functions/dateValidator";
import { isDueThisWeek, isDueToday } from "../global_functions/dateFilters";

function handleProjectCreation(event) {
  event.preventDefault();

  const title = document.getElementById("title-input").value;
  const description = document.getElementById("description-input").value;
  const dueDate = document.getElementById("dueDate-input").value;
  const priority = document.getElementById("priority-input").value;

  if (!isValidDate(dueDate)) {
    alert("Please enter a valid future due date.");
    return;
  }
  addProject(title, description, dueDate, priority);

  renderProjects();
  document.getElementById("project-form").reset();
}

function setupNewProjectForm() {
  const form = document.getElementById("project-form");
  form.addEventListener("submit", handleProjectCreation);
}

// function createProjectCard(project) {
//   const projectCard = document.createElement("div");
//   projectCard.classList.add("project_card");

//   projectCard.innerHTML = `
//         <h3 class="title">${project.title}</h3>
//         <p class="description">${project.description}</p>
//         <p class="due_date">${project.dueDate}</p>
//         <p class="priority">Priority: ${project.priority}</p>
//         <label for="tasks">Project Tasks: </label>
//         <input type="text" class="task-input" required placeholder="Insert Task" />
//         <button class="add-task">Add Task</button>
//         <ul class="task_list"></ul>
//         <button class="complete_btn">Mark As Complete</button>
//         <button class="expand_btn">Expand</button>
//         <button class="delete_project_btn">Delete Project</button>
//       `;

//   const updateTaskList = () => {
//     const taskListElement = projectCard.querySelector(".task_list");
//     taskListElement.innerHTML = project.tasks
//       .map(
//         (task) =>
//           `<li class="task">
//               ${task.title}
//               <button class="delete-task" data-task-title="${task.title}">Delete Task</button>
//             </li>`
//       )
//       .join("");

//     const deleteTaskButtons = taskListElement.querySelectorAll(".delete-task");
//     deleteTaskButtons.forEach((button) => {
//       button.addEventListener("click", () => {
//         const taskTitle = button.dataset.taskTitle;
//         removeTaskFromProject(project.id, taskTitle);
//         project.tasks = project.tasks.filter(
//           (task) => task.title !== taskTitle
//         );
//         updateTaskList();
//       });
//     });
//   };

//   updateTaskList();

//   const addTaskInput = projectCard.querySelector(".task-input");
//   const addTaskBtn = projectCard.querySelector(".add-task");
//   addTaskBtn.addEventListener("click", () => {
//     const taskTitle = addTaskInput.value.trim();
//     if (taskTitle) {
//       project.tasks.push({ title: taskTitle });
//       addTaskInput.value = "";
//       addTaskToProject(project.id, taskTitle);
//       updateTaskList();
//     }
//   });

//   const deleteBtn = projectCard.querySelector(".delete_project_btn");
//   deleteBtn.addEventListener("click", () => {
//     removeProject(project.id);
//     renderProjects();
//   });

//   return projectCard;
// }

function createProjectCardHTML(project) {
  const projectCard = document.createElement("div");
  projectCard.classList.add("project_card");

  projectCard.innerHTML = `
        <h3 class="title">${project.title}</h3>
        <p class="description">${project.description}</p>
        <p class="due_date">${project.dueDate}</p>
        <p class="priority">Priority: ${project.priority}</p>
        <label for="tasks">Project Tasks: </label>
        <input type="text" class="task-input" required placeholder="Insert Task" />
        <button class="add-task">Add Task</button>
        <ul class="task_list"></ul>
        <button class="complete_btn">Mark As Complete</button>
        <button class="delete_project_btn">Delete Project</button>
    `;

  return projectCard;
}
function updateTaskList(projectCard, project) {
  const taskListElement = projectCard.querySelector(".task_list");
  taskListElement.innerHTML = project.tasks
    .map(
      (task) =>
        `<li class="task">
            ${task.title} 
            <button class="delete-task" data-task-title="${task.title}">Delete Task</button>
          </li>`
    )
    .join("");

  const deleteTaskButtons = taskListElement.querySelectorAll(".delete-task");
  deleteTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskTitle = button.dataset.taskTitle;
      removeTaskFromProject(project.id, taskTitle);
      project.tasks = project.tasks.filter((task) => task.title !== taskTitle);
      updateTaskList(projectCard, project);
    });
  });
}
function addProjectCardListeners(projectCard, project) {
  const addTaskInput = projectCard.querySelector(".task-input");
  const addTaskBtn = projectCard.querySelector(".add-task");
  addTaskBtn.addEventListener("click", () => {
    const taskTitle = addTaskInput.value.trim();
    if (taskTitle) {
      project.tasks.push({ title: taskTitle });
      addTaskInput.value = "";
      addTaskToProject(project.id, taskTitle);
      updateTaskList(projectCard, project);
    }
  });

  const deleteBtn = projectCard.querySelector(".delete_project_btn");
  deleteBtn.addEventListener("click", () => {
    removeProject(project.id);
    renderProjects();
  });
}
function createProjectCard(project) {
  const projectCard = createProjectCardHTML(project);
  updateTaskList(projectCard, project);
  addProjectCardListeners(projectCard, project);
  return projectCard;
}

function renderProjects(filterFunction = null) {
  const container = document.getElementById("projects_container");
  const { projects } = loadData();
  container.innerHTML = "";

  const filteredProjects = filterFunction
    ? projects.filter(filterFunction)
    : projects;

  if (filteredProjects.length > 0) {
    filteredProjects.forEach((project) => {
      container.appendChild(createProjectCard(project));
    });
  } else {
    const emptyContainer = document.createElement("p");
    emptyContainer.className = "empty-container-message";
    emptyContainer.textContent = "No projects to display.";
    container.appendChild(emptyContainer);
  }
}
function filterProjects() {
  const filters = document.getElementById("filters");
  const todayFilter = filters.querySelector("#today");
  const thisWeekFilter = filters.querySelector("#this-week");
  const allProjectsFilter = filters.querySelector("#all-projects");

  todayFilter.addEventListener("click", () => {
    renderProjects(isDueToday);
  });
  allProjectsFilter.addEventListener("click", () => {
    renderProjects();
  });
  thisWeekFilter.addEventListener("click", () => {
    renderProjects(isDueThisWeek);
  });
}

export { renderProjects, setupNewProjectForm, filterProjects };

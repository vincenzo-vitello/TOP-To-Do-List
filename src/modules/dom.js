import {
  removeProject,
  isDueThisWeek,
  isDueToday,
  updateProjectStatus,
  getCompletedProjects,
  getOpenProjects,
} from "./controller";
import {
  addProject,
  loadData,
  addTaskToProject,
  removeTaskFromProject,
} from "./storage";
import { isValidDate } from "../global_functions/dateValidator";
import iconSrc from "../assets/box.png";
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
  showForm();
}

function setupNewProjectForm() {
  const form = document.getElementById("project-form");
  form.addEventListener("submit", handleProjectCreation);
}

function createProjectCardHTML(project) {
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");
  projectCard.innerHTML = `
        <h3 class="title">${project.title}</h3>
        <p class="description">${project.description}</p>
        <p class="due-date">${project.dueDate}</p>
        <p class="priority">Priority: ${project.priority}</p>
        <label for="tasks">Project Tasks: </label>
        <ul class="task-list"></ul>
        <div class="add-task-wrapper">
          <input type="text" class="task-input" required placeholder="Insert Task" />
          <button class="add-task">Add</button>
        </div>
        <div class="card-btns">
          <button class="complete-btn">Mark As Complete</button>
          <button class="delete-project-btn">Delete Project</button>
        </div>
    `;

  return projectCard;
}
function updateTaskList(projectCard, project) {
  const taskListElement = projectCard.querySelector(".task-list");
  if (project.tasks.length === 0) {
    taskListElement.innerHTML = `<p class="empty-tasks-list">Seems like there's nothing to do...</p>`;
  } else {
    taskListElement.innerHTML = project.tasks
      .map(
        (task) =>
          `<li class="task">
            <p class="${task.done ? "task-done" : ""}">${task.title} </p>
            <div class="task-actions">
              <button class="done-task" data-task-title="${
                task.title
              }">Done</button>
              <button class="delete-task" data-task-title="${
                task.title
              }">Delete</button>
            </div>
          </li>`
      )
      .join("");
  }
  const deleteTaskButtons = taskListElement.querySelectorAll(".delete-task");
  deleteTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskTitle = button.dataset.taskTitle;
      removeTaskFromProject(project.id, taskTitle);
      project.tasks = project.tasks.filter((task) => task.title !== taskTitle);
      updateTaskList(projectCard, project);
    });
  });
  const taskIsDoneBtns = taskListElement.querySelectorAll(".done-task");
  taskIsDoneBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const taskTitle = button.dataset.taskTitle;
      const task = project.tasks.find((t) => t.title === taskTitle);
      if (task) {
        task.done = !task.done;
      }
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

  const deleteBtn = projectCard.querySelector(".delete-project-btn");
  deleteBtn.addEventListener("click", () => {
    removeProject(project.id);
    renderProjects();
  });
  const markAsCompleteBtn = projectCard.querySelector(".complete-btn");
  markAsCompleteBtn.addEventListener("click", () => {
    markProjectAsComplete(project.id);
  });
}
function createProjectCard(project) {
  const projectCard = createProjectCardHTML(project);
  updateTaskList(projectCard, project);
  addProjectCardListeners(projectCard, project);
  return projectCard;
}

function renderProjects(filterFunction = null) {
  const container = document.getElementById("projects-container");
  const { projects } = loadData();
  container.style.width = "100%";
  container.innerHTML = "";

  const filteredProjects = filterFunction ? filterFunction(projects) : projects;

  if (filteredProjects.length > 0) {
    container.classList.remove("empty");
    filteredProjects.forEach((project) => {
      container.appendChild(createProjectCard(project));
    });
  } else {
    const emptyContainer = document.createElement("p");
    emptyContainer.className = "empty-container-message";
    container.classList.add("empty");
    emptyContainer.textContent = "No projects to display.";

    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.alt = "No projects icon";
    icon.className = "empty-container-icon";

    emptyContainer.prepend(icon);
    container.appendChild(emptyContainer);
  }
}
function filterProjects() {
  const filters = document.getElementById("filters");
  const todayFilter = filters.querySelector("#today");
  const thisWeekFilter = filters.querySelector("#this-week");
  const allProjectsFilter = filters.querySelector("#all-projects");
  const completeProjectsFilter = filters.querySelector("#completed");
  const openProjectsFilter = filters.querySelector("#open-projects");
  const filtersArr = [
    todayFilter,
    thisWeekFilter,
    allProjectsFilter,
    completeProjectsFilter,
    openProjectsFilter,
  ];

  openProjectsFilter.addEventListener("click", () => {
    renderProjects(getOpenProjects);
    setActiveFilter(openProjectsFilter, filtersArr);
  });

  completeProjectsFilter.addEventListener("click", () => {
    renderProjects(getCompletedProjects);
    setActiveFilter(completeProjectsFilter, filtersArr);
  });

  todayFilter.addEventListener("click", () => {
    renderProjects((projects) => projects.filter(isDueToday));
    setActiveFilter(todayFilter, filtersArr);
  });

  allProjectsFilter.addEventListener("click", () => {
    renderProjects();
    setActiveFilter(allProjectsFilter, filtersArr);
  });

  thisWeekFilter.addEventListener("click", () => {
    renderProjects((projects) => projects.filter(isDueThisWeek));
    setActiveFilter(thisWeekFilter, filtersArr);
  });
}

function setActiveFilter(activeFilter, filtersArr) {
  filtersArr.forEach((filter) => {
    filter.classList.remove("filter-active");
  });
  activeFilter.classList.add("filter-active");
}
function markProjectAsComplete(projectId) {
  updateProjectStatus(projectId, true);
  renderProjects();
}
function handleAddProjectBtn() {
  const addBtn = document.getElementById("add-project");
  addBtn.addEventListener("click", () => {
    showForm();
  });
}
function showForm() {
  const newProjectForm = document.getElementById("new-project-form");
  newProjectForm.classList.toggle("active");
  showOverlay();
}
function showOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.toggle("active");
}
function cancelProjectCreation() {
  const cancelBtn = document.getElementById("cancel-project-creation");
  cancelBtn.addEventListener("click", () => {
    showForm();
    document.getElementById("project-form").reset();
  });
}
function setColorScheme() {
  const body = document.querySelector("body");
  let currentTheme = body.getAttribute("data-theme");
  const toggler = document.getElementById("theme-toggler");

  toggler.addEventListener("click", () => {
    if (currentTheme === "dark") {
      body.setAttribute("data-theme", "light");
      currentTheme = "light";
    } else {
      body.setAttribute("data-theme", "dark");
      currentTheme = "dark";
    }
  });
}
export {
  renderProjects,
  setupNewProjectForm,
  filterProjects,
  handleAddProjectBtn,
  cancelProjectCreation,
  setColorScheme,
};

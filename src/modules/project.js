import { createTodoElement } from "./todo.js";
import { isValidDate } from "../global_functions/dateValidator.js";
import { generateUniqueId } from "../global_functions/generateUniqueId";

class Project {
  constructor(id, title, description, dueDate, priority, tasks = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.tasks = tasks;
  }
  addTask(taskTitle, taskDescription, taskDueDate, taskPriority) {
    if (!isValidDate(dueDate)) {
      console.error("invalid date");
      return false;
    }
    const task = createTodoElement(
      generateUniqueId(),
      taskTitle,
      taskDescription,
      taskDueDate,
      taskPriority
    );
    if (task) {
      this.tasks.push(task);
      return true;
    }
    return false;
  }
  removeTask(taskId) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    if (this.tasks.length === initialLength) {
      console.warn(`Task with ID ${taskId} not found.`);
    }
  }
  updateTitle(newTitle) {
    this.title = newTitle;
  }
  updateDescription(newDescription) {
    this.description = newDescription;
  }
  updateDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
  updatePriority(newPriority) {
    this.priority = newPriority;
  }
}

function createProject(id, title, description, dueDate, priority, tasks = []) {
  const project = {
    id,
    title,
    description,
    dueDate,
    priority,
    tasks,
  };
  return project;
}
export { createProject };

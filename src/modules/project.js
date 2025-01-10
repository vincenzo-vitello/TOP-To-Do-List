import { createTodoElement } from "./todo.js";
import isValidDate from "../global_functions/dateValidator.js";

class Project {
  constructor(id, title, description, dueDate, priority, tasks = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.tasks = tasks;
    this.tasksCounter = 0;
  }
  addTask(title, description, dueDate, priority) {
    if (!isValidDate(dueDate)) {
      console.error("invalid date");
      return false;
    }
    const task = createTodoElement(id, title, description, dueDate, priority);
    if (task) {
      this.tasks.push(task);
      this.tasksCounter++;
      return true;
    }
    return false;
  }
  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
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
  return new Project(id, title, description, dueDate, priority, tasks);
}
export { createProject };

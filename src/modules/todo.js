import { isValidDate } from "../global_functions/dateValidator.js";

class TodoElement {
  constructor(id, title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
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

function createTodoElement(id, title, description, dueDate, priority) {
  if (title !== "" && description !== "" && isValidDate(dueDate)) {
    return new TodoElement(id, title, description, dueDate, priority);
  }
  console.error("invalid input data");
  return null;
}

export { createTodoElement };

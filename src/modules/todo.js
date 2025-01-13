class TodoElement {
  constructor(title) {
    this.title = title;
  }
  updateTitle(newTitle) {
    this.title = newTitle;
  }
}

function createTodoElement(title) {
  if (title !== "") {
    return new TodoElement(title);
  }
  console.error("invalid input data");
  return null;
}

export { createTodoElement };

const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");

const todoLs = JSON.parse(localStorage.getItem("notes"));

if (todoLs) {
  todoLs.forEach((todo) => {
    addTodo(todo);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoLi = document.createElement("li");
    if (todo && todo.completed) {
      todoLi.classList.add("completed");
    }
    todoLi.innerText = todoText;

    todoLi.addEventListener("click", () => {
      todoLi.classList.toggle("completed");
      addToLocal();
    });

    todoLi.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoLi.remove();
      addToLocal();
    });
    todos.appendChild(todoLi);
    input.value = "";

    addToLocal();
  }
}

function addToLocal() {
  const notesEl = document.querySelectorAll("li");

  const notes = [];
  notesEl.forEach((todo) => {
    notes.push({
      text: todo.innerText,
      completed: todo.classList.contains("completed"),
    });
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

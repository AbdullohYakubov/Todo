const elTodoForm = document.querySelector(".todo__form");
const elTodoInput = elTodoForm.querySelector(".todo__input");
const elTodoList = document.querySelector(".todo__list");

const elListTemplate = document.querySelector(".todo__item--template").content;

const todo = [];

const renderTodos = (todoArr, element) => {
  todoArr.forEach((item) => {
    const listTemplate = elListTemplate.cloneNode(true);

    listTemplate.querySelector(".todo__item--text").textContent = item;

    element.appendChild(listTemplate);

    crossOutCompletedTaks();
  });
};

const crossOutCompletedTaks = () => {
  const elCheckbox = document.querySelector("#checkbox");
  const elTodo = document.querySelector(".todo__item--text");
  if (elCheckbox.checked) {
    elTodo.classList.add("completed-tasks");
  } else {
    elTodo.classList.remove("completed-tasks");
  }
};

const handleTodoFormSubmit = (evt) => {
  evt.preventDefault();
  elTodoList.innerHTML = null;

  const userInputValue = elTodoInput.value.trim();
  todo.push(userInputValue);

  renderTodos(todo, elTodoList);

  elTodoInput.value = null;
};

elTodoForm.addEventListener("submit", handleTodoFormSubmit);

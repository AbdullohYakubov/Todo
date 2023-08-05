// Getting Elements
const elTodoForm = getElement(".todo__form");
const elTodoInput = getElement(".todo__input", elTodoForm);
const elTodoList = getElement(".todo__list");
const elTodoTemplate = getElement("#todo__item--template").content;
const elTodoCounter = getElement(".todo__result");
const elTodoAll = getElement(".todo__count-text", elTodoCounter);
const elTodoActive = getElement(".todo__active-text", elTodoCounter);
const elTodoCompleted = getElement(".todo__completed-text", elTodoCounter);

// Creating an empty array to push todos
let todoArr = JSON.parse(window.localStorage.getItem("todoArr")) || [];

// Creating a function that counts the number of todos by categories
const numerateTodos = (array) => {
  elTodoAll.textContent = array.length;

  const activeTodosCount = todoArr.filter((todo) => !todo.isCompleted);
  elTodoActive.textContent = activeTodosCount.length;

  elTodoCompleted.textContent = todoArr.length - activeTodosCount.length;
};

// Rendering todos to DOMs
const renderTodos = (array, node) => {
  node.innerHTML = null;

  // Activating the numerate function on every render
  numerateTodos(array);

  // Creating an empty fragment to append Todoss
  const templateFragment = document.createDocumentFragment();

  array.forEach((todo) => {
    const todoTemplate = elTodoTemplate.cloneNode(true);

    const elTodoTitle = getElement(".todo__item--text", todoTemplate);
    const elTodoCheckbox = getElement("#checkbox", todoTemplate);
    const elTodoDelete = getElement(".todo__item--btn", todoTemplate);

    // Assigning the necessary values to elements
    elTodoTitle.textContent = todo.title;
    elTodoCheckbox.dataset.todoId = todo.id;
    elTodoDelete.dataset.todoId = todo.id;

    // This is what happens when the checkbox becomes checked. See line 99.
    if (todo.isCompleted) {
      elTodoCheckbox.checked = true;
      elTodoTitle.classList.add("completed-tasks");
    } else {
      elTodoCheckbox.checked = false;
      elTodoTitle.classList.remove("completed-tasks");
    }

    // Appending the todos to the fragment
    templateFragment.appendChild(todoTemplate);
  });

  // Finally, appending the fragment to DOM element, which is "ul"
  node.appendChild(templateFragment);
};

renderTodos(todoArr, elTodoList);

const makeTodoCountVisible = (array) => {
  if (array.length > 0) {
    const elTodoCount = getElement(".todo__result");
    elTodoCount.style.display = "flex";
  } else {
    const elTodoCount = getElement(".todo__result");
    elTodoCount.style.display = "none";
  }
};

makeTodoCountVisible(todoArr);

// This is what happens when the user enters a new todo
const handleTodoForm = (evt) => {
  evt.preventDefault();

  const todoInputValue = elTodoInput.value.trim();

  // Early return if the todo is invalid
  if (!todoInputValue) {
    return;
  }

  // Creating a todo object
  const newTodo = {
    id: todoArr[todoArr.length - 1]?.id + 1 || 0,
    title: todoInputValue,
    isCompleted: false,
  };

  todoArr.push(newTodo);

  makeTodoCountVisible(todoArr);

  renderTodos(todoArr, elTodoList);

  window.localStorage.setItem("todoArr", JSON.stringify(todoArr));

  elTodoInput.value = null;
};

elTodoForm.addEventListener("submit", handleTodoForm);

// Function to find the objects (todos) whose delete button is clicked and to remove those objects (todos)
const handleDeleteTodo = (id, array) => {
  const foundTodoIndex = array.findIndex((todo) => todo.id === id);

  array.splice(foundTodoIndex, 1);

  renderTodos(todoArr, elTodoList);

  makeTodoCountVisible(todoArr);

  window.localStorage.setItem("todoArr", JSON.stringify(todoArr));
};

// Function to find the objects (todos) whose checkbox is checked and to perform specific operations on them (e.g. adding a class, etc.)
const handleCheckTodo = (id, array) => {
  const foundTodo = array.find((todo) => todo.id === id);

  foundTodo.isCompleted = !foundTodo.isCompleted;

  renderTodos(todoArr, elTodoList);

  window.localStorage.setItem("todoArr", JSON.stringify(todoArr));
};

// Function to listen to the list of todos and get the IDs of the todos whose either delete button is clicked or checkbox is checked.
const handleTodoList = (evt) => {
  if (evt.target.matches(".todo__item--btn")) {
    const clickedTodoId = Number(evt.target.dataset.todoId);

    handleDeleteTodo(clickedTodoId, todoArr);
  }

  if (evt.target.matches("#checkbox")) {
    const checkedTodoId = Number(evt.target.dataset.todoId);

    handleCheckTodo(checkedTodoId, todoArr);
  }
};

elTodoList.addEventListener("click", handleTodoList);

// Function that listens to the buttons that serve to count the todos by categories.
const handleTodoCounter = (evt) => {
  if (evt.target.matches(".todo__all")) {
    getElement(".todo__all").classList.add("current");
    getElement(".todo__active").classList.remove("current");
    getElement(".todo__completed").classList.remove("current");
    renderTodos(todoArr, elTodoList);
  }

  if (evt.target.matches(".todo__active")) {
    getElement(".todo__active").classList.add("current");
    getElement(".todo__all").classList.remove("current");
    getElement(".todo__completed").classList.remove("current");
    const activeTodos = todoArr.filter((todo) => !todo.isCompleted);
    renderTodos(activeTodos, elTodoList);
  }

  if (evt.target.matches(".todo__completed")) {
    getElement(".todo__completed").classList.add("current");
    getElement(".todo__all").classList.remove("current");
    getElement(".todo__active").classList.remove("current");
    const completedTodos = todoArr.filter((todo) => todo.isCompleted);
    renderTodos(completedTodos, elTodoList);
  }

  if (evt.target.matches(".clear-completed")) {
    window.localStorage.removeItem("todoArr");

    todoArr = [];

    renderTodos(todoArr, elTodoList);

    makeTodoCountVisible(todoArr);
  }
};

elTodoCounter.addEventListener("click", handleTodoCounter);

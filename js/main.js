const elTodoForm = getElement(".todo__form");
const elTodoInput = getElement(".todo__input", elTodoForm);
const elTodoList = getElement(".todo__list");
const elTodoTemplate = getElement("#todo__item--template").content;
const elTodoCounter = getElement(".todo__result--wrapper");
const elTodoAll = getElement(".todo__all-text", elTodoCounter);
const elTodoActive = getElement(".todo__active-text", elTodoCounter);
const elTodoCompleted = getElement(".todo__completed-text", elTodoCounter);

const todoArr = [];

const numerateTodos = (array) => {
  elTodoAll.textContent = array.length;

  const activeTodosCount = todoArr.filter((todo) => !todo.isCompleted);
  elTodoActive.textContent = activeTodosCount.length;

  const completedTodosCount = todoArr.filter((todo) => todo.isCompleted);
  elTodoCompleted.textContent = completedTodosCount.length;
};

const renderTodos = (array, node) => {
  node.innerHTML = null;

  numerateTodos(array);

  const templateFragment = document.createDocumentFragment();

  array.forEach((todo) => {
    const todoTemplate = elTodoTemplate.cloneNode(true);

    const elTodoTitle = getElement(".todo__item--text", todoTemplate);
    const elTodoCheckbox = getElement("#checkbox", todoTemplate);
    const elTodoDelete = getElement(".todo__item--btn", todoTemplate);

    elTodoTitle.textContent = todo.title;
    elTodoCheckbox.dataset.todoId = todo.id;
    elTodoDelete.dataset.todoId = todo.id;

    if (todo.isCompleted) {
      elTodoCheckbox.checked = true;
      elTodoTitle.classList.add("completed-tasks");
    } else {
      elTodoCheckbox.checked = false;
      elTodoTitle.classList.remove("completed-tasks");
    }

    templateFragment.appendChild(todoTemplate);
  });

  node.appendChild(templateFragment);
};

const handleTodoForm = (evt) => {
  evt.preventDefault();

  const todoInputValue = elTodoInput.value.trim();

  if (!todoInputValue) {
    return;
  }

  const newTodo = {
    id: todoArr[todoArr.length - 1]?.id + 1 || 0,
    title: todoInputValue,
    isCompleted: false,
  };

  todoArr.push(newTodo);

  renderTodos(todoArr, elTodoList);

  //   getElement(".todo__all").textContent = todoArr.length;
  //   getElement(".todo__active").textContent = todoArr.length;

  elTodoInput.value = null;
};

elTodoForm.addEventListener("submit", handleTodoForm);

const handleDeleteTodo = (id, array) => {
  const foundTodoIndex = array.findIndex((todo) => todo.id === id);

  array.splice(foundTodoIndex, 1);

  renderTodos(todoArr, elTodoList);

  //   getElement(".todo__all").textContent = todoArr.length;
};

const handleCheckTodo = (id, array) => {
  const foundTodo = array.find((todo) => todo.id === id);

  foundTodo.isCompleted = !foundTodo.isCompleted;

  renderTodos(todoArr, elTodoList);
};

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
};

elTodoCounter.addEventListener("click", handleTodoCounter);

const elTodoForm = getElement(".todo__form");
const elTodoInput = getElement(".todo__input", elTodoForm);
const elTodoList = getElement(".todo__list");
const elTodoTemplate = getElement("#todo__item--template").content;

const todoArr = [];

const renderTodos = (array, node) => {
  node.innerHTML = null;

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

  const newTodo = {
    id: todoArr[todoArr.length - 1]?.id + 1 || 0,
    title: todoInputValue,
    isCompleted: false,
  };

  todoArr.push(newTodo);

  renderTodos(todoArr, elTodoList);

  elTodoInput.value = null;
};

elTodoForm.addEventListener("submit", handleTodoForm);

const handleDeleteTodo = (id, array) => {
  const foundTodoIndex = array.findIndex((todo) => todo.id === id);

  array.splice(foundTodoIndex, 1);
};

const handleCheckTodo = (id, array) => {
  const foundTodo = array.find((todo) => todo.id === id);

  foundTodo.isCompleted = !foundTodo.isCompleted;
};

const handleTodoList = (evt) => {
  if (evt.target.matches(".todo__item--btn")) {
    const clickedTodoId = Number(evt.target.dataset.todoId);

    handleDeleteTodo(clickedTodoId, todoArr);

    renderTodos(todoArr, elTodoList);
  }

  if (evt.target.matches("#checkbox")) {
    const checkedTodoId = Number(evt.target.dataset.todoId);

    handleCheckTodo(checkedTodoId, todoArr);

    renderTodos(todoArr, elTodoList);
  }
};

elTodoList.addEventListener("click", handleTodoList);

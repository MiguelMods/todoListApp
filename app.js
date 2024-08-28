const TodoList = [
  {
    id: 0,
    value: 0,
    text: "Seleccione una Lista",
  },
];

var TodoListItems = null;

const slcList = document.getElementById("slcList");
const inputNewTodoList = document.getElementById("inputNewTodoList");
const btnAddNewTodoList = document.getElementById("btnAddNewTodoList");
const btnNewTodo = document.getElementById("btnNewTodo");
const newTodoItem = document.getElementById("newTodoItem");
const todosDiv = document.getElementById("todos");
const errorList = document.getElementById("errorList");
const listOfTodoSection = document.getElementById("ListOfTodoSection");

const AddNewOptionToSelect = (value, text) => {
  const optionElement = document.createElement("option");
  optionElement.value = value;
  optionElement.text = text;
  slcList.appendChild(optionElement);
};

TodoList.forEach((option) => {
  AddNewOptionToSelect(option.value, option.text);
});

function AddNewTodoListToSelectOption() {
  writteAErrorOnErrorListSection("");
  const lastTodoListElement = TodoList[TodoList.length - 1];
  const newId = lastTodoListElement.id + 1;
  const newValue = newId;
  const newTodoListValue = inputNewTodoList.value;

  if (newTodoListValue === "") {
    writteAErrorOnErrorListSection(
      "!No se Puede Registrar una Lista Con Texto Vacio!"
    );
    return;
  }
  TodoList.push({
    id: newId,
    value: newValue,
    text: newTodoListValue,
  });

  AddNewOptionToSelect(newValue, newTodoListValue);
  slcList.focus();
  slcList.value = newValue;

  const changeEvent = new Event("change");
  slcList.dispatchEvent(changeEvent);

  clear();
}

slcList.onchange = function () {
  const currentSelectedValue = parseInt(this.value);
  if (currentSelectedValue != 0) {
    listOfTodoSection.style.display = "block";
  } else {
    listOfTodoSection.style.display = "none";
  }

  let html = document.getElementById("titleTodoListSection");
  html.innerHTML = `<h3>${this.options[this.selectedIndex].text}</h3>`;

  if (TodoListItems === null || TodoListItems.length <= 0) return;
  todosDiv.innerHTML = "";

  let currentTodosFromCurrentList = TodoListItems.filter(
    (todo) => todo.listId === currentSelectedValue
  );

  currentTodosFromCurrentList.sort((a, b) => a.completed - b.completed);

  currentTodosFromCurrentList.forEach((item) => {
    todosDiv.innerHTML += `
    <p class="${item.class}">${item.id}. - ${
      item.text
    }. <input type="checkbox" id="${item.id}" name="${
      item.id
    }" onclick="MarkAsCompleted(${item.id})" ${
      item.completed ? "checked" : ""
    }/></p>`;
  });
};

btnAddNewTodoList.addEventListener("click", AddNewTodoListToSelectOption);
btnNewTodo.addEventListener("click", AddNewTodo);

function MarkAsCompleted(value) {
  const currentSelectdList = parseInt(slcList.value);
  const todoItemIndex = TodoListItems.findIndex((todo) => todo.id == value);

  TodoListItems[todoItemIndex].completed =
    TodoListItems[todoItemIndex].completed === true ? false : true;
  TodoListItems[todoItemIndex].class =
    TodoListItems[todoItemIndex].completed === true ? "completed" : "none";

  const changeEvent = new Event("change");
  slcList.dispatchEvent(changeEvent);
}

function AddNewTodo() {
  const lastIndex = TodoListItems == null ? 0 : TodoListItems.length - 1;
  const lastTodoListElement =
    TodoListItems == null ? null : TodoListItems[lastIndex];
  const newTodoId =
    lastTodoListElement == null ? 1 : lastTodoListElement.id + 1;
  const inputValue = newTodoItem.value;
  const currentSelectdList = parseInt(slcList.value);

  if (TodoListItems == null) TodoListItems = [];
  TodoListItems.push({
    id: newTodoId,
    listId: currentSelectdList,
    text: inputValue,
    completed: false,
    class: "",
  });
  const changeEvent = new Event("change");
  slcList.dispatchEvent(changeEvent);
}

const clear = () => {
  inputNewTodoList.value = "";
};

const writteAErrorOnErrorListSection = (text) => {
  errorList.innerHTML = `${text}`;
};

let $list;
let $inToDo;
let $inputBtn;
let $editBtn;
let $popInput;
let $closeBtn;
let $cancelBtn;
let btnBox;
let lastTodo = 0;
let currentTodo;
let currentlyEditedId;
const initialList = [
  "Dzisiaj robię usuwanie",
  "Nakarm psa",
  "W weekend muszę zrobić aplikację ToDo"
];

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  getTodos();
}

function prepareDOMElements() {
  $list = document.getElementById("list");
  $inToDo = document.getElementById("myInput");
  $inputBtn = document.getElementById("addTodo");
  $delBtn = document.getElementById("del");
  $editBtn = document.getElementById("edit");
  $doneBtn = document.getElementById("done");
  $showModal = document.getElementById("myModal");
  $popIn = document.getElementById("popupInput");
  $closeBtn = document.getElementById("closePopup");
  $cancelBtn = document.getElementById("btn__cancel");
  $okBtn = document.getElementById("btn__done");
}

function prepareDOMEvents() {
  $list.addEventListener("click", listClickManager);
  $inputBtn.addEventListener("click", addElement);
  $cancelBtn.addEventListener("click", closePopup);
  $okBtn.addEventListener("click", acceptChangeHandler);
  $closeBtn.addEventListener("click", closePopup);
}

function getTodos() {
  $list.innerHTML = "";
  axios.get("http://195.181.210.249:3000/todo/").then(function(response) {
    // handle success
    console.log(response);
    if (response.status === 200) {
      response.data.forEach(todo => {
        addNewElementToList(todo.title, todo.id, todo.extra);
      });
    }
  });
}

function addNewElementToList(title, id, extra) {
  const newElement = createElement(title, id, extra);
  $list.appendChild(newElement);
}

function createElement(title, id, extra) {
  const newElement = document.createElement("li");
  newElement.classList.add("liElement");
  newElement.setAttribute("data-id", id);
  if (extra == 0) {
    console.log("działa");
    newElement.classList.add("markAsDone");
  } else {
    newElement.classList.remove("markAsDone");
  }

  const newTitleElement = document.createElement("span");
  newTitleElement.classList.add("titleElement");
  newTitleElement.innerText = title;

  let btnBox = document.createElement("div");
  btnBox.classList.add("btn-box");

  let delBtn = document.createElement("button");
  delBtn.className = "del";
  delBtn.innerText = "Delete";

  let editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.innerText = "Edit";

  let doneBtn = document.createElement("button");
  doneBtn.className = "done";
  doneBtn.innerText = "Mark as Done";

  newElement.appendChild(newTitleElement);
  newElement.appendChild(btnBox);
  btnBox.appendChild(delBtn);
  btnBox.appendChild(editBtn);
  btnBox.appendChild(doneBtn);
  return newElement;
}

function addElement(event) {
  let id = event.target.parentElement.parentElement.dataset.id;

  if (event.target.id === "addTodo") {
    if (!$inToDo.value.trim()) {
      return;
    }
    axios
      .post("http://195.181.210.249:3000/todo/", {
        title: $inToDo.value
      })
      .then(response => {
        if (response.data.status === 0) {
          getTodos();
        }
      });
  }
}

function listClickManager(event) {
  let id = event.target.parentElement.parentElement.dataset.id;

  if (event.target.className === "del") {
    let dataId = event.target.parentElement.parentElement.dataset.id;
    removeListElement(dataId);
  } else if (event.target.className === "edit") {
    let title = document
      .querySelector('li[data-id="' + id + '"')
      .querySelector("span").innerText;
    editListElement(id, title);
  } else if (event.target.className === "done") {
    markElementAsDone(id);
  }
}

function removeListElement(id) {
  axios.delete("http://195.181.210.249:3000/todo/" + id).then(response => {
    // console.log('response', response);
    if (response.status === 200) {
      getTodos();
    }
  });
}

function editListElement(id, title) {
  openPopup();
  $popIn.value = title;
  currentlyEditedId = document.querySelector('li[data-id="' + id + '"');
}

function addDataToPopup(id) {
  let titlePopup = document.querySelector("#popupInput").value;
  console.log(titlePopup.value);
}

function acceptChangeHandler(event) {
  console.log($popIn.value);
  console.log(currentlyEditedId.dataset.id);
  const id = currentlyEditedId.dataset.id;
  axios
    .put("http://195.181.210.249:3000/todo/" + id, {
      title: $popIn.value
    })
    .then(response => {
      // console.log("response", response);
      if (response.status === 200) {
        // console.log($popIn.value);
        getTodos();
      }
    });
  // console.log($popIn.value);
  closePopup();
}

function openPopup() {
  $showModal.style.display = "block";
}

function closePopup() {
  $showModal.style.display = "none";
}

function markElementAsDone(id, extra) {
  let markDone = document.querySelector('li[data-id="' + id + '"');

  axios
    .put("http://195.181.210.249:3000/todo/" + id, {
      extra: 0
    })
    .then(response => {
      // console.log("response", response);
      if (response.status === 200) {
        markDone.classList.toggle("markAsDone");
        getTodos();
      }
    });
}

document.addEventListener("DOMContentLoaded", main);

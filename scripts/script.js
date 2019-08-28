// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
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
const initialList = ['Dzisiaj robię usuwanie', 'Nakarm psa', 'W weekend muszę zrobić aplikację ToDo'];

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  prepareInitialList();
}

function prepareDOMElements() {
  // To będzie idealne miejsce do pobrania naszych elementów z drzewa DOM i zapisanie ich w zmiennych
  $list = document.getElementById('list');
  $inToDo = document.getElementById('myInput');
  $inputBtn = document.getElementById('addTodo');
  $delBtn = document.getElementById('del');
  $editBtn = document.getElementById('edit');
  $doneBtn = document.getElementById('done');
  $showModal = document.getElementById('myModal');
  $popIn = document.getElementById('popupInput');
  $closeBtn = document.getElementById('closePopup');
  $cancelBtn = document.getElementById('btn__cancel');
  $okBtn = document.getElementById('btn__done');
}

function prepareDOMEvents() {
  // Przygotowanie listenerów
  $list.addEventListener('click', listClickManager);
  $inputBtn.addEventListener('click', addElement);
  $cancelBtn.addEventListener('click', closePopup);
  $okBtn.addEventListener('click', acceptChangeHandler);
  $closeBtn.addEventListener('click', closePopup)
}

function prepareInitialList() {
  // Tutaj utworzymy sobie początkowe todosy. Mogą pochodzić np. z tablicy
  initialList.forEach(todo => {
    addNewElementToList(todo);
  });
}

function addNewElementToList(title /* Title, author, id */ ) {
  //obsługa dodawanie elementów do listy
  // $list.appendChild(createElement('nowy', 2))
  const newElement = createElement(title);
  $list.appendChild(newElement);

}

function createElement(title /* Title, author, id */ ) {
  // Tworzyc reprezentacje DOM elementu return newElement
  // return newElement
  const newElement = document.createElement('li');
  newElement.classList.add("liElement");
  lastTodo += 1;
  newElement.id = 'todo-' + lastTodo;

  const newTitleElement = document.createElement('span');
  newTitleElement.classList.add("titleElement");
  newTitleElement.innerText = title;


  let btnBox = document.createElement('div');
  btnBox.classList.add('btn-box');


  let delBtn = document.createElement('button');
  delBtn.className = 'del';
  delBtn.innerText = 'Delete';


  let editBtn = document.createElement('button');
  editBtn.className = 'edit';
  editBtn.innerText = 'Edit';


  let doneBtn = document.createElement('button');
  doneBtn.className = 'done';
  doneBtn.innerText = 'Mark as Done';

  newElement.appendChild(newTitleElement);
  newElement.appendChild(btnBox);
  btnBox.appendChild(delBtn);
  btnBox.appendChild(editBtn);
  btnBox.appendChild(doneBtn);
  return newElement;

}

// if (event.target.id === 'addTodo') {
//   addNewElementToList($inToDo.value);
//   $inToDo.value = '';
// }


function addElement(event) {
  if (event.target.id === 'addTodo') {
    addNewElementToList($inToDo.value);
    $inToDo.value = '';
  }
}

function listClickManager(event) {
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
  // event.target.parentElement.id
  // if (event.target.className === 'edit') { editListElement(id) }

  let id = event.target.parentElement.parentElement.id

  if (event.target.className === 'del') {
    let id = event.target.parentElement.parentElement.id;
    removeListElement(id);
  } else if (event.target.className === 'edit') {
    let title = document.querySelector('#' + id).querySelector('span').innerText;
    editListElement(id, title);
  } else if (event.target.className === 'done') {

  }
};


function removeListElement(id) {
  // Usuwanie elementu z listy
  let liElement = document.querySelector('#' + id);
  $list.removeChild(liElement);
};

function editListElement(id, title) {
  // Pobranie informacji na temat zadania
  // Umieść dane w popupie
  openPopup();
  $popIn.value = title;
  // currentlyEditedId = document.querySelector('#' + id);
};

function addDataToPopup(id) {
  // umieść informacje w odpowiednim miejscu w popupie
  let titlePopup = document.querySelector('#popupInput').value;
  console.log(titlePopup.value);
  // $inToDo.value = titlePopup;
};

function acceptChangeHandler(id, title) {
  // pobierz dane na temat zadania z popupu (id, nowyTitle, nowyColor ...)
  // Następnie zmodyfikuj element listy wrzucając w niego nowyTitle, nowyColor...
  // closePopup()


  // let edited = document.querySelector('#' + id).querySelector('span').innerText;
  // console.log(edited);
  $list.querySelector('li').querySelector('span').innerHTML = $popIn.value;

  console.log($popIn.value);

  closePopup();
}

function openPopup() {
  // Otwórz popup
  $showModal.style.display = 'block';
}

function closePopup() {
  // Zamknij popup

  $showModal.style.display = 'none';
}

function declineChanges() { //niepotrzebna raczej
  // closePopup()
}

function markElementAsDone( /* id */ ) {
  //zaznacz element jako wykonany (podmień klasę CSS)
  // const newElement = document.querySelector('li');
  // $list.classList('markAsDone');
}

document.addEventListener('DOMContentLoaded', main);
// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let $list;
let $inToDo;
let $inputBtn;
let $editBtn;
let $popInput;
let $closeBtn;
let $cancelBtn;
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
  // $inToDo.addEventListener('click', listClickManager);
  $inputBtn.addEventListener('click', addElement);
  $closeBtn.addEventListener('click', listClickManager);
  $cancelBtn.addEventListener('click', closePopup);
  // $editBtn.addEventListener('click', listClickManager);
  // $delBtn.addEventListener('click', listClickManager);
  // $popInput.addEventListener('click', listClickManager);


  // $doneBtn.addEventListener('click', listClickManager);
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
  newElement.innerText = title;

  let delBtn = document.createElement('button');
  delBtn.id = 'del';
  delBtn.innerText = 'Delete';
  newElement.appendChild(delBtn);

  let editBtn = document.createElement('button');
  editBtn.id = 'edit';
  editBtn.innerText = 'Edit';
  newElement.appendChild(editBtn);

  let doneBtn = document.createElement('button');
  doneBtn.id = 'done';
  doneBtn.innerText = 'Mark as Done';
  newElement.appendChild(doneBtn);

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

  if (event.target.id === 'del') {
    removeListElement();
  } else if (event.target.id === 'edit') {
    openPopup();
    editListElement();
  } else(event.target.id === 'done')
  markElementAsDone();
}



function removeListElement( /* id */ ) {
  // Usuwanie elementu z listy
  const newElement = document.querySelector('li');
  $list.removeChild(newElement);
}

function editListElement( /* id */ ) {
  // Pobranie informacji na temat zadania
  // Umieść dane w popupie



}

function addDataToPopup( /* Title, author, id */ ) {
  // umieść informacje w odpowiednim miejscu w popupie
}

function acceptChangeHandler() {
  // pobierz dane na temat zadania z popupu (id, nowyTitle, nowyColor ...)
  // Następnie zmodyfikuj element listy wrzucając w niego nowyTitle, nowyColor...
  // closePopup()
}

function openPopup() {
  // Otwórz popup
  $showModal.style.display = 'block';
}

function closePopup(event) {
  // Zamknij popup
  if (event.target.id === 'btn__cancel') {
    $showModal.style.display = 'none';
  }


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
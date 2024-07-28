const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
//데이터 가져오는 곳
const toDoList = document.querySelector(".js-toDoList");
//데이터 출력하는 곳
const TODOS_LS = "toDos";

let toDos = [];
//const는 변화 불가

function deleteToDo(event) {
  console.log(event.target.parentNode);
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //필터 기억
  const cleanToDos = toDos.filter(function (toDo) {
    // li.id 가 스트링 임..
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  savaToDos();
}

function savaToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  //console.log(text);
  const li = document.createElement("li");
  const delBtn = document.createElement("span");
  delBtn.innerText = "❌ ";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);

  li.id = newId;

  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  savaToDos();
  //push 한 이후에 저장 해야됨 그전에 하면 null저장
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos);
    //console.log(parsedToDos);
    //포 이치 기억
    parsedToDos.forEach(function (toDo) {
      //console.log(toDo.text);
      paintToDo(toDo.text);
    });
    //포이치 안에 그대로 펑션을 넣음
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
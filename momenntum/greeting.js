const form = document.querySelector(".js-form");
const input = form.querySelector("input");

const greeting = document.querySelector(".js-greetings");

const USERS_LS = "currentUser";
const SHWING_CN = "showing";

function savaName(text) {
  localStorage.setItem(USERS_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  //언터를 쳐도 이벤트 안날라가는것...이라고 설명 쓰면 알아듣겟냐 내가?
  const currentValue = input.value;
  console.log(currentValue);
  paintGreeting(currentValue);
  savaName(currentValue);
}

function askForName() {
  form.classList.add(SHWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHWING_CN);
  greeting.classList.add(SHWING_CN);
  greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USERS_LS);
  if (currentUser === null) {
    //이름 적기 전
    askForName();
  } else {
    //이름 적음
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();

}

init();
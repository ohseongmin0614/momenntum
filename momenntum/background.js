const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImageLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;//0부터 시작하기 때문에 1을 추가한다
  image.classList.add("bgImage");
  body.prepend(image);
  //image.addEventListener("loadend", handleImageLoad);
 
}

function genRandom() {
  const number = Math.floor(Math.random() * 4);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();
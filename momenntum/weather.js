const weather = document.querySelector(".js-weather");

const API_KEY = "1e08a0231810db86dce24b229c0c017a";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const aaa = json.weather[0].main;
      console.log(aaa);
      weather.innerText = `${aaa} / ${temperature} ℃  ${place}`;
    });
  //fetch()안에는 가져올 데이터가 들어가면됨 앞에 http 넣어주고 주의% 따옴표가 아닌 백틱 사용
}

function savaCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  console.log(position.coords.latitude);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
    //latitude,longitude 로 작성 가능
  };
  savaCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant access geo locaion");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
  //위치 정보
}

function loadCoords() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    
    const parsedCoords = JSON.parse(loadCoords);
    console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
function changeTheme() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}

let themeButton = document.querySelector(".themeButton");
themeButton.addEventListener("click", changeTheme);

let now = new Date();

let tDay = document.querySelector(".day");
let tTime = document.querySelector(".time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let min = now.getMinutes();
tDay.innerHTML = `${day}`;
tTime.innerHTML = `${hour}:${min}`;

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cCity");
  let descElement = document.querySelector("#desc");
  let humiElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descElement.innerHTML = response.data.condition.description;
  humiElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "4b061e3ft17954dbb7f52badfdo001e5";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemperature);

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

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForcast(response) {
  console.log(response.data);
  let forcast = response.data.daily;

  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;

  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col">
            <div class="wForecast">
              <div class="fDay">${formatDay(forcastDay.time)}</div>
              <br />
              <img
                class="tempImg"
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forcastDay.condition.icon
                }.png"
                alt="clear"
              />
              <div class="fTemp">
                <br />
                <span class="fTemp minTemp">${Math.round(
                  forcastDay.temperature.minimum
                )}°c</span>
                <span class="fTemp maxTemp">${Math.round(
                  forcastDay.temperature.maximum
                )}°c</span>
              </div>
            </div>
          </div>`;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "4b061e3ft17954dbb7f52badfdo001e5";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForcast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cCity");
  let descElement = document.querySelector("#desc");
  let humiElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.city;
  descElement.innerHTML = response.data.condition.description;
  humiElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForcast(response.data.coordinates);
}

function search(city) {
  let apiKey = "4b061e3ft17954dbb7f52badfdo001e5";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displaycelsisTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displaycelsisTemperature);

search("Tokyo");

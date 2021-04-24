const apiKey = "2de7893f1eec2a6c944b528f0b297c0f";

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const main = document.getElementById("main");

const form = document.getElementById("form");

const input = document.getElementById("search");

async function getWeather(city) {
  const resp = await fetch(url(city), { origin: "cors" });

  const respData = await resp.json();

  console.log(respData, KToC(respData.main.temp));

  addWeatherToPage(respData);
}

getWeather("Khujand");

function addWeatherToPage(data) {
  const temp = KToC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
  <h2>${temp}*C</h2>
  <p>in ${data.name}</p>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"
  <br>
  <br>
  <small>${data.weather[0].description}</small>
  <h3>${data.sys.country}</h3>
 
  `;
  main.innerHTML = "";
  main.appendChild(weather);
}

function KToC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = input.value;

  if (city) {
    getWeather(city);
    input.value = "";
  }
});

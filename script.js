const weatherApi = {
  key: "58186a8833e17c485eea8225c8a665d4",
  baseurl: "https://api.openweathermap.org/data/2.5/weather",
};
let search = document.getElementById("input-box");
search.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    getWeatherReport(search.value);
  }
});
function getWeatherReport(city) {
  fetch(`${weatherApi.baseurl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}
function showWeatherReport(weather) {
  let city_code = weather.cod;
  if (city_code === "400") {
    swal("Empty Input", "Please enter any city", "error");
    reset();
  } else if (city_code === "404") {
    swal("Bad Input", "Entered city does not match", "warning");
    reset();
  } else {
    let op = document.getElementById("weather-body");
    op.style.display = "block";
    let todayDate = new Date();
    let parent = document.getElementById("parent");
    let weather_body = document.getElementById("weather-body");
    weather_body.innerHTML = `
      <div class="location-details">
        <div class="city" id="city">
          ${weather.name}
        </div>
        <div class="date" id="date">
          ${dateManage(todayDate)}
        </div>
      </div>
      <div class="weather-status">
            <div class="temp" >Temp : ${weather.main.temp} 🌡</div>
            <div class="weather" style="color:blue; font-weight:bold;">${
              weather.weather[0].main
            }</div>
            <div id='updated_on' style="font-weight:bold;">Updated as of ${getTime(
              todayDate
            )}</div>
      </div>
      <hr>
      </hr>
    `;
    parent.append(weather_body);
    reset();
  }
}
function getTime(todayDate) {
  let h = addZero(todayDate.getHours());
  let m = addZero(todayDate.getMinutes());
  return `${h}:${m}`;
}
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let year = dateArg.getFullYear();
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];
  return `${date} ${day} ${year}`;
}
function reset() {
  let input = document.getElementById("input-box");
  input.value = "";
}
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

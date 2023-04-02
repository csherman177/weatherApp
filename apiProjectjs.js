var searchBtn = document.querySelector("#search-btn"); // Search button
var searchInput = document.querySelector("#city-input"); // Input for Search
var weatherResultsEl = document.querySelector("#first");
var weatherData = [];

var API_KEY = "33bf6212a02f55406c312de7ffdcf207";
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=" + API_KEY;

function weather() {
  var city = searchInput.value;
  var queryUrl = weatherUrl + "&q=" + city;
  var currentDate = new Date().toISOString().split("T")[0]; // define currentDate here

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.list) {
        var forecast = data.list;

        // clear previous results
        weatherResultsEl.innerHTML = "";

        // get the weather data for every day for the next 5 days
        var dailyWeather = [];

        // get the weather data for every day for the next 5 days
        forecast.forEach(function (day) {
          if (
            day.dt_txt &&
            day.dt_txt.split(" ")[0] >= currentDate &&
            dailyWeather.length < 5
          ) {
            dailyWeather.push(day);
          }
        });

        // create a div for each day's weather forecast
        dailyWeather.forEach(function (day) {
          var dayEl = document.createElement("div");

          // create elements for the weather data
          var dateEl = document.createElement("h3");
          var tempEl = document.createElement("p");
          var windEl = document.createElement("p");
          var humidityEl = document.createElement("p");

          // add data to the elements
          dateEl.textContent = day.dt_txt.split(" ")[0];
          tempEl.textContent = "Temperature: " + day.main.temp;
          windEl.textContent = "Wind: " + day.wind.speed;
          humidityEl.textContent = "Humidity: " + day.main.humidity;

          // append the elements to the day's weather div
          dayEl.append(dateEl, tempEl, windEl, humidityEl);

          // append the div to the results container
          weatherResultsEl.appendChild(dayEl);
        });
      } else {
        console.error("No weather data found");
      }
    })
    .catch(function (error) {
      console.error("Error fetching weather data", error);
    });
}

searchBtn.addEventListener("click", function () {
  weather();
});

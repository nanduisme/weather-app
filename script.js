let weather = {
  apiKey: "4ab417bb97846c6ec949e987131aa924",
  fetchWeather: function (city) {
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerHTML = `Weather in ${name}`;
    document.querySelector(".temp").innerHTML = `${
      Math.round(temp * 10) / 10
    }&deg;C`;

    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerHTML = description;

    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind: ${speed}m/s`;

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`;
  },
  search: function () {
    const city = document.querySelector(".search-bar").value;
    this.fetchWeather(city);
  },
};

document
  .querySelector(".search-box button")
  .addEventListener("click", () => weather.search());
document.querySelector(".search-bar").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    weather.search();
  }
});

const famousCities = [
  "London",
  "Paris",
  "New York",
  "Tokyo",
  "Sydney",
  "Beijing",
  "Seoul",
  "Shanghai",
  "Hong Kong",
  "Bangkok",
  "Rio de Janeiro",
  "São Paulo",
  "Cairo",
];

weather.fetchWeather(
  famousCities[Math.floor(Math.random() * famousCities.length)]
);

const notifElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp-iName');
const tempdElement = document.querySelector('.temp-dName');
const locationElement = document.querySelector('.location-name');

const weather = {};


const key = "3b84538c9b4e1c6e65357442ae373b08";

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notifElement.style.visibility = "visible";
}


function setPosition(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    getWeather(lat, lon);
}

function showError() {
    notifElement.style.visibility = "visible";
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            weather.temperature = Math.floor(data.main.temp - 273);
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        })

}

function displayWeather() {
    tempElement.innerHTML = `<p>${weather.temperature}<span> °C</span></p>`;
    tempdElement.innerHTML = `<p>${weather.description}</p>`;
    locationElement.innerHTML = `<p>${weather.city},${weather.country}</p>`;
    iconElement.innerHTML = `<img src="img/${weather.icon}.png" alt="">`;

}
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "24722b26c7571001b24ce9c9f6322c5a";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=${apiKey}`);

    if (!response.ok) {
        throw new Error("Coud not fetch the weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed()}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "☔";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "⛅";
        case (weatherId >= 800 && weatherId < 900):
            return "☁️";
    }
}

function displayError(message) {
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(error);
}
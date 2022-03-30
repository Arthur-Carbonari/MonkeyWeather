function getUserInput(userInputField) {
    let userInput = userInputField.value;
    userInputField.value = "";
    return userInput;
}

exports.getUserInput = getUserInput;

function getNumberForecastsUntilTomorrow(date) {
    let hoursInADay = 24;

    let now = date;

    let hoursUntilTomorrow = hoursInADay - now.getHours();

    let numberOfForecastsUntilTomorrow = Math.ceil(hoursUntilTomorrow / 3);

    return numberOfForecastsUntilTomorrow;
}

exports.getNumberForecastsUntilTomorrow = getNumberForecastsUntilTomorrow;


function getWeatherDataForTheNextThreeDays(weatherData, numberOfForecastsUntilTomorrow) {
    let forecastsInADay = 24 / 3;
    let forecastsInNextThreeDays = forecastsInADay * 3;
    let n = numberOfForecastsUntilTomorrow;
    let weatherDataForTheNextThreeDays = [];

    for (let i = 0; i < forecastsInNextThreeDays; i++) {
        if(weatherData.list[numberOfForecastsUntilTomorrow + i] == null) continue;
        weatherDataForTheNextThreeDays.push( weatherData.list[n + i]) ;
    }

    return weatherDataForTheNextThreeDays;
}

exports.getWeatherDataForTheNextThreeDays = getWeatherDataForTheNextThreeDays;
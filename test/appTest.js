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

function updateRecomendations(processedWeatherData, clothesRecomendations) {

    if (!clothesRecomendations.rainClothes) {
        clothesRecomendations.rainClothes = checkIfRainClothesAreNeeded(processedWeatherData);
    }
    if (!clothesRecomendations.winterClothes) {
        clothesRecomendations.winterClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, -100, 5);
    }
    if (!clothesRecomendations.coldClothes) {
        clothesRecomendations.coldClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 5, 15);

    }
    if (!clothesRecomendations.chillyClothes) {
        clothesRecomendations.chillyClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 15, 20);
    }
    if (!clothesRecomendations.mildClothes) {
        clothesRecomendations.mildClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 20, 25);
    }
    if (!clothesRecomendations.warmClothes) {
        clothesRecomendations.warmClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 25, 30);
    }
    if (!clothesRecomendations.summerClothes) {
        clothesRecomendations.summerClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 30, 100);
    }
    console.log(clothesRecomendations);
    return clothesRecomendations;
}

exports.updateRecomendations = updateRecomendations;


function checkIfRainClothesAreNeeded(processedWeatherData) {

    let rainClothesAreNeeded = false;

    processedWeatherData.forEach(element => {

        if (element.weather === "Rain") rainClothesAreNeeded = true;

    });
    
    return rainClothesAreNeeded;
}

exports.checkIfRainClothesAreNeeded = checkIfRainClothesAreNeeded;


function checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, minimum, maximum) {

    let clothesAreNeeded = false;

    processedWeatherData.forEach(element => {

        if (minimum < element.tempFellsLike && element.tempFellsLike <= maximum) clothesAreNeeded = true;

    });

    return clothesAreNeeded;
}

exports.checkIfClothesAreNeededAccordingToTemperature = checkIfClothesAreNeededAccordingToTemperature;


function processWeatherData(weatherData, date) {

    let numberOfForecastsUntilTomorrow = getNumberForecastsUntilTomorrow(date);
    let weatherDataForTheNextThreeDays = getWeatherDataForTheNextThreeDays(weatherData, numberOfForecastsUntilTomorrow);

    let processedData = [];

    for (let i = 0; i < weatherDataForTheNextThreeDays.length; i = i + 2) {

        processedData.push({
            time: weatherDataForTheNextThreeDays[i].dt_txt,
            tempFellsLike: weatherDataForTheNextThreeDays[i].main.feels_like,
            weather: weatherDataForTheNextThreeDays[i].weather[0].main
        });
    }

    console.log(processedData);
    return processedData;
}

exports.processWeatherData = processWeatherData;
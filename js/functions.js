function getUserInput(userInputField) {
    let userInput = userInputField.value;
    userInputField.value = "";
    return userInput;
}


function getNumberForecastsUntilTomorrow(date) {
    let hoursInADay = 24;

    let now = date;

    let hoursUntilTomorrow = hoursInADay - now.getHours();

    let numberOfForecastsUntilTomorrow = Math.ceil(hoursUntilTomorrow / 3);

    return numberOfForecastsUntilTomorrow;
}



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



function checkIfRainClothesAreNeeded(processedWeatherData) {

    let rainClothesAreNeeded = false;

    processedWeatherData.forEach(element => {

        if (element.weather === "Rain") rainClothesAreNeeded = true;

    });
    
    return rainClothesAreNeeded;
}



function checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, minimum, maximum) {

    let clothesAreNeeded = false;

    processedWeatherData.forEach(element => {

        if (minimum < element.tempFellsLike && element.tempFellsLike <= maximum) clothesAreNeeded = true;

    });

    return clothesAreNeeded;
}



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



function clothesMessage(clothesRecomendations) {

    let message = "You will need ";
    if (clothesRecomendations.rainClothes) {
        message = message + "rainy weather clothes, ";
    }
    if (clothesRecomendations.winterClothes) {
        message = message + "winter clothes, ";
    }
    if (clothesRecomendations.coldClothes) {
        message = message + "cold weather clothes, ";

    }
    if (clothesRecomendations.chillyClothes) {
        message = message + "chilly weather clothes, ";    
    }
    if (clothesRecomendations.mildClothes) {
        message = message + "mild weather clothes, ";
    }
    if (clothesRecomendations.warmClothes) {
        message = message + "warm weather clothes, ";
    }
    if (clothesRecomendations.summerClothes) {
       message = message + "summer clothes, "
    }

    return message + "make sure u bring all the clothes you need. Have a nice trip.";
}


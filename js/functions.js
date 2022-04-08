


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


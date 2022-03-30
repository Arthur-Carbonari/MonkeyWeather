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
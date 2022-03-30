function getUserInput(userInputField) {
    let userInput = userInputField.value;
    userInputField.value = "";
    return userInput;
}

exports.getUserInput = getUserInput;
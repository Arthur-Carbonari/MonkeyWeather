const chatBox = document.getElementById("chatBox");
const userInputField = document.getElementById("userInput");

userInputField.addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        let userInput = getUserInput();
        processUserInput(userInput);
    }
});
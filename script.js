const chatBox = document.getElementById("chatBox");
const userInputField = document.getElementById("userInput");

let requestNumber = 0;
let expectingDestinationsNames = false;

userInputField.addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        let userInput = getUserInput(userInputField);
        processUserInput(userInput);
    }
});

document.getElementById("sendButton").addEventListener("click", () => {

    let userInput = getUserInput(userInputField);
    processUserInput(userInput);
});


function processUserInput(userInput) {
    updateChatBox(userInput, "userMessage");

    botResponse = getBotResponse(userInput);

    updateChatBox(botResponse, "botMessage");
}

function updateChatBox(text, className) {
    var newMessage = document.createElement('div');
    newMessage.textContent = text;
    newMessage.classList.add(className);
    chatBox.appendChild(newMessage);           
}


const messagesView = document.getElementById("chatBox");
const userInputField = document.getElementById("userInput");

const chatbox = new Chatbox(messagesView, userInputField);

let requestNumber = 0;
let expectingDestinationsNames = false; 
let numberOfLocationsSelected = 0;

let clothesRecomendations = {
    rainClothes: false,
    winterClothes: false,
    coldClothes: false,
    chillyClothes: false,
    mildClothes: false,
    warmClothes: false,
    summerClothes: false
};


userInputField.addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        let userInput = chatbox.getInput();
        chatbox.emptyInputField();
        handleInput(userInput);
    }
});

document.getElementById("sendButton").addEventListener("click", () => {

    let userInput = chatbox.getInput();
    chatbox.emptyInputField();
    handleInput(userInput);
});



async function  handleInput(userInput) {
    chatbox.updateChatbox(userInput, "userMessage");
    chatbox.scrollChatbox();

    botResponse = await getBotResponse(userInput);
    requestNumber++;

    updateChatBox(botResponse, "botMessage");
    chatbox.scrollChatbox();
}

function updateChatBox(text, className) {
    var newMessage = document.createElement('div');
    newMessage.textContent = text;
    newMessage.classList.add(className);
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;           
}

async function getBotResponse(userInput, requestNumber) {


    if (expectingDestinationsNames) {
        let weatherData = await getWeatherDataFromAPI(userInput);
        let processedWeatherData = processWeatherData(weatherData, new Date);
        clothesRecomendations = updateRecomendations(processedWeatherData, clothesRecomendations);
        
        numberOfLocationsSelected++;

        if(numberOfLocationsSelected == 5) return clothesMessage(clothesRecomendations);

        return "Thats a good choice, what will be your next destination after that?";
    }

    if (!expectingDestinationsNames && userInput === "yes") {
        expectingDestinationsNames = true;
        return "Ok, please tell me the first location you want to visit.";
    }

    if (requestNumber > 0) {
        console.log("here");
        return "Ok, tell me when you are ready then..";
    }

    return "Are you ready to select the first city you would like to visit?";

}

async function getWeatherDataFromAPI(city) {
    const apiKey = "494fc1fc164a54a3b6d1a694769dce7e";

    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);

    let weatherData = await response.json();

    return await weatherData;
}
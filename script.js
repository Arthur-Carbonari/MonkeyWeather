const { processWeatherData } = require("./test/appTest");

const chatBox = document.getElementById("chatBox");
const userInputField = document.getElementById("userInput");

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
        let userInput = getUserInput(userInputField);
        processUserInput(userInput);
    }
});

document.getElementById("sendButton").addEventListener("click", () => {

    let userInput = getUserInput(userInputField);
    processUserInput(userInput);
});


async function processUserInput(userInput) {
    updateChatBox(userInput, "userMessage");

    botResponse = await getBotResponse(userInput);
    requestNumber++;

    updateChatBox(botResponse, "botMessage");
}

function updateChatBox(text, className) {
    var newMessage = document.createElement('div');
    newMessage.textContent = text;
    newMessage.classList.add(className);
    chatBox.appendChild(newMessage);           
}

async function getBotResponse(userInput, requestNumber) {


    if (expectingDestinationsNames) {
        let weatherData = await getWeatherDataFromAPI(userInput);
        let processedWeatherData = processWeatherData(weatherData, new Date);
        clothesRecomendations = updateRecomendations(processedWeatherData, clothesRecomendations);
        


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
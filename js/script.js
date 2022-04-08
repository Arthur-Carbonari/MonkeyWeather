const messagesView = document.getElementById("chatBox");
const userInputField = document.getElementById("userInput");

const chatbox = new Chatbox(messagesView, userInputField);

const apiKey = "494fc1fc164a54a3b6d1a694769dce7e";
const weatherFetcher = new WeatherFetcher(apiKey);

const chatbot = new Chatbot();

let requestNumber = 0;
let expectingDestinationsNames = false; 
let numberOfLocationsSelected = 0;




userInputField.addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        let userInput = chatbox.retrieveInput();
        handleInput(userInput);
    }
});

document.getElementById("sendButton").addEventListener("click", () => {

    let userInput = chatbox.retrieveInput();
    handleInput(userInput);
});



async function  handleInput(userInput) {
    chatbox.updateChatbox(userInput, "userMessage");
    chatbox.scrollChatbox();

    //botResponse = await getBotResponse(userInput);
    let botResponse = await chatbot.getBotResponse(userInput);
    requestNumber++;

    chatbox.updateChatbox(botResponse, "botMessage");
    chatbox.scrollChatbox();
}


async function getBotResponse(userInput, requestNumber) {


    if (expectingDestinationsNames) {
        let weatherData = await weatherFetcher.getWeatherData(userInput);
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

import Chatbox from './Chatbox.js';
import Chatbot from './Chatbot.js';

const messagesView = document.getElementById("chatBox");
const userInputField = document.getElementById("userInput");
const sideContent = document.getElementById("sideContent");

const chatbox = new Chatbox(messagesView, userInputField);


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

    if(chatbot.updateAside){
        let destinations = chatbot.getAsideElements();

        sideContent.innerHTML = "";
        destinations.forEach(destination => {
            sideContent.append(destination);
        });
    }

    chatbox.updateChatbox(botResponse, "botMessage");
    chatbox.scrollChatbox();
}



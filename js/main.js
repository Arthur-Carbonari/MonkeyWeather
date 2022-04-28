import Chatbox from './Chatbox.js';
import Chatbot from './Chatbot.js';

const messagesView = document.getElementById("chatBox");
const userInputField = document.getElementById("userInput");
const sideDisplay = document.getElementById("sideDisplay");

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

    if(chatbot.updateSideDisplay){
        let details = chatbot.getSideDisplay();
        sideDisplay.appendChild(details);
        console.log(details.childNodes[0]);
        console.log(details);
    }

    chatbox.updateChatbox(botResponse, "botMessage");
    chatbox.scrollChatbox();
}



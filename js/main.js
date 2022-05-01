import Chatbox from './Chatbox.js';
import Chatbot from './Chatbot.js';

const messagesView = document.getElementById("chatBox");
const userInputField = document.getElementById("userInput");
const sideContent = document.getElementById("sideContent");

const minimumResponseTime = 1000; //miliseconds
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const chatbox = new Chatbox(messagesView, userInputField, sideContent);


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
    
    chatbox.startTypingAnimation();

    chatbox.scrollChatbox();

    let startTime = + new Date();

    let botResponse = await chatbot.getBotResponse(userInput);
    
    let reponseTime = + new Date() - startTime;

    if(reponseTime < minimumResponseTime){
        await sleep(minimumResponseTime - reponseTime);
    }

    chatbox.finishTypingAnimation();

    if(chatbot.updateAside){
        let asideElements = chatbot.getAsideElements();
        chatbox.updateSideContent(asideElements);
    }

    chatbox.updateChatbox(botResponse, "botMessage");
    chatbox.scrollChatbox();
}



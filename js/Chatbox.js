export default class Chatbox{
    chatbox;
    inputField;

    constructor(chatbox, inputField){
        this.chatbox = chatbox;
        this.inputField = inputField;
    }

    retrieveInput(){
        let input = this.getInput();
        this.emptyInputField();
        return input;
    }

    getInput(){
        return this.inputField.value;
    }

    emptyInputField(){
        this.inputField.value = "";
    }

    updateChatbox(text, className){
        let newMessage = document.createElement('div');
        newMessage.innerHTML = text;
        newMessage.classList.add(className);
        this.chatbox.appendChild(newMessage);
    }

    scrollChatbox(){
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }
}
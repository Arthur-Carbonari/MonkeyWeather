class Chatbox{
    chatbox;
    inputField;

    constructor(chatbox, inputField){
        this.chatbox = chatbox;
        this.inputField = inputField;
    }

    getInput(){
        return this.inputField.value;
    }

    emptyInputField(){
        this.inputField.value = "";
    }

    updateChatbox(text, className){
        let newMessage = document.createElement('div');
        newMessage.textContent = text;
        newMessage.classList.add(className);
        this.chatbox.appendChild(newMessage);
    }

    scrollChatbox(){
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }
}
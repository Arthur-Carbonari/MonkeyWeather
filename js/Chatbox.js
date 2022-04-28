export default class Chatbox{

    /**
     * HTML element where the messages are going to be displayed in.
     */
    chatbox;

    /**
     * HTML element where the user will write his input in.
     */
    inputField;

    /**
     * @param {DOMElement} chatbox - HTML element where the messages are going to be displayed in.
     * @param {DOMElement} inputField - HTML element where the user will write his input in.
     */
    constructor(chatbox, inputField){
        this.chatbox = chatbox;
        this.inputField = inputField;
    }

    /**
     * This method stores the value of the inputField, sets it to '' and then returns the stored value.
     * @returns {string} Value of the input field.
     */
    retrieveInput(){
        let input = this.getInput();
        this.emptyInputField();
        return input;
    }

    /**
     * This method returns the value of the input field.
     * @returns {string} Value of the input field.
     */
    getInput(){
        return this.inputField.value;
    }

    /**
     * This method set the value of the input field to ''.
     */
    emptyInputField(){
        this.inputField.value = "";
    }

    /**
     * This method creates a new HTML document and appends it as a child to the chatbox.
     * @param {string} text - inner HTML of the new element.
     * @param {string} className - class name of the new element.
     */
    updateChatbox(text, className){
        let newMessage = document.createElement('div');
        newMessage.innerHTML = text;
        newMessage.classList.add(className);
        this.chatbox.appendChild(newMessage);
    }

    /**
     * This methods scrolls the chatbox all the way down.
     */
    scrollChatbox(){
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }
}
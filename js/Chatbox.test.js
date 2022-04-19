//Call Chatbox
import Chatbox from './Chatbox';

describe('Chatbox',() => {
    //Mock HTML elements
    let box = document.createElement("div");
    box.setAttribute('id',"chatBox");
    let inputField = document.createElement("input");
    inputField.setAttribute('id',"userInput");
    //Mock Chatbox object
    let mockObj = new Chatbox(box,inputField);

    test("Constructor Test",() => {
        //Test fields
        expect(mockObj.chatbox).toBe(box);
        expect(mockObj.inputField).toBe(inputField);
    })

    test("getInput Test",() => {
        //Set value of inputField
        inputField.setAttribute('value',"MonkeyMan");
        //Test if getInput can reach the value and return it
        expect(mockObj.getInput()).toEqual("MonkeyMan");
    })

    test("emptyInputField Test",() => {
        //Test the value
        expect(mockObj.inputField.value).toEqual("MonkeyMan");
        //Clear the value of inputValue
        mockObj.emptyInputField();
        //Test if the value is not 'MonkeyMan'
        expect(mockObj.inputField.value).not.toBe("MonkeyMan");
    })

    test("retrieveInput test",() => {
        let str = "This text should be deleted after retrieve.";
        //Set value of inputField
        inputField.value = str;
        //Test the method
        expect(mockObj.retrieveInput()).toBe(str);
        //Test to see if method cleared the value of inputField
        expect(mockObj.inputField.value).toEqual("");
    })

    //TODO: Bu ne amk
    // test("updateChatBox test",() => {
    //     expect(document.getElementsByClassName("class").length).toBe(0);

    //     //creating parameters
    //     let str = "This message will be appended.";
    //     let className = "class";
    //     //Run Method
    //     mockObj.updateChatbox(str,className);
    //     //Controls if there is a div with predefined class name
    //     expect(document.getElementsByClassName("class").length).toBe(1);
    // })

})
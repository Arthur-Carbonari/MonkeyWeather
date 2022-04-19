//Mock document
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM('<DOCTYPE html><body></body>');
//Call Chatbox
const Chatbox = require('./Chatbox')


describe('Chatbox',() => {
    //Mock HTML elements
    let box = dom.window.document.createElement("div");
    box.setAttribute('id',"chatBox");
    let inputField = dom.window.document.createElement("input");
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

})
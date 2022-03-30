const weatherApp = require(`./appTest.js`);


//GetUserInput tests
QUnit.test("getUserInput1", assert => {
    let userInputField = {
        value: "first_test"
    };

    assert.equal(weatherApp.getUserInput(userInputField), "first_test");
})
const weatherApp = require(`./appTest.js`);


//GetUserInput tests
QUnit.test("getUserInput1", assert => {
    let userInputField = {
        value: "first_test"
    };

    assert.equal(weatherApp.getUserInput(userInputField), "first_test");
})

QUnit.test("getUserInput2", assert => {
    let userInputField = {
        value: "not_equal_test"
    };

    assert.notEqual(weatherApp.getUserInput(userInputField), "is_it_equal");
})

QUnit.test("getUserInput3", assert => {
    let userInputField = {
        value: "london"
    };

    assert.equal(weatherApp.getUserInput(userInputField), "london");
})
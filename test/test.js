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


//getNumberForecastsUntilTomorrow tests ================================================================================

QUnit.test("getNumberForecastsUntilTomorrow1", assert => {
    let date = new Date(1993, 6, 28, 14, 39, 7);

    assert.equal(weatherApp.getNumberForecastsUntilTomorrow(date), "4");

})

QUnit.test("getNumberForecastsUntilTomorrow2", assert => {
    let date = new Date(2022, 31, 1, 12, 35, 12);

    assert.notEqual(weatherApp.getNumberForecastsUntilTomorrow(date), "6");

})
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

QUnit.test("getNumberForecastsUntilTomorrow3", assert => {
    let date = new Date(2000, 6, 28, 21, 09, 7);

    assert.equal(weatherApp.getNumberForecastsUntilTomorrow(date), "1");

})

//getWeatherDataForTheNextThreeDays tests===================================================================================

QUnit.test("getWeatherDataForTheNextThreeDays1", assert => {
    //Mock Objects
    let mockWeatherDate0 = { dt_txt: "2020-02-01 23:00:00", main: { feels_like: 2.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate1 = { dt_txt: "2020-03-01 00:00:00", main: { feels_like: 2.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate2 = { dt_txt: "2020-03-01 03:00:00", main: { feels_like: 16.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate3 = { dt_txt: "2020-03-01 06:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate4 = { dt_txt: "2020-03-01 09:00:00", main: { feels_like: 26.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate5 = { dt_txt: "2020-03-01 12:00:00", main: { feels_like: 31.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate6 = { dt_txt: "2020-03-01 15:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate7 = { dt_txt: "2020-03-01 18:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate8 = { dt_txt: "2020-03-01 21:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherArr = [mockWeatherDate0, mockWeatherDate1, mockWeatherDate2, mockWeatherDate3, mockWeatherDate4, mockWeatherDate5, mockWeatherDate6, mockWeatherDate7, mockWeatherDate8];

    let input = { list: mockWeatherArr };

    let expectedResult = [mockWeatherDate1, mockWeatherDate2, mockWeatherDate3, mockWeatherDate4, mockWeatherDate5, mockWeatherDate6, mockWeatherDate7, mockWeatherDate8];

    assert.deepEqual(weatherApp.getWeatherDataForTheNextThreeDays(input, 1), expectedResult);
})

QUnit.test("getWeatherDataForTheNextThreeDays2", assert => {

    //Mock Objects
    let mockWeatherDate0 = { dt_txt: "2020-02-01 23:00:00", main: { feels_like: 2.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate1 = { dt_txt: "2020-03-01 00:00:00", main: { feels_like: 2.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate2 = { dt_txt: "2020-03-01 03:00:00", main: { feels_like: 16.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate3 = { dt_txt: "2020-03-01 06:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate4 = { dt_txt: "2020-03-01 09:00:00", main: { feels_like: 26.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate5 = { dt_txt: "2020-03-01 12:00:00", main: { feels_like: 31.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate6 = { dt_txt: "2020-03-01 15:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate7 = { dt_txt: "2020-03-01 18:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate8 = { dt_txt: "2020-03-01 21:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherArr = [mockWeatherDate0, mockWeatherDate1, mockWeatherDate2, mockWeatherDate3, mockWeatherDate4, mockWeatherDate5, mockWeatherDate6, mockWeatherDate7, mockWeatherDate8];

    let input = { list: mockWeatherArr };

    let expectedResult = [mockWeatherDate3, mockWeatherDate4, mockWeatherDate2, mockWeatherDate1, mockWeatherDate5, mockWeatherDate6, mockWeatherDate7, mockWeatherDate8];

    assert.notDeepEqual(weatherApp.getWeatherDataForTheNextThreeDays(input, 1), expectedResult);
})

QUnit.test("getWeatherDataForTheNextThreeDays3", assert => {

    //Mock Objects
    let mockWeatherDate0 = { dt_txt: "2020-02-01 23:00:00", main: { feels_like: 2.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate1 = { dt_txt: "2020-03-01 00:00:00", main: { feels_like: 2.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate2 = { dt_txt: "2020-03-01 03:00:00", main: { feels_like: 16.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate3 = { dt_txt: "2020-03-01 06:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate4 = { dt_txt: "2020-03-01 09:00:00", main: { feels_like: 26.0 }, weather: [{ main: "Rain" }] };

    let mockWeatherDate5 = { dt_txt: "2020-03-01 12:00:00", main: { feels_like: 31.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate6 = { dt_txt: "2020-03-01 15:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate7 = { dt_txt: "2020-03-01 18:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherDate8 = { dt_txt: "2020-03-01 21:00:00", main: { feels_like: 21.0 }, weather: [{ main: "Sunny" }] };

    let mockWeatherArr = [mockWeatherDate0, mockWeatherDate1, mockWeatherDate2, mockWeatherDate3, mockWeatherDate4, mockWeatherDate5, mockWeatherDate6, mockWeatherDate7, mockWeatherDate8];

    let input = { list: mockWeatherArr };

    let expectedResult = [mockWeatherDate3, mockWeatherDate4, mockWeatherDate5, mockWeatherDate6, mockWeatherDate7, mockWeatherDate8];

    assert.deepEqual(weatherApp.getWeatherDataForTheNextThreeDays(input, 3), expectedResult);
})


//updateRecommendations tests   ===================================================================================


QUnit.test("updateRecommendations1", assert => {
    //Mock objects
    let processedWeatherData = [{ time: '2020-03-01 00:00:00', tempFellsLike: 2, weather: 'Rain' },
                                { time: '2020-03-01 06:00:00', tempFellsLike: 21, weather: 'Sunny' },
                                { time: '2020-03-01 12:00:00', tempFellsLike: 31, weather: 'Sunny' },
                                { time: '2020-03-01 18:00:00', tempFellsLike: 21, weather: 'Sunny' }];
    let clothesRecomendations = {
        rainClothes: false,
        winterClothes: false,
        coldClothes: false,
        chillyClothes: false,
        mildClothes: false,
        warmClothes: false,
        summerClothes: false
    };

    let expectedResult = {
        rainClothes: true,
        winterClothes: true,
        coldClothes: false,
        chillyClothes: false,
        mildClothes: true,
        warmClothes: false,
        summerClothes: true
    }

    assert.deepEqual(weatherApp.updateRecomendations(processedWeatherData,clothesRecomendations),expectedResult)

})

//checkIfRainClothesAreNeeded tests=======================================================================================

QUnit.test("checkIfRainClothesAreNeeded1",assert => {
    //Mock objects
    let processedWeatherData = [{ time: '2020-03-01 00:00:00', tempFellsLike: 2, weather: 'Sunny' },
                                { time: '2020-03-01 06:00:00', tempFellsLike: 97, weather: 'Sunny' },
                                { time: '2020-03-01 12:00:00', tempFellsLike: 98, weather: 'Sunny' },
                                { time: '2020-03-01 18:00:00', tempFellsLike: 99, weather: 'Sunny' }];
    let expectedResult = false;
                                
    assert.equal(weatherApp.checkIfRainClothesAreNeeded(processedWeatherData),expectedResult);
})

QUnit.test("checkIfRainClothesAreNeeded2",assert => {
    //Mock objects
    let processedWeatherData = [{ time: '2020-03-01 00:00:00', tempFellsLike: 2, weather: 'Rain' },
                                { time: '2020-03-01 06:00:00', tempFellsLike: 97, weather: 'Sunny' },
                                { time: '2020-03-01 12:00:00', tempFellsLike: 98, weather: 'Sunny' },
                                { time: '2020-03-01 18:00:00', tempFellsLike: 99, weather: 'Sunny' }];
    let expectedResult = true;
                                
    assert.equal(weatherApp.checkIfRainClothesAreNeeded(processedWeatherData),expectedResult);
})

QUnit.test("checkIfRainClothesAreNeeded3",assert => {
    //Mock objects
    let processedWeatherData = [{ time: '2020-03-01 00:00:00', tempFellsLike: 2, weather: 'Rain' },
                                { time: '2020-03-01 06:00:00', tempFellsLike: 97, weather: 'Rain' },
                                { time: '2020-03-01 12:00:00', tempFellsLike: 98, weather: 'Sunny' },
                                { time: '2020-03-01 18:00:00', tempFellsLike: 99, weather: 'Sunny' }];
    let expectedResult = false;
                                
    assert.notEqual(weatherApp.checkIfRainClothesAreNeeded(processedWeatherData),expectedResult);
})


//checkIfClothesAreNeededAccordingToTemperature tests=======================================================================================


QUnit.test("checkIfClothesAreNeededAccordingToTemperature1", assert => {
    //mock object

    let mockProcessedWeatherData = [{ time: '2020-03-01 06:00:00', tempFellsLike: 21, weather: 'Sunny' }];


    assert.true(weatherApp.checkIfClothesAreNeededAccordingToTemperature(mockProcessedWeatherData, 0, 23));
    
})


QUnit.test("checkIfClothesAreNeededAccordingToTemperature2", assert => {
    //mock object

    let mockProcessedWeatherData = [{ time: '2020-03-01 06:00:00', tempFellsLike: -10, weather: 'Sunny' }];


    assert.true(weatherApp.checkIfClothesAreNeededAccordingToTemperature(mockProcessedWeatherData, -100, 10));
    
})
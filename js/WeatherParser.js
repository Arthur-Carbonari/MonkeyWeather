class WeatherParser{


    static parseWeatherData(weatherData, date) {

        let numberOfForecastsUntilTomorrow = WeatherParser.getNumberForecastsUntilTomorrow(date);
        let weatherDataForTheNextThreeDays = WeatherParser.getWeatherDataForTheNextThreeDays(weatherData, numberOfForecastsUntilTomorrow);
    
        let processedData = [];
    
        for (let i = 0; i < weatherDataForTheNextThreeDays.length; i = i + 2) {
    
            processedData.push({
                time: weatherDataForTheNextThreeDays[i].dt_txt,
                tempFellsLike: weatherDataForTheNextThreeDays[i].main.feels_like,
                weather: weatherDataForTheNextThreeDays[i].weather[0].main
            });
        }
    
        return processedData;
    }


    static getNumberForecastsUntilTomorrow(date) {
        let hoursInADay = 24;
    
        let now = date;
    
        let hoursUntilTomorrow = hoursInADay - now.getHours();
    
        let numberOfForecastsUntilTomorrow = Math.ceil(hoursUntilTomorrow / 3);
    
        return numberOfForecastsUntilTomorrow;
    }
    
    
    
    static getWeatherDataForTheNextThreeDays(weatherData, numberOfForecastsUntilTomorrow) {
        let forecastsInADay = 24 / 3;
        let forecastsInNextThreeDays = forecastsInADay * 3;
        let n = numberOfForecastsUntilTomorrow;
        let weatherDataForTheNextThreeDays = [];
    
        for (let i = 0; i < forecastsInNextThreeDays; i++) {
            if(weatherData.list[numberOfForecastsUntilTomorrow + i] == null) continue;
            weatherDataForTheNextThreeDays.push( weatherData.list[n + i]) ;
        }
    
        return weatherDataForTheNextThreeDays;
    }
}
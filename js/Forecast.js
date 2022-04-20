import Parser from "./Parser.js";

/**
 * This class represent the forecast information of a day in a determinated location.
 */
export default class Forecast{
    
    /**
     *  String the representes the date of the forecast in the format DD/MM.
     */
    date;

    /**
     * Object that stores the feelLike temperature for this forecast in during the morning, day, evening and night.
     */
    feels_like;

    /**
     * Small string that represent the weather state for this forecast.
     */
    weatherMain;

    /**
     * String that describes the weather in more detail the weather state for this forecast.
     */
    weatherDescription;


    /**
     * 
     * @param {String} date - String the representes the date of the forecast in the format DD/MM.
     * @param {Object} feels_like - Object that stores the feelLike temperature for this forecast in during the morning, day, evening and night.
     * @param {String} weatherMain - Small string that represent the weather state for this forecast.
     * @param {String} weatherDescription - String that describes the weather in more detail the weather state for this forecast.
     */
    constructor(date, feels_like, weatherMain, weatherDescription){
        this.date = date;
        this.feels_like = feels_like;
        this.weatherMain = weatherMain;
        this.weatherDescription = weatherDescription;
    }


    /**
     * This method returns an array with all the feel like temperature throughout the day for this forecast.
     * @returns {double[]} Array containing all the feel like temperature for this forecast.
     */
    getAllTemperatures(){
        let temperatures = [];
        let feelLike = this.feels_like;

        temperatures.push(feelLike.day);
        temperatures.push(feelLike.eve);
        temperatures.push(feelLike.morn);
        temperatures.push(feelLike.night);

        return temperatures;
    }


    /**
     *  This method takes as parameter the data from the forecast received from the One Call API and use it to create an Array of Forecast type containing the Forecast for the next 3 days.
     * @param {OneCallApiData} forecastData - The forecast data return by the API 'One Call API' from openweathermap.org.
     * @returns {Forecast[]} - Array of type Forecast containing the forecast for the next three days.
     */
    static getForecastsFromData(forecastData){

        let parsedForecast = [];


        for (let index = 1; index < 4; index++) {
            
            let selectedDate = forecastData.daily[index];

            let date = Parser.unixToDate(selectedDate.dt);
            let feels_like = selectedDate.feels_like;
            let weatherMain = selectedDate.weather[0].main;
            let weatherDescription = selectedDate.weather[0].description;
            
            let forecast = new Forecast(date, feels_like, weatherMain, weatherDescription);

            parsedForecast.push(forecast);
        }


        return parsedForecast;
    }
}
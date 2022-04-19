import Parser from "./Parser.js";

export default class Forecast{
    date;
    feels_like;
    weatherMain;
    weatherDescription;



    constructor(date, feels_like, weatherMain, weatherDescription){
        this.date = date;
        this.feels_like = feels_like;
        this.weatherMain = weatherMain;
        this.weatherDescription = weatherDescription;
    }


    getAllTemperatures(){
        let temperatures = [];
        let feelLike = this.feels_like;

        temperatures.push(feelLike.day);
        temperatures.push(feelLike.eve);
        temperatures.push(feelLike.morn);
        temperatures.push(feelLike.night);

        return temperatures;
    }


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
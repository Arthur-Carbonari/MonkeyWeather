import Forecast from "./Forecast.js";
import ClothesRecomendations from "./ClothesRecomendations.js";

export default class Destination{

    name;
    forecast;
    lat;
    lon;
    clothesRecomendation = new ClothesRecomendations;

    constructor(location){
        this.name = location.name;
        this.lat = location.lat;
        this.lon = location.lon;
    }

    /**
     * This methods returns an array all the date string for each of the Forecast objects stored in the forecast array of this Destination object.
     * @returns {string[]} Array of string representation of dates in the format DD/MM.
     */
    getDates(){
        let dates = [];

        this.forecast.forEach(forecast => {
            dates.push(forecast.date);
        });

        return dates;
    }


    /**
     * This method updates the forecast atribute of this object so that only the indexes supplied in the options array are kept.
     * @param {int} options - Array containing the desired indexes that we want to keep of the forecast array.
     */
    selectDates(options){
        options.sort();

        let forecast = [];

        options.forEach(option => {
            let index = option - 1;
            forecast.push(this.forecast[index]);
        });

        this.forecast = forecast;
    }

    /**
     * This method returns an array that contains all the values of temperature for each of the Forecast objects inside of the forecast array of this Destination object.
     * @returns {double} Array containing all the feel like temperature for this Destination forecasts.
     */
    getAllForecastTemperatures(){
        let temperatures = [];

        this.forecast.forEach(forecast => {
            temperatures = temperatures.concat(forecast.getAllTemperatures());
        });

        return temperatures;
    }

    /**
      * This method stores all the weatherMain strings of the Forecasts stored in this Destination object inside of an array and then returns that array.
     * @returns {string} Array containing all the weatherMain for this Destination forecasts.
     */
    getAllForecastWeather(){
        let weather = [];

        this.forecast.forEach(forecast => {
            weather.push(forecast.weatherMain);
        });

        return weather;
    }


    updateClothesRecomendation(){
        let temperatures = this.getAllForecastTemperatures();
        let weather = this.getAllForecastWeather();

        temperatures.forEach(temp => {
            this.clothesRecomendation.updateByTemp(temp);
        });

        weather.forEach(element => {
            this.clothesRecomendation.updateByWeather(element);
        });

        return this.clothesRecomendation;
    }

    toString(){
        let datesString = this.getDates().toString();
        let string = `<li> ${this.name} - (${this.getDates()} )</li>`;

        return string;
    }

    asHtmlElement(){
        let element = document.createElement("div");
        element.classList.add("destination");

        element.innerHTML = `<h3>${this.name}</h3>`;

        this.forecast.forEach(forecast => {
            element.append(forecast.asHtmlElement());
        });


        return element;
    }

}
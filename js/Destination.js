import Forecast from "./Forecast.js";
import ClothesRecomendations from "./ClothesRecomendations.js";

export default class Destination{

    name;
    forecast;
    lat;
    lon;
    clothesRecomendation;

    constructor(location){
        this.name = location.name;
        this.lat = location.lat;
        this.lon = location.lon;
    }


    getDates(){
        let dates = [];

        this.forecast.forEach(forecast => {
            dates.push(forecast.date);
        });

        return dates;
    }


    selectDates(options){
        options.sort();

        let forecast = [];

        options.forEach(option => {
            let index = option - 1;
            forecast.push(this.forecast[index]);
        });

        this.forecast = forecast;
    }


    getAllForecastTemperatures(){
        let temperatures = [];

        this.forecast.forEach(forecast => {
            temperatures = temperatures.concat(forecast.getAllTemperatures());
        });

        return temperatures;
    }


    getAllForecastWeather(){
        let weather = [];

        this.forecast.forEach(forecast => {
            weather.push(forecast.weatherMain);
        });

        return weather;
    }


    getClothesRecomendation(){
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

}
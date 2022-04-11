class WeatherFetcher{
    static apiKey = "494fc1fc164a54a3b6d1a694769dce7e";
    static exclude = "current,hourly,minutely";


    static async getWeatherData(location){
        //let  response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${this.apiKey}&units=metric`);
        let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=${this.exclude}&units=metric&appid=${this.apiKey}`);

        let weatherData = await response.json();

        return await weatherData;
    }

}



class ForecastParser{

    static parseForecast(forecastData, selectedDates){

        let parsedForecast = [];

        selectedDates.forEach(index => {
            
            let selectedDate = forecastData.daily[index];

            let forecast = {
                date : this.unixToDate(selectedDate.dt),
                feels_like : selectedDate.feels_like,
                weatherMain: selectedDate.weather[0].main,
                weatherDescription: selectedDate.weather[0].description
            }

            parsedForecast.push(forecast);
        });

        return parsedForecast;
    }


    static unixToDate(unixTimesStamp){

        let date = new Date(unixTimesStamp * 1000);

        return DateParser.toDayMonth(date);
        
    }

}

class DateParser{

    static toDayMonth(date){
        let day = date.getDate();

        if(day < 10) day = "0" + day;

        let month = date.getMonth() + 1;

        if(month<10) month = "0" + month;

        return day + "/" + month;
    }
}
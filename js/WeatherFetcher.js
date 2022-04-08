class WeatherFetcher{
    static apiKey = "494fc1fc164a54a3b6d1a694769dce7e";


    static async getWeatherData(locationName){
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${this.apiKey}&units=metric`);

        let weatherData = await response.json();

        return await weatherData;
    }

}
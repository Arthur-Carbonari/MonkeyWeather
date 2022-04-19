class ForecastFetcher{
    static apiKey = "494fc1fc164a54a3b6d1a694769dce7e";
    static exclude = "current,hourly,minutely";


    static async getForecastData(location){

        let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=${this.exclude}&units=metric&appid=${this.apiKey}`);

        let weatherData = await response.json();

        return await weatherData;
    }


}


class LocationFetcher{
    
    static async getLocation(locationName){
        let response = await fetch(`https://geocode.maps.co/search?city=${locationName}&accept-language=en`);
        
        let locationData = await response.json();

        return locationData;
    }
}

export {ForecastFetcher, LocationFetcher};
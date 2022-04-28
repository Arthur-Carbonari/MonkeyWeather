class Fetcher{

    static timeLimit = 4000;

    static async fetchWithTimeLimit(timeLimit, task, failureValue){
        let timeout;
        const timeoutPromise = new Promise((resolve, reject) => {
            timeout = setTimeout(() => {
                resolve(failureValue);
            }, timeLimit);
        });
        const response = await Promise.race([task, timeoutPromise]);
        if(timeout){ //the code works without this but let's be safe and clean up the timeout
            clearTimeout(timeout);
        }
        return response;
    }

}

/**
 * This class commuicates and to retrieves the weather data from One Call API from openweathermap.org.
 */
class ForecastFetcher extends Fetcher{

    /**API ke for the open weather API */
    static apiKey = "494fc1fc164a54a3b6d1a694769dce7e"; 

    /**contains what wheather data is to be excuded upon weather data retrieval */
    static exclude = "current,hourly,minutely"; 

    /**
     * contins the weather information from the weather data retrieved
     * @param {*} location location requested by the user
     * @returns  weatherData - contains 7 days of eather data for location. 
     */
    static async getForecastData(location){

        let call = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=${this.exclude}&units=metric&appid=${this.apiKey}`);

        let response = await LocationFetcher.fetchWithTimeLimit(this.timeLimit, call, "Failure");

        let weatherData = await response.json();

        return await weatherData;
    }


}


/**
 * This class communicates the location inputted by the user to the Free Geocoding API from https://geocode.maps.co/ which then returns an array of cities that matches the user input.
 */
class LocationFetcher extends Fetcher{
    
    /**
     * 
     * @param {*} locationName //name of city inputted by user
     * @returns a array of all the cities with a name that matches locationNmae
     */
    static async getLocation(locationName){

        let call = fetch(`https://geocode.maps.co/search?city=${locationName}&accept-language=en`);

        let response = await LocationFetcher.fetchWithTimeLimit(this.timeLimit, call, "Failure");

        if(response === "Failure"){
            return response;
        }
        
        let locationData = await response.json();

        return locationData;
    }

}

export {ForecastFetcher, LocationFetcher}; 
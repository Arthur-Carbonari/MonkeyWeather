export default class Location{

    /** String that represents the name of the city the user will go to */
    name;

    /** Latitiude of location*/ 
    lat;

    /** Longitude of location */
    lon;

/**
 * 
 * @param {string} name - The name of the location.
 * @param {double} lat - The Latitiude of the location.
 * @param {double} lon - The Longitude of the location.
 */
    constructor(name, lat, lon){
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    /**
     * This method generates an array of Location objects from the data received from the Free Geocoding API.
     * @param {FreeGeocodingApi[]} locationData - Location data array returned by the Free Geocoding API from https://geocode.maps.co/.
     * @returns {Location[]} Array of type Location corresponding to each elements in the input array.
     */
    static getLocationsFromData(locationData){

        let parsedLocationData = [];

        locationData.forEach(element => {
            let location = new Location(element.display_name, element.lat, element.lon);

            parsedLocationData.push(location);
        });

        return parsedLocationData;

    }
}
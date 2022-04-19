export default class Location{
    name;
    lat;
    lon;

    constructor(name, lat, lon){
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }


    static getLocationsFromData(locationData){

        let parsedLocationData = [];

        locationData.forEach(element => {
            let location = new Location(element.display_name, element.lat, element.lon);

            parsedLocationData.push(location);
        });

        return parsedLocationData;

    }
}
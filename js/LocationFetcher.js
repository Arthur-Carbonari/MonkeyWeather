class LocationFetcher{
    
    static async getLocation(locationName){
        let response = await fetch(`https://geocode.maps.co/search?city=${locationName}&accept-language=en`);
        
        let locationData = await response.json();
        console.log(locationData);

        return LocationParser.parseLocation(locationData);
    }
}


class LocationParser{

    static parseLocation(locationData){

        let parsedLocationData = [];

        locationData.forEach(element => {
            let location = new Location(element.display_name, element.lat, element.lon);

            parsedLocationData.push(location);
        });

        return parsedLocationData;

    }

}

class Location{
    name;
    lat;
    lon;

    constructor(name, lat, lon){
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }
}
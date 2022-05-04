//Call
import Location from "./Location";

describe("Location",() => {
    //Prepare constructor arguments
    let name = "Istanbul";
    let lat = 41.015137;
    let lon = 28.979530;
    //Initiate Location
    let mockLocation = new Location(name,lat,lon);

    test("Constructor test",() => {
        //Test constructor
        expect(mockLocation.name).toBe("Istanbul");
        expect(mockLocation.lat).toBe(41.015137);
        expect(mockLocation.lon).toBe(28.979530);
    })

    test("getLocationFromData test",() => {
        //Create mock data
        let mockData = [{"place_id":18171373,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":1882099475,"boundingbox":["40.8496334","41.1696334","28.8051646","29.1251646"],"lat":"41.0096334","lon":"28.9651646","display_name":"Istanbul, Fatih, Istanbul, Marmara Region, 34126, Turkey","class":"place","type":"city","importance":0.8247656681002855},
        {"place_id":286942693,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"relation","osm_id":1109531,"boundingbox":["53.2987342","53.4105416","-6.3870259","-6.1148829"],"lat":"53.3497645","lon":"-6.2602732","display_name":"Dublin, County Dublin, Leinster, Ireland","class":"boundary","type":"administrative","importance":0.8115896071732729}]

        let parsedData = Location.getLocationsFromData(mockData);
        //Control names
        expect(parsedData[0].name).toBe('Istanbul, Fatih, Istanbul, Marmara Region, 34126, Turkey');
        expect(parsedData[1].name).toBe('Dublin, County Dublin, Leinster, Ireland');
        //Control lat
        expect(parsedData[0].lat).toBe('41.0096334');
        expect(parsedData[1].lat).toBe('53.3497645');
        //Control lon
        expect(parsedData[0].lon).toBe('28.9651646');
        expect(parsedData[1].lon).toBe('-6.2602732');

    })
})
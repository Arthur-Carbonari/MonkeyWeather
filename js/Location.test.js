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
        let mockData = ['a:13:{s:5:"coord";a:2:{s:3:"lon";d:28.979530;s:3:"lat";d:41.015137;}s:7:"weather";a:1:{i:0;a:4:{s:2:"id";i:800;s:4:"main";s:5:"Clear";s:11:"description";s:9:"clear sky";s:4:"icon";s:3:"01d";}}s:4:"base";s:8:"stations";s:4:"main";a:6:{s:4:"temp";d:282.55;s:10:"feels_like";d:281.86;s:8:"temp_min";d:280.37;s:8:"temp_max";d:284.26;s:8:"pressure";i:1023;s:8:"humidity";i:100;}s:10:"visibility";i:10000;s:4:"wind";a:2:{s:5:"speed";d:1.5;s:3:"deg";i:350;}s:6:"clouds";a:1:{s:3:"all";i:1;}s:2:"dt";i:1560350645;s:3:"sys";a:6:{s:4:"type";i:1;s:2:"id";i:5122;s:7:"message";d:0.0139;s:7:"country";s:2:"US";s:7:"sunrise";i:1560343627;s:6:"sunset";i:1560396563;}s:8:"timezone";i:-25200;s:2:"id";i:420006353;s:4:"name";s:13:"Istanbul";s:3:"cod";i:200;}','a:13:{s:5:"coord";a:2:{s:3:"lon";d:-122.08;s:3:"lat";d:37.39;}s:7:"weather";a:1:{i:0;a:4:{s:2:"id";i:800;s:4:"main";s:5:"Clear";s:11:"description";s:9:"clear sky";s:4:"icon";s:3:"01d";}}s:4:"base";s:8:"stations";s:4:"main";a:6:{s:4:"temp";d:282.55;s:10:"feels_like";d:281.86;s:8:"temp_min";d:280.37;s:8:"temp_max";d:284.26;s:8:"pressure";i:1023;s:8:"humidity";i:100;}s:10:"visibility";i:10000;s:4:"wind";a:2:{s:5:"speed";d:1.5;s:3:"deg";i:350;}s:6:"clouds";a:1:{s:3:"all";i:1;}s:2:"dt";i:1560350645;s:3:"sys";a:6:{s:4:"type";i:1;s:2:"id";i:5122;s:7:"message";d:0.0139;s:7:"country";s:2:"US";s:7:"sunrise";i:1560343627;s:6:"sunset";i:1560396563;}s:8:"timezone";i:-25200;s:2:"id";i:420006353;s:4:"name";s:13:"Mountain View";s:3:"cod";i:200;}']

        let parsedData = Location.getLocationsFromData(mockData);
        //Controls
        console.log(parsedData);

    })
})
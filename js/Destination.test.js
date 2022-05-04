//Call Destination and Location
import Destination from "./Destination";
import Location from "./Location";
import Forecast from "./Forecast";

describe("Destination", () => {
    //Prepare constructor arguments
    let name = "Istanbul";
    let lat = 41.015137;
    let lon = 28.979530;
    //Initiate Location object
    let mockLoc = new Location(name,lat,lon);
    //Initiate Destination object
    let mockDest = new Destination(mockLoc);

    test("Constructor test",() => {
        expect(mockDest.name).toBe("Istanbul");
        expect(mockDest.lat).toBe(41.015137);
        expect(mockDest.lon).toBe(28.979530);
    })

    describe("Forecast",() => {
        
        test("selectDates test",() => {
            let mockOptions = [new Forecast('20/3', {"day":10.56,"night":10.39,"eve":11.91,"morn":5.82}, "Clear", "clear sky"),
                           new Forecast('21/3', {"day":12.59,"night":12.51,"eve":13.24,"morn":7.51}, "Clouds", "overcast clouds"),
                           new Forecast('22/3', {"day":18.64,"night":17.07,"eve":19.76,"morn":11.45}, "Clouds", "broken clouds")];

            mockDest.forecast = mockOptions;
            
            let options = [1,3,2];
            mockDest.selectDates(options);
            
            expect(mockDest.forecast).toStrictEqual(mockOptions);
        })

        test("getDates test",() => {
            expect(mockDest.getDates()).toStrictEqual(['20/3','21/3','22/3'])
        }) 
        
        test("getAllForecastTemperatures test",() => {
            let tempArr = [10.56,11.91,5.82,10.39,12.59,13.24,7.51,12.51,18.64,19.76,11.45,17.07];
            expect(mockDest.getAllForecastTemperatures()).toStrictEqual(tempArr)
        })

        test("getAllForecastWeather test",() => {
            let tempArr = ["Clear","Clouds","Clouds"];
            expect(mockDest.getAllForecastWeather()).toStrictEqual(tempArr)
        })

        test("getAllForecastWeather test",() => {
            let tempArr = ["Clear","Clouds","Clouds"];
            expect(mockDest.getAllForecastWeather()).toStrictEqual(tempArr)
        })

        test("updateClothesRecomendation test",() => {
            let clothArr = mockDest.updateClothesRecomendation();
            expect(clothArr.heavyCoat).toBe(0);
            expect(clothArr.warmJacket).toBe(2);
            expect(clothArr.sweatshirt).toBe(10);
            expect(clothArr.lightClothes).toBe(0);
            expect(clothArr.summerClothes).toBe(0);
            expect(clothArr.rainCoat).toBe(0);
        })
        
    })
})
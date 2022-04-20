import ClothesRecomendations from "./ClothesRecomendations";

describe("ClothesRecommendations",() => {
    let mockRecom = new ClothesRecomendations();

    test("Constructor test",() => {
        expect(mockRecom.heavyCoat).toBe(0);
        expect(mockRecom.warmJacket).toBe(0);
        expect(mockRecom.sweatshirt).not.toBe(10);
        expect(mockRecom.lightClothes).toBe(0);
        expect(mockRecom.summerClothes).toBe(0);
        expect(mockRecom.rainCoat).not.toBe(1);
  
    })

    test("updateByTemp test",() => {
        mockRecom.updateByTemp(5);
        expect(mockRecom.warmJacket).toBe(1);
        mockRecom.updateByTemp(31);
        expect(mockRecom.summerClothes).not.toBe(0);
    })

    test("updateByWeather test",() => {
        mockRecom.updateByWeather("Monkey");
        expect(mockRecom.rainCoat).toBe(0);
        mockRecom.updateByWeather("Rain");
        expect(mockRecom.rainCoat).not.toBe(0);

    })
    
    test("temperatureBetween test",() => {
        expect(mockRecom.temperatureBetween(5,10,20)).not.toBe(true);
        expect(mockRecom.temperatureBetween(15,10,20)).toBe(true);
    })
    
    test("combineRecommendations test",() => {
        let secondRecom = new ClothesRecomendations();
        secondRecom.warmJacket = 5;
        secondRecom.summerClothes = 1;
        secondRecom.rainCoat = -1;
        mockRecom.combineRecomendations(secondRecom);
        
        expect(mockRecom.heavyCoat).toBe(0);
        expect(mockRecom.warmJacket).toBe(6);
        expect(mockRecom.sweatshirt).not.toBe(10);
        expect(mockRecom.lightClothes).toBe(0);
        expect(mockRecom.summerClothes).toBe(2);
        expect(mockRecom.rainCoat).not.toBe(1);

        
    })
})
export default  class ClothesRecomendations{
    heavyCoat = 0;
    coat = 0;
    warmJacket = 0;
    sweatshirt = 0;
    lightClothes = 0;
    summerClothes = 0;
    
    rainCoat = 0;

    updateByTemp(temp){
        if(this.temperatureBetween(temp, -10, 0)) this.heavyCoat++;
    }

    updateByWeather(weather){
        if(weather === "Rain") this.rainCoat++;
    }

    updateRecomendations(processedWeatherData) {

        if (!this.rainClothes) {
            this.rainClothes = this.checkIfRainClothesAreNeeded(processedWeatherData);
        }

        if (!this.winterClothes) {
            this.winterClothes = this.checkTemperatureBetween(processedWeatherData, -100, 5);
        }
        if (!this.coldClothes) {
            this.coldClothes = this.checkTemperatureBetween(processedWeatherData, 5, 15);
        }

        if (!this.chillyClothes) {
            this.chillyClothes = this.checkTemperatureBetween(processedWeatherData, 15, 20);
        }

        if (!this.mildClothes) {
            this.mildClothes = this.checkTemperatureBetween(processedWeatherData, 20, 25);
        }

        if (!this.warmClothes) {
            this.warmClothes = this.checkTemperatureBetween(processedWeatherData, 25, 30);
        }

        if (!this.summerClothes) {
            this.summerClothes = this.checkTemperatureBetween(processedWeatherData, 30, 100);
        }

    }


    checkIfRainClothesAreNeeded(processedWeatherData) {

        let rainClothesAreNeeded = false;
    
        processedWeatherData.forEach(element => {
    
            if (element.weather === "Rain") {
                rainClothesAreNeeded = true;
                return;
            }
    
        });
        
        return rainClothesAreNeeded;
    }
    
    
    
    temperatureBetween(processedWeatherData, minimum, maximum) {
    
        let clothesAreNeeded = false;
    
        processedWeatherData.forEach(element => {
    
            if (minimum < element.tempFellsLike && element.tempFellsLike <= maximum){
                clothesAreNeeded = true;
                return;
            } 
    
        });
    
        return clothesAreNeeded;
    }
}
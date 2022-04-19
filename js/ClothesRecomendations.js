export default  class ClothesRecomendations{
    heavyCoat = 0;
    warmJacket = 0;
    sweatshirt = 0;
    lightClothes = 0;
    summerClothes = 0;
    
    rainCoat = 0;

    updateByTemp(temp){
        if(this.temperatureBetween(temp, -100, 0)) this.heavyCoat++;
        else if(this.temperatureBetween(temp, 0, 10)) this.warmJacket++;
        else if(this.temperatureBetween(temp, 10, 20)) this.sweatshirt++;
        else if(this.temperatureBetween(temp,20,30)) this.lightClothes++;
        else this.summerClothes++;
    }

    updateByWeather(weather){
        if(weather === "Rain") this.rainCoat++;
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

    getMessage(){
       let message = "Great! These are the clothes you will need to bring with you. <ul>";
        if(this.heavyCoat>0 && this.heavyCoat<5){
            message = message + "<li> Consider bringing a heavy coat.</li>";
        }
        else{
            message = message  + "<li> You may want to consider bringing several heavy coats.</li>"
        }
        
        if(this.rainCoat>0 && this.rainCoat<5){
            message = message + "<li> Consider bringing a rain coat.</li>";
        }
        else{
            message = message + "<li> You may want to consider bringing several rain coats.</li>";
        }
       
        if(this.sweatshirt>0 && this.sweatshirt<5){
            message = message + "<li> Consider bringing a sweatshirt.</li>";
        }
        else{
            message = message + "<li> You may want to consider bringing several sweatshirts.</li>";
        }

        if(this.lightClothes>0 && this.lightClothes<5){
            message = message + "<li> Consider bringing light clothes.</li>";
        }
        else{
            message = message + "<li> You may want to consider bringing lots of light clothes.</li>";
        }
        if(this.summerClothes>0 && this.summerClothes<5){
            message = message + "<li> Consider bringing summer clothes.</li>";
        }
        else{
            message = message + "<li> You may want to consider bringing lots of summer clothes.</li>";
        }
        
        message = message + "</ul> Make sure u bring all the clothes you need. Have a nice trip.";

        return message ;
    }

    combineRecomendations(clothesRecomendation){
        this.heavyCoat = this.heavyCoat + clothesRecomendation.heavyCoat;
        this.rainCoat = this.rainCoat + clothesRecomendation.rainCoat;
        this.sweatshirt = this.sweatshirt + clothesRecomendation.sweatshirt;
        this.lightClothes = this.lightClothes + clothesRecomendation.lightClothes;
        this.summerClothes = this.summerClothes + clothesRecomendation.summerClothes;
    }
}
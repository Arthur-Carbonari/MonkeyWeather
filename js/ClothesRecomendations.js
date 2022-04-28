export default  class ClothesRecomendations{
    heavyCoat;
    warmJacket;
    sweatshirt;
    lightClothes;
    summerClothes;
    
    rainCoat;

    constructor(){
        this.heavyCoat = 0;
        this.warmJacket = 0;
        this.sweatshirt = 0;
        this.lightClothes = 0;
        this.summerClothes = 0;
        this.rainCoat = 0;
    }

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
    
    
    temperatureBetween(temp, minimum, maximum) {
    
        return (minimum < temp && temp <= maximum);
    }

    getMessage(){


        let message = "Great! These are the clothes you will need to bring with you. <ul>";

        if(this.heavyCoat>0){
            
            if (this.heavyCoat<=5) message += "<li> Consider bringing a heavy coat.</li>";
            else  message += "<li> You may want to consider bringing a few heavy coats.</li>";
        }

        if(this.warmJacket>0){
            
            if (this.warmJacket<=5) message += "<li> Consider bringing a warm jacket.</li>";
            else  message += "<li> You may want to consider bringing a few warm jackets.</li>";
        }
       
        if(this.sweatshirt>0){
            
            if(this.sweatshirt<=5) message += "<li> Consider bringing a sweatshirt.</li>";
            else message += "<li> You may want to consider bringing a few sweatshirts.</li>";
        }

        if(this.lightClothes>0){
            
            if(this.lightClothes<=5) message += "<li> Consider bringing light clothes.</li>";
            else message += "<li> You may want to consider bringing lots of light clothes.</li>";
        }

        if(this.summerClothes>0){
            
            if(this.summerClothes<=5) message += "<li> Consider bringing summer clothes.</li>";
            else message += "<li> You may want to consider bringing lots of summer clothes.</li>";
        }


        if(this.rainCoat>0){
            
            if(this.rainCoat<=5) message += "<li> Consider bringing a rain coat.</li>";
            else message += "<li> You may want to consider bringing a few rain coats.</li>";
        }

        
        message += "</ul> Make sure u bring all the clothes you need. Have a nice trip.";

        return message;
    }


    combineRecomendations(clothesRecomendation){

        this.heavyCoat = this.heavyCoat + clothesRecomendation.heavyCoat;
        this.rainCoat = this.rainCoat + clothesRecomendation.rainCoat;
        this.sweatshirt = this.sweatshirt + clothesRecomendation.sweatshirt;
        this.lightClothes = this.lightClothes + clothesRecomendation.lightClothes;
        this.summerClothes = this.summerClothes + clothesRecomendation.summerClothes;
        this.warmJacket = this.warmJacket + clothesRecomendation.warmJacket;

    }


    asHtmlElement(){
        let element = document.createElement("div");
        element.classList.add("clothesRecomendation");

        let innerHtml = "<h4>You should consider bringing:</h4><ul>";

        if(this.heavyCoat > 0) innerHtml += "<li>Heavy Coat</li>";
        if(this.warmJacket > 0) innerHtml += "<li>Warm Jacket</li>";
        if(this.sweatshirt > 0) innerHtml += "<li>Sweatshirt</li>";
        if(this.lightClothes > 0) innerHtml += "<li>Light Clothes</li>";
        if(this.summerClothes > 0) innerHtml += "<li>Summer Clothes</li>";
        if(this.rainCoat > 0) innerHtml += "<li>Rain Coat</li>";

        innerHtml += "</ul>";

        element.innerHTML = innerHtml;

        

        return element;
    }
}
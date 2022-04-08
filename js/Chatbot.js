class Chatbot{
    
    clothesRecomendations = {
        rainClothes: false,
        winterClothes: false,
        coldClothes: false,
        chillyClothes: false,
        mildClothes: false,
        warmClothes: false,
        summerClothes: false
    };
    
    state;
    confirmedLocations;
    selectedLocations = [];
    weatherFetcher = new WeatherFetcher();

    constructor(){
        this.state = new GreetingState(this); 
    }
    

    async getBotResponse(input){
        return this.state.processInput(input);
    }
}


class GreetingState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    processInput(input){
        this.machine.state = new MainState(this.machine);
        return "Hi, im the weather bot, please select one of the options bellow or tell me if you want to begin with your locations.";
    }
}


class MainState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    processInput(input){
        this.machine.state = new BookingState(this.machine);
        return "Ok, please tell me your first location.";
    }
}

class BookingState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    async processInput(input){
        let weatherData = await WeatherFetcher.getWeatherData(input);
        this.machine.state = new ConfirmingState(this.machine, weatherData);
        return "Are you sure you want to go to " + input + "?";
    }


}


class ConfirmingState{
    machine;
    weatherData;
    date = new Date;

    constructor(machine, weatherData){
        this.machine = machine;
        this.weatherData = weatherData;
    }

    processInput(input){
        if(input === "yes"){
            let parsedData = WeatherParser.parseWeatherData(this.weatherData, this.date);
            this.machine.selectedLocations.push(parsedData);
            this.machine.clothesRecomendations = this.updateRecomendations(parsedData, this.machine.clothesRecomendations);

            if(this.machine.selectedLocations.length > 4){
                console.log(this.machine.selectedLocations);
                this.machine.state = new RecomendationState(this.machine);
                return "Ok thats all of them, are you satisfied with all the destinations that you choosed?"
            }

            this.machine.state = new BookingState(this.machine);
            return "i printed the data to the console, please choose your next destination.";
        }
        else{
            this.machine.state = new BookingState(this.machine);
            return "Ok, i'll forget about that one, what is your next destination then?";
        }
    }


    updateRecomendations(processedWeatherData, clothesRecomendations) {

        if (!clothesRecomendations.rainClothes) {
            clothesRecomendations.rainClothes = checkIfRainClothesAreNeeded(processedWeatherData);
        }
        if (!clothesRecomendations.winterClothes) {
            clothesRecomendations.winterClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, -100, 5);
        }
        if (!clothesRecomendations.coldClothes) {
            clothesRecomendations.coldClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 5, 15);
    
        }
        if (!clothesRecomendations.chillyClothes) {
            clothesRecomendations.chillyClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 15, 20);
        }
        if (!clothesRecomendations.mildClothes) {
            clothesRecomendations.mildClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 20, 25);
        }
        if (!clothesRecomendations.warmClothes) {
            clothesRecomendations.warmClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 25, 30);
        }
        if (!clothesRecomendations.summerClothes) {
            clothesRecomendations.summerClothes = checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, 30, 100);
        }
        console.log(clothesRecomendations);
        return clothesRecomendations;
    }


    checkIfRainClothesAreNeeded(processedWeatherData) {

        let rainClothesAreNeeded = false;
    
        processedWeatherData.forEach(element => {
    
            if (element.weather === "Rain") rainClothesAreNeeded = true;
    
        });
        
        return rainClothesAreNeeded;
    }
    
    
    
    checkIfClothesAreNeededAccordingToTemperature(processedWeatherData, minimum, maximum) {
    
        let clothesAreNeeded = false;
    
        processedWeatherData.forEach(element => {
    
            if (minimum < element.tempFellsLike && element.tempFellsLike <= maximum) clothesAreNeeded = true;
    
        });
    
        return clothesAreNeeded;
    }
}


class RecomendationState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    processInput(input){
        if (input === "yes"){
            return this.clothesMessage(this.machine.clothesRecomendations);
        }

        
    }


    clothesMessage(clothesRecomendations) {

        let message = "You will need ";
        if (clothesRecomendations.rainClothes) {
            message = message + "rainy weather clothes, ";
        }
        if (clothesRecomendations.winterClothes) {
            message = message + "winter clothes, ";
        }
        if (clothesRecomendations.coldClothes) {
            message = message + "cold weather clothes, ";
    
        }
        if (clothesRecomendations.chillyClothes) {
            message = message + "chilly weather clothes, ";    
        }
        if (clothesRecomendations.mildClothes) {
            message = message + "mild weather clothes, ";
        }
        if (clothesRecomendations.warmClothes) {
            message = message + "warm weather clothes, ";
        }
        if (clothesRecomendations.summerClothes) {
           message = message + "summer clothes, "
        }
    
        return message + "make sure u bring all the clothes you need. Have a nice trip.";
    }
}
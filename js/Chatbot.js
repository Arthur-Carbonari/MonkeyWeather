class Chatbot{
    
    clothesRecomendations = new ClothesRecomendations();

    //clothesSet = new Set();
    
    state;
    selectedDestination = [];

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
        this.machine.state = new StartState(this.machine);
        return "Hi, I'm the weather bot, please select one of the options bellow or tell me if you want to begin with your locations.";
    }
}


class StartState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    processInput(input){
        this.machine.state = new LocationState(this.machine);
        return "Ok, please tell me your first location.";
    }
}

 
class LocationState{
    machine;
    currentLocation = 0;

    constructor(machine){
        this.machine = machine;
    }

    async processInput(input){
        let location = await LocationFetcher.getLocation(input);
        console.log(location);

        let newState = new ConfirmingState(this.machine, location);
        this.machine.state = newState;

        return newState.statePrompt();
    }


}



class ConfirmingState{
    machine;
    location;
    locationIndex = 0;

    constructor(machine, location){
        this.machine = machine;
        this.location = location;
    }

    async processInput(input){

        if(input === "yes"){
            //this.machine.state = new ForecastState(this.machine, this.location[this.locationIndex]);
            let newState = new dateState(this.machine, this.location[this.locationIndex]);
            this.machine.state = newState;

            return newState.statePrompt();
        }
        else {
            this.locationIndex++;
            let locationName = this.location[this.locationIndex].name;
            return "Hmm, so do you  want to go to " + locationName + "?";
        }

    }

    statePrompt(){
        return "Oh so do you wanna go to " + this.location[0].name + "?";
    }


}


class dateState{
    machine;
    today = new Date();
    daysOfTheTrip = 3;
    destination;
    selection = ["1","2","3"];

    constructor(machine, destination){
        this.machine = machine;
        this.destination = destination;
    }
    
    async processInput(input){
        let options = InputParser.getAllNumbers(input);

        console.log(options);

        if(options === null) return "Please select one of the valid options";

        for (let i = 0; i < options.length; i++) {
            
            if(!this.selection.includes(options[i])) return "Please select one of the valid options";
        }

        let newState = new ForecastState(this.machine, this.destination, options)
        this.machine.state = newState;

        return newState.statePrompt();
    }

    statePrompt(){
        let dates = this.getPossibleDates();
        let dayOne = dates[0];
        let dayTwo = dates[1];
        let dayThree = dates[2];

        let prompt = `Choose the day(s) you will stay at this location: <br>1 - ${dayOne} <br>2 - ${dayTwo} <br>3 - ${dayThree}`;

        return prompt;
    }

    getPossibleDates(){
        let today = this.today;
        let nextDates = [];

        for (let i = 0; i < this.daysOfTheTrip; i++) {

            let nextDay = new Date();

            nextDay.setDate(today.getDate() + 1 + i);

            let dateSt = DateParser.toDayMonth(nextDay);
            nextDates.push(dateSt);
        }

        return nextDates;
    }

}


class ForecastState{
    machine;
    destination;
    selectedDates;
    

    constructor(machine, destination, selectedDates){
        this.machine = machine;
        this.destination = destination;
        this.selectedDates = selectedDates;
    }

    async processInput(){
        let weatherData = await WeatherFetcher.getWeatherData(this.destination);
        console.log(weatherData);
        let parsedData = ForecastParser.parseForecast(weatherData, this.selectedDates);

        let destination = {
            name: this.destination.name,
            forecast: parsedData
        }

        console.log(destination);

        if(this.machine.selectedDestination.length > 4){
            console.log(this.machine.selectedDestination);
            this.machine.state = new RecomendationState(this.machine);
            return "Ok thats all of them, are you satisfied with all the destinations that you choosed?"
        }

    
    }

    statePrompt(){
        this.processInput();

        this.machine.state = new LocationState(this.machine);
        return "Ok, I have added that destination to your list.<br>Please Select your next destination.";

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
class Chatbot{
    
    clothesRecomendations = new ClothesRecomendations();

    //clothesSet = new Set();
    
    state;
    selectedDestination = [];   

    constructor(){
        this.state = new GreetingState(this); 
    }
    

    async getBotResponse(input){
        return this.state.execute(input);
    }
}


class GreetingState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    execute(input){
        this.machine.state = new StartState(this.machine);
        return "Hi, I'm the weather bot, please select one of the selectedOptions bellow or tell me if you want to begin with your locations.";
    }
}


class StartState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    execute(input){
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

    async execute(input){
        let location = await LocationFetcher.getLocation(input);
        console.log(location);

        let newState = new ConfirmingLocationState(this.machine, location);
        this.machine.state = newState;

        return newState.statePrompt();
    }


}



class ConfirmingLocationState{
    machine;
    location;
    locationIndex = 0;

    constructor(machine, location){
        this.machine = machine;
        this.location = location;
    }

    async execute(input){

        if(input === "yes"){
            let destination = new Destination(this.location[this.locationIndex]);

            let newState = new dateState(this.machine, destination);
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
    
    async execute(input){
        
        let selectedOptions = InputParser.getAllNumbers(input);

        if(selectedOptions === null) return "Please select one of the valid selectedOptions";

        for (let i = 0; i < selectedOptions.length; i++) {
            
            if(!this.selection.includes(selectedOptions[i])) return "Please select one of the valid selectedOptions";
        }


        let newState = new ForecastState(this.machine, this.destination, selectedOptions);
        this.machine.state = newState;

        return newState.execute();
    }


    statePrompt(){

        let possibleDates = this.getPossibleDates();

        let dayOne = possibleDates[0];
        let dayTwo = possibleDates[1];
        let dayThree = possibleDates[2];

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
    selectedOptions;
    

    constructor(machine, destination, selectedOptions){
        this.machine = machine;
        this.destination = destination;
        this.selectedOptions = selectedOptions;
    }

    async execute(){
        let weatherData = await WeatherFetcher.getWeatherData(this.destination);
        let parsedForecast = ForecastParser.parseForecast(weatherData, this.selectedOptions);

        this.destination.forecast = parsedForecast;

        
        this.machine.selectedDestination.push(this.destination);


        if(this.machine.selectedDestination.length > 1){  // CHANGE THIS TO 4 AFTER TESTING
            console.log(this.machine.selectedDestination);
            let newState =  new ConfirmDestinationState(this.machine);
            this.machine.state = newState;
            return newState.statePrompt();
        }
    

        this.machine.state = new LocationState(this.machine);
        return "Ok, I have added that destination to your list.<br>Please Select your next destination.";

    }


}


class ConfirmDestinationState{
    machine;
    destinations;

    constructor(machine){
        this.machine = machine;
        this.destinations = machine.selectedDestination;
    }


    execute(input){
        let newState;

        if(input === "yes"){
            newState = new RecomendationState(this.machine);
        }

        this.machine.state = newState;
        return newState.statePrompt();
    }

    statePrompt(){
        let response = "Ok thats all of them, are you satisfied with all the destinations that you choosed?<ul>";

        this.destinations.forEach(destination => {
            let datesString = destination.getDates().toString();
            response = response + `<li> ${destination.name} - (${datesString})</li>`;
            console.log(response);
        });
        response = response + "</ul>";

        return response;
    }

}


class RecomendationState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    execute(input){

        return "got all the way here :)";
        //return this.clothesMessage(this.machine.clothesRecomendations);

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

    statePrompt(){
        return this.execute();
    }
}
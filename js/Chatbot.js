import Parser from "./Parser.js";
import Forecast from "./Forecast.js";
import { ForecastFetcher, LocationFetcher } from "./Fetcher.js";
import Destination from "./Destination.js";
import Location from "./Location.js";
import ClothesRecomendations from "./ClothesRecomendations.js";

export default class Chatbot{
    
    clothesRecomendations = new ClothesRecomendations();

    
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
        let newState = new StartState(this.machine);
        this.machine.state = newState;
        return newState.prompt();
    }
}


class StartState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    execute(input){
        let newState = new LocationState(this.machine);
        this.machine.state = newState;
        return newState.prompt();
    }

    prompt(){
        return "Hi, I'm the weather bot, please select one of the selectedOptions bellow or tell me if you want to begin with your locations.";
    }
}

 
class LocationState{
    machine;
    currentLocation = 0;

    constructor(machine){
        this.machine = machine;
    }

    async execute(input){

        let locationData = await LocationFetcher.getLocation(input);
        let location = Location.getLocationsFromData(locationData);

        let newState = new ConfirmingLocationState(this.machine, location);
        this.machine.state = newState;

        return newState.prompt();
    }

    prompt(){
        return "Ok, please tell me a location you want to visit.";
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

    execute(input){

        if(input === "yes"){
            let destination = new Destination(this.location[0]);

            let newState = new ForecastState(this.machine, destination);
            this.machine.state = newState;

            return newState.prompt();
        }
        else {
            
            this.location.shift();
            let newState = new AlternativeLocationState(this.machine, this.location);
            this.machine.state = newState;

            return newState.prompt();

        }

    }

    prompt(){
        return "Oh so do you wanna go to " + this.location[0].name + "?";
    }


}


class AlternativeLocationState{
    machine;
    location;
    options;

    constructor(machine, location){
        this.machine = machine;
        this.location = location;
    }

    execute(input){
        if(this.options.length == 0) return this.goBack();

        

        input = Parser.getAllNumbersFromString(input);

        console.log(input);
        if(input === null) return "Please select a valid option";

        input =  parseInt(input[0]);

        let anyLocationsLeft = this.location.length > 0;
        if(input > this.options.length){
            input = input % this.options.length;

            if(input == 1 && anyLocationsLeft) return this.prompt();

            return this.goBack();
        }

        if(input <= this.options.length){

            let destination = new Destination(this.options[input-1]);

            let newState = new ForecastState(this.machine, destination);
            this.machine.state = newState;

            return newState.prompt();

        }


        return "Please select a valid option.";
    }

    prompt(){
        let options = [];

        let counter = 0;

        while(counter < 3 && this.location.length > 0){
            options.push(this.location.shift());
            counter++;
        }


        let message = "In that case, please select one of the options bellow: <ol>";

        options.forEach(option => {
            message += `<li> ${option.name}</li>`;
        });

        if(this.location.length > 0) message += "<li> More options</li>";
        message += "<li> Return to location selection</li>";

        this.options = options;

        return message;
    }

    goBack(){
        let newState = new LocationState(this.machine);
        this.machine.state = newState;
        return newState.prompt();
    }

}


class ForecastState{
    machine;
    destination;
    

    constructor(machine, destination){
        this.machine = machine;
        this.destination = destination;
    }

    async execute(){
        let weatherData = await ForecastFetcher.getForecastData(this.destination);
        let parsedForecast = Forecast.getForecastsFromData(weatherData);

        this.destination.forecast = parsedForecast;
    

        let newState = new DateState(this.machine, this.destination);
        this.machine.state = newState;
        return newState.prompt();

    }

    prompt(){
        return this.execute();
    }


}


class DateState{
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
        
        let selectedOptions = Parser.getAllNumbersFromString(input);

        if(selectedOptions === null) return "Please select one of the valid options.";

        for (let i = 0; i < selectedOptions.length; i++) {
            
            if(!this.selection.includes(selectedOptions[i])) return "Please select one of the valid options.";
        }

        this.destination.selectDates(selectedOptions);

        let newState = new DestinationState(this.machine, this.destination);
        this.machine = newState;

        return newState.prompt();
        
    }


    prompt(){

        let possibleDates = this.destination.getDates();

        let dayOne = possibleDates[0];
        let dayTwo = possibleDates[1];
        let dayThree = possibleDates[2];

        let message = `Choose the day(s) you will stay at this location: <br>1 - ${dayOne} <br>2 - ${dayTwo} <br>3 - ${dayThree}`;

        return message;
    }

    getPossibleDates(){
        let today = this.today;
        let nextDates = [];

        for (let i = 0; i < this.daysOfTheTrip; i++) {

            let nextDay = new Date();

            nextDay.setDate(today.getDate() + 1 + i);

            let dateSt = Parser.dateToDayMonth(nextDay);
            nextDates.push(dateSt);
        }

        return nextDates;
    }

}


class DestinationState{
    machine;
    destination;


    constructor(machine, destination){
        this.machine = machine;
        this.destination = destination;
    }


    execute(){
        console.log(this.destination);
        this.destination.updateClothesRecomendation();
        this.machine.selectedDestination.push(this.destination);

        if(this.machine.selectedDestination.length > 4){  // CHANGE THIS TO 4 AFTER TESTING
            let newState =  new ConfirmDestinationState(this.machine);
            this.machine.state = newState;
            return newState.prompt();
        }


        let newState = new LocationState(this.machine);
        this.machine.state = newState;

        return "Ok, I have added that destination to your list.<br>Please Select your next destination.";
    }

    prompt(){
        return this.execute();
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
        return newState.prompt();
    }

    prompt(){
        let response = "Ok thats all of them, are you satisfied with all the destinations that you choosed?<ul>";

        this.destinations.forEach(destination => {
            let datesString = destination.getDates().toString();
            response = response + `<li> ${destination.name} - (${datesString})</li>`;
        });
        response = response + "</ul>";

        return response;
    }

}


class RecomendationState{
    machine;
    destinations;

    constructor(machine){
        this.machine = machine;
        this.destinations = machine.selectedDestination;
    }

    execute(input){
        console.log("test from here");
        let recomendations = new ClothesRecomendations();

        console.log(this.destinations);

        for (let i = 0; i < this.destinations.length; i++) {
            recomendations.combineRecomendations(this.destinations[i].clothesRecomendation);
            console.log(recomendations);
        }

        console.log(recomendations);

        return recomendations.getMessage();
        //return this.clothesMessage(this.machine.clothesRecomendations);

    }   


    prompt(){
        return this.execute();
    }
}
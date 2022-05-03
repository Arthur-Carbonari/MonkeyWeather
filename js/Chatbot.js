import Parser from "./Parser.js";
import Forecast from "./Forecast.js";
import { ForecastFetcher, LocationFetcher } from "./Fetcher.js";
import Destination from "./Destination.js";
import Location from "./Location.js";
import ClothesRecomendations from "./ClothesRecomendations.js";
import Input from "./Input.js";

export default class Chatbot{
    
    state;
    selectedDestination = [];

    updateAside  = false;
    asideElements = [];

    constructor(){
        this.state = new GreetingState(this); 
    }
    

    async getBotResponse(input){
        return this.state.execute(input);
    }

    getAsideElements(){
        this.updateAside = false;
        return this.asideElements;
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
        return "Hi, I'm Weather the monkey, im here to help you choose clothes for your 3 day trip.<br>Please tell me when you are ready to begin.";
    }
}

 
class LocationState{
    machine;
    currentLocation = 0;

    constructor(machine){
        this.machine = machine;
    }

    async execute(input){

        let response = await LocationFetcher.getLocation(input);

        if(response === "Failure"){
            return "Sorry, there was an issue with finding the location you asked for, please try again";
        }

        let locationData = await response.json();

        if(locationData.length == 0){
            return "Sorry, I couldnt find the place you are talking about. Maybe try again or go for a different location?"
        }

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

        if(Input.isPositive(input)){
            let destination = new Destination(this.location[0]);

            let newState = new ForecastState(this.machine, destination);
            this.machine.state = newState;

            return newState.prompt();
        }
        else if(Input.isNegative(input)){
            
            this.location.shift();
            let newState = new AlternativeLocationState(this.machine, this.location);
            this.machine.state = newState;

            return newState.prompt();

        }
        else{

            return "Sorry, I didnt really undestand.<br>" + this.prompt();
        }

    }

    prompt(){
        return "Do you wanna go to " + this.location[0].name + "?";
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
        let response = await ForecastFetcher.getForecastData(this.destination);

        if(response === "Failure"){
            let newState = new LocationState(this.machine);
            this.machine.state = newState;

            return "Sorry, there was an issue with getting the details for the location you asked for, please select a different location or try again.";
        }

        let forecastJSON = await response.json();

        let parsedForecast = Forecast.getForecastsFromData(forecastJSON);

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
    
    execute(input){
        
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
        this.destination.updateClothesRecomendation();

        this.machine.selectedDestination.push(this.destination);
        this.machine.asideElements.push(this.destination.asHtmlElement());
        this.machine.updateAside     = true;

        let newState = new TransitionState(this.machine);
        this.machine.state = newState;
        return newState.prompt();
    }

    prompt(){
        return this.execute();
    }
}


class TransitionState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    execute(){
        if(this.machine.selectedDestination.length > 1){  // CHANGE THIS TO 4 AFTER TESTING
            let newState =  new ConfirmDestinationState(this.machine);
            this.machine.state = newState;
            return newState.prompt();
        }


        let newState = new LocationState(this.machine);
        this.machine.state = newState;

        return "Ok, I updated your itenerary.<br>Please Select your next destination.";
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

        if(Input.isPositive(input)){
            newState = new RecomendationState(this.machine);
        }

        else if(Input.isNegative(input)){
            newState = new DeletingState(this.machine);
        }

        else return "Sorry, I didnt really undestand.";

        this.machine.state = newState;
        return newState.prompt();
    }

    prompt(){
        let response = "Ok thats all of them, are you satisfied with all the destinations that you choosed?<ul>";

        this.destinations.forEach(destination => {
            response += destination;
        });
        response = response + "</ul>";

        return response;
    }

}


class DeletingState{
    machine;
    selection;

    constructor(machine){
        this.machine = machine;
    }

    execute(input){
        let selectedOption = Parser.getAllNumbersFromString(input);

        if(selectedOption === null) return "Invalid input, please select a valid option.";
        
        selectedOption = selectedOption[0];

        let returnOption = this.machine.selectedDestination.length+1;

        if(selectedOption == returnOption){
            let newState = new TransitionState(this.machine);
            this.machine.state = newState;
            return newState.prompt();
        }

        if(this.selection.includes(selectedOption)){

            let index = selectedOption - 1;
            
            this.machine.selectedDestination.splice(index, 1);

            this.machine.asideElements.splice(index, 1);
            this.machine.updateAside = true;

            return this.prompt();
        }

        return "Invalid input, please select a valid option.";

    }

    prompt(){

        this.selection = [];

        for (let i = 1; i <= this.machine.selectedDestination.length; i++) {
            this.selection.push(`${i}`);
        }

        let prompt = "Please select which one of the destinations you would like to remove from your itinerary:<ol>";

        this.machine.selectedDestination.forEach(destination => {
            prompt += destination;
        });

        prompt += "<li>Return</li>";

        prompt += "</ol>";

        return prompt;
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
        let recomendations = new ClothesRecomendations();


        for (let i = 0; i < this.destinations.length; i++) {
            recomendations.combineRecomendations(this.destinations[i].clothesRecomendation);
        }

        this.machine.state = new FinalState(this.machine);

        return recomendations.getMessage();
    }   


    prompt(){
        return this.execute();
    }
}


class FinalState{
    machine;

    constructor(machine){
        this.machine = machine;
    }

    execute(input){

        if(input == "reset"){
            this.machine.selectedDestination = [];
            this.machine.asideElements = [];
            this.machine.state = new LocationState(this.machine);
            this.machine.updateAside = true;
            return this.machine.state.prompt();
        }

        return "To reset the chat and start picking your locations again please say 'reset'";


    }

}
import {GreetingState, StartState, LocationState, ConfirmingLocationState, AlternativeLocationState, ForecastState, DateState, DestinationState, TransitionState, ConfirmDestinationState, DeletingState, RecomendationState, FinalState} from "./ChatbotState.js";


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
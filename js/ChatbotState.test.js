import Chatbot from "./Chatbot.js";
import ChatbotState from "./ChatbotState";
import Location from "./Location";
import {GreetingState, StartState, LocationState, ConfirmingLocationState, AlternativeLocationState, ForecastState, DateState, DestinationState, TransitionState, ConfirmDestinationState, DeletingState, RecomendationState, FinalState} from "./ChatbotState";

describe("ChatbotState",() => {
    let machine = "testing";
    let mockCBS = new ChatbotState(machine);

    test("Constructor test",() => {
        expect(mockCBS.machine).toBe("testing"); 
    })

    test("Execute test",() => {
        expect(mockCBS.execute("Something")).toBe("Each state need to overwrite this.");
    })

    test("Prompt test",() => {
        expect(mockCBS.prompt("Some other thing")).toBe("each state that uses this method should overwrite it");
    })

    test("PromptNextState test",() => {
        let mockChatBot = new Chatbot();
        let state = new GreetingState(new Chatbot());
        mockCBS = new ChatbotState(mockChatBot);
        mockCBS.execute("some input");
        
        expect(mockCBS.promptNextState(state)).toBe("each state that uses this method should overwrite it");
    })

    test("GreetingState.execute test",() => {
        let state = new GreetingState(new Chatbot());
        expect(state.execute()).toBe("Hi, I'm Weather the monkey, im here to help you choose clothes for your 3 day trip.<br>Please tell me when you are ready to begin.");
    })

    test("StartState.execute test",() => {
        let state = new StartState(new Chatbot());

        expect(state.execute()).toBe("Ok, please tell me a location you want to visit.");
    })

    test("LocationState.prompt test",() => {
        let state = new LocationState(new Chatbot());

        expect(state.prompt()).toBe("Ok, please tell me a location you want to visit.");
    })

    // test("ConfirmingLocationState.prompt test",() => {
    //     let mockLocation = new Location("Istanbul",41.015137,28.979530);
    //     let state = new ConfirmingLocationState(new Chatbot, mockLocation);
    //     console.log(mockLocation.name);
    //     console.log(state.location[0]);
    //     // expect(state.prompt()).toBe("Do you wanna go to Istanbul ?");
    // })

    
})
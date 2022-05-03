export default class Input{
    
    static positiveInput = ["yes", "yeh", "yeah", "y"];
    static negativeInput = ["no", "nah", "n", "not"];

    static isPositive(string){

        string = string.toLowerCase();

        return this.positiveInput.includes(string);
    }

    static isNegative(string){
        string = string.toLowerCase();

        return this.negativeInput.includes(string);
    }
}
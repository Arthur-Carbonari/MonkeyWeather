class InputParser{

    static getAllNumbers(string){

        let numbersArray = string.match(/\d/g);

        return numbersArray;
    }

}
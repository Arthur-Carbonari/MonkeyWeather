/**
 * This class consists of static methods used to parse data into different formats.
 */
export default class Parser{

    /**
     * This method extracts all individual digits contained in the input string, stores then into an array and then returns that array.
     * @param {string} string String from where the digits are going to be extracted from.
     * @returns {string[]} - String array containing all the numeric digits that where in the string.
     */
    static getAllNumbersFromString(string){

        let numbersArray = string.match(/\d/g);

        return numbersArray;
    }


    /**
     * This method creates a new Date object that correspond to the unix time stamp used as parameter.
     * @param {long} unixTimesStamp - Unix Time Stamp
     * @returns {Date} Date object that correspond to the unix time stamp used as parameter.
     */
    static unixToDate(unixTimesStamp){

        let date = new Date(unixTimesStamp * 1000);

        return Parser.dateToDayMonth(date);
        
    }
    
    /**
     * This methods returns the string representation of a Date object in the format DD/MM.
     * @param {Date} date - Date object that the method is creating the string representation from.
     * @returns {string} String representing the Date object in the format DD/MM.
     */
    static dateToDayMonth(date){
        let day = date.getDate();

        if(day < 10) day = "0" + day;

        let month = date.getMonth() + 1;

        if(month<10) month = "0" + month;

        return day + "/" + month;
    }

}
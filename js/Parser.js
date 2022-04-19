export default class Parser{

    static getAllNumbersFromString(string){

        let numbersArray = string.match(/\d/g);

        return numbersArray;
    }


    static unixToDate(unixTimesStamp){

        let date = new Date(unixTimesStamp * 1000);

        return Parser.dateToDayMonth(date);
        
    }
    
    
    static dateToDayMonth(date){
        let day = date.getDate();

        if(day < 10) day = "0" + day;

        let month = date.getMonth() + 1;

        if(month<10) month = "0" + month;

        return day + "/" + month;
    }

}
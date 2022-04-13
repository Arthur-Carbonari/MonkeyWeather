class Destination{

    name;
    forecast;
    lat;
    lon;
    clothesRecomendation

    constructor(location){
        console.log(location);
        this.name = location.name;
        this.lat = location.lat;
        this.lon = location.lon;
    }


    getDates(){
        let dates = [];

        this.forecast.forEach(forecast => {
            dates.push(forecast.date);
        });

        return dates;
    }

}
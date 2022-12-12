class Weather {
    constructor (weatherAppArgs) {
        this.city = weatherAppArgs.city,
        this.state = weatherAppArgs.state,
        this.temperature = weatherAppArgs.temperature,
        this.cloudCoverage = weatherAppArgs.cloudCoverage,
        this.humidity = weatherAppArgs.humidity,
        this.wind = weatherAppArgs.wind,
        this.sunrise = weatherAppArgs.sunrise,
        this.sunset = weatherAppArgs.sunset,
        this.id = weatherAppArgs.id
    }    

    temperatureInCelsius(tempInCelsius) {
        return tempInCelsius = Math.round(this.temperature - 273.15);
    }

    temperatureInFarenheit(tempInFarenheit) {
        return tempInFarenheit = Math.round((this.temperatureInCelsius() * 1.8) + 32);
    }

    timeInRegularTimeNotation(time) {
        const unixTimestamp = time * 1000;
        const date = new Date (unixTimestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const regularTime = minutes < 10 ? `${hours} : 0${minutes}EST` : `${hours} : ${minutes}EST`;
        return regularTime;
    }

}

export default Weather;
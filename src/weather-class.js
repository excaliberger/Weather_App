class Weather {
    constructor (weatherAppArgs) {
        this.city = weatherAppArgs.city,
        this.temperature = weatherAppArgs.temperature,
        this.chanceOfRain = weatherAppArgs.chanceOfRain
    }    
}

export default Weather;
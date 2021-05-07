const request = require(`request`)

const forecast = (latitude, longitude, callback) => {
    // const urlCityName = `http://api.openweathermap.org/data/2.5/weather?q=`+encodeURI(address)+`&units=metric&appid=65f83322f74d5aef0d9ba9a50cedb92f`
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=`+encodeURI(latitude)+`&lon=`+encodeURI(longitude)+`&appid=65f83322f74d5aef0d9ba9a50cedb92f&units=metric`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weather service`, undefined)
        } else if(body.message) {
            callback(`City not found`, undefined)
        } else {
            callback(undefined, "It is currently " + body.main.temp + " degrees out. There is " + body.main.humidity + "% humidity")
        }
    })
}

module.exports = forecast;
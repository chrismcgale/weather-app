const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0bd3c5006bae7094d3a4a8f8da6652e&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error){
          callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
          callback("Unable to find location", undefined)
        } else {
          callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees celsius and feels like ${body.current.feelslike}.`)
        }
      })
}

module.exports = forecast
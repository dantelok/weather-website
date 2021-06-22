const request = require('request')

const forecast = ((latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=122c42799432dd1fc6b4be78f85121b8&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined)
        } else if (body.error) {
            callback('Response content went wrong!', undefined)
        } else {
            country = body.location.country,
            city = body.location.name,
            weather_descriptions = body.current.weather_descriptions[0]
            temperature = body.current.temperature
            feelslike = body.current.feelslike
            humidity = body.current.humidity
        
            callback(undefined, weather_descriptions + '. It is currently ' + temperature + ' degrees out and feels like ' 
            + feelslike + ' degrees in the ' + city + ', ' + country + '. The humidity is ' + humidity + '%.')
        }
    })
})

module.exports = forecast
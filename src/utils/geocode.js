const request = require('request')

const geocode = ((address, callback) => {
    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGFudGVsb2siLCJhIjoiY2twdDRvaTVxMGx4cTJvcG1oNzk2b3hjayJ9.1can-UbGmQB2cO9_1Az7yg&limit=1"
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined)
        } else if (body.features.length === 0) {
            callback(body.error, undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name

            callback(undefined, {
                latitude, 
                longitude,
                location
            })
        }
    })
})

module.exports = geocode
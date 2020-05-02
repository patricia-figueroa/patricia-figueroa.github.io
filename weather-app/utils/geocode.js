const request = require('request')

geocode = (address, callback) => {
    const url_geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGF0cmljaWFmaWd1ZXJvYW1pbGxhbiIsImEiOiJjazlsNnhpZmEwYnptM2VtdTl6N2phM3h6In0.DB69EftrbSS93hE_zslctQ&limit=1&language=es'
    request({ url: url_geocoding, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports= geocode



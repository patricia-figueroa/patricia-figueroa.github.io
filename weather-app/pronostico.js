const request = require('request')
const translate = require('translate')

translate.engine = 'yandex'
translate.key = 'trnsl.1.1.20200428T230917Z.dfe5e6c602eeb475.2e25c0162a3a7e200d27d7dd6f3cb6197e16c086'


let weather_description

const pronostico = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=000f0a799e1814d30ba7c0e63f5e5581&query=' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect with WeatherStack server", undefined)

        } else if (response.body.error) {
            callback("Unable to find location", undefined)

        } else {
            weather_description = response.body.current.weather_descriptions[0]
            translate(weather_description, { from: 'en', to: 'es' }).then(text => {
                callback(undefined, {
                    weather_description: text,
                    temperature: response.body.current.temperature,
                    precipitation: response.body.current.precip,
                    temerature_feelslike: response.body.current.feelslike
                })

            })
        }

    })
}

module.exports = pronostico

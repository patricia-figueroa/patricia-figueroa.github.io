const request = require('request')
// Translate Service
const translate = require('translate')
translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20200428T230917Z.dfe5e6c602eeb475.2e25c0162a3a7e200d27d7dd6f3cb6197e16c086';
let description_weather

const weathercode = (latitude, longitude, callback) => {
    const url_weatherstack = 'http://api.weatherstack.com/current?access_key=000f0a799e1814d30ba7c0e63f5e5581&query=' + latitude + ',' + longitude
    request({ url: url_weatherstack, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!!', undefined)
        } else if (response.body.message) {
            callback('Unable to find location', undefined)
        } else {
            description_weather = response.body.current.weather_descriptions[0]
            //Promises with .then(). Options can also be an object
            translate(description_weather, { from: 'en', to: 'es' }).then(text => {
                console.log("El clima es " + text)
                callback(undefined, {
                    weather_description: text,
                    temperature: response.body.current.temperature,
                    temperature_feels_like: response.body.current.feelslike,
                    precipitation: response.body.current.precip
                })
            })
            
        }
    })
}

module.exports = weathercode
const request = require('request')
const translate = require('translate')
translate.engine = 'yandex'
translate.key = 'trnsl.1.1.20200428T230917Z.dfe5e6c602eeb475.2e25c0162a3a7e200d27d7dd6f3cb6197e16c086'
let weather_description

const url = 'http://api.weatherstack.com/current?access_key=000f0a799e1814d30ba7c0e63f5e5581&query=19.2433,-103.725'
const url_geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Colima.json?access_token=pk.eyJ1IjoicGF0cmljaWFmaWd1ZXJvYW1pbGxhbiIsImEiOiJjazlsNnhpZmEwYnptM2VtdTl6N2phM3h6In0.DB69EftrbSS93hE_zslctQ&limit=1&language=es'
let longitude
let latitude

request({ url: url_geocoding, json: true }, (error, response) => {
    if (error){
        console.log("Unable to connect with Mapbox server")
    }else if(response.body.message){
        console.log("Not found!")
    }else if(response.body.features.length==0){
        console.log("Unable to finde location, try another search!")
    }else{
        longitude = response.body.features[0].center[0]
        latitude = response.body.features[0].center[1]
        console.log("Longitude: " + longitude + " Latitud: " + latitude)
    }
    
})

request({ url: url, json: true }, (error, response) => {
    //console.log(response.body.current)
    if(error){
        console.log("Unable to connect with WeatherStack server")
    }else if(response.body.error){
        console.log("Unable to find location")

    }else{
        weather_description = response.body.current.weather_descriptions[0]
        translate(weather_description, { from: 'en', to: 'es' }).then(text => {
            console.log("El clima es " + text)
        })
        console.log("La temperatura es de " + response.body.current.temperature + " grados.")
        console.log("Sin embargo, se percibe de " + response.body.current.feelslike + " grados.")
        console.log("La probabilidad de lluvia es del " + response.body.current.precip + "%.")
    }
    
})



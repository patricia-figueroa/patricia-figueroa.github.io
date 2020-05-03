const request = require('request')
const geocodificacion = require("./geocodificacion")
const pronostico= require("./pronostico")


geocodificacion("Colima", (error,data)=>{
    if(error){
        return console.log(error)
    }
    pronostico(data.latitude, data.longitude, (error, data_pronostico) => {
        if (error) {
            return console.log("Error", error)
        }
        console.log("Data", data_pronostico)
    })

})




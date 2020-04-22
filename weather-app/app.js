const request = require('request')
const url = 'http://api.weatherstack.com/current?access_key=000f0a799e1814d30ba7c0e63f5e5581&query=19.2433,-103.725'

request({url:url}, (error,response)=>{
    //console.log(response)
    const data = JSON.parse(response.body)
    console.log(data.current)
})
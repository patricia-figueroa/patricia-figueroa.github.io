// function add(a,b,callback){
//     callback(a+b)
// }

// console.log('Antes')
// add(1,2, function(result){
//     console.log("Resultado: " + result)
// })
// console.log("Después")

function addAsync(a,b,callback){
    setTimeout(function(){
        callback(a+b)
    },2000)
}

console.log("Antes")
addAsync(1,2,function(result){
    console.log("Resultado:" + result)
})
console.log("Después")
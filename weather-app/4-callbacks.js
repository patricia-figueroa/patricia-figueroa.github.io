setTimeout(()=>{
    console.log("Two seconds are up!")
},2000)


const add = (number1,number2,callback)=>{
    setTimeout(()=>{
        const sum = number1 + number2
        callback(sum)
    },2000)
}

add(1,4,(sum)=>{
    console.log(sum)
})
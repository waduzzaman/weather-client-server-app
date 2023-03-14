const express=require("express");
const https=require('https');
const bodyParser=require("body-parser")

const app =express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html');
   
    
})

app.post('/', function(req,res){


  const query=req.body.cityName
const apiKey="6f1b6399be60ec65d196514e6f9b3874"
const unit='metric'
const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=' + apiKey+'&units='+unit;
https.get(url, function(response){
    // console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const realFeels=weatherData.main.feels_like
        const description=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imgURL='https://openweathermap.org/img/wn/' +icon +'@2x.png'

        // send the data to server
    
        res.write("<h1>The Temperature in " + query+" is " +temp+ " Celsius.</h1>")
        res.write("<h3>The real feal in " + query+" is " +realFeels+ " Celsius.</h13>")
        // res.write("<h3>The Real Feels in Toronto is " + realFeels " Celsius</h3>")
        res.write("<p>The weather condition " +description+ "</p>")
        res.write("<img src=" + imgURL+ ">")
       
        res.send()
    })

})
})







app.listen(3000, function(){
    console.log("server is running on prot 3000")
})
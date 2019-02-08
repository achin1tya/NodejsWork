const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const errorHandler = require('errorhandler')
const Cities = require('./modals').Cities
const Builders = require('./modals').Builders
const Users = require('./modals').Users
const Projects = require('./modals').Projects
const cityRoute = require('./cityRoute')
const builderRoute = require('./builderRoute')
const usersRoute = require('./usersRoute')
const projectsRoute = require('./projectsRoute')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const search=require('')

//Database URL
const url = "mongodb://localhost:27017/database"


//setting the promise version
mongoose.Promise = global.Promise


mongoose.connect(url, { useNewUrlParser: true })

//instantiation()
let app = express()

//middleware
app.use(logger('dev'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//Routes
app.param('/cities', (req, res, next) => {                         //Using middleware to get parameter
    Cities.findById(req.params.id, (error, result) => {
        if (error) return next(error)
        return next()
    })
})

// app.get('/getToken/login',(req,res,next)=>{
//     //mock user
//     const user={
//         username:"achin",
//         id:1,
//         email:'achin@qwerty.com',
//         url:req.url,
//         timeStamp:req.timeStamp
//     }

//     jwt.sign({user},"saltString",{algorithm: "HS256"},(error,token)=>{
//         if(error) return res.status(400).send("token not generated")
//         return res.json(token)
//     })
//     next()
// })

// function verifyAccount(req,res,next)
// {
//     const generatedUserHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof generatedUserHeader !== 'undefined') {
//       // Split at the space
//       const generatedUser = generatedUserHeader.split(' ');
//       // Get token from array
//       const userToken = generatedUser[1];
//       // Set the token
//       req.token = userToken;
//       // Next middleware
//       next();
//     } else {
//       // Forbidden
//       res.sendStatus(403);
//     }

// }

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next()
}

//app.use(verifyCustomMd5Signature)

// var getSignature = function (req, res, next) {
//     var concatenatedString = req.queesry.timestamp + "saltString" + req.url
//     req.signature = crypto.createHash('md5').update(concatenatedString).digest("hex")
//     console.log("At Middleware", req.signature)
//     next()
// }

var returnSignature = function (req, res, next) {
    var concatenatedString = req.query.timestamp + "saltString" + req.baseUrl
    var sign = crypto.createHash('md5').update(concatenatedString).digest("hex")
    console.log("looking at sign", sign)
    console.log("looking at timestamp", req.query.timestamp)
    console.log("looking at url", req.baseUrl)
    return sign
}

// app.use(getSignature)

function verifyCustomMd5Signature(req, res, next) {
    console.log(req.url)
    if (req.query.timestamp !== undefined && req.query.signature !== undefined) {
        if (Date.now() - req.query.timestamp > 3000000) {               //for 50 mins
            return res.status(401).send("Took too long to respond")
        }
        console.log("into verification if")
        if (req.query.signature == returnSignature(req, res, next)) {
            console.log('verifying signature')
            next()
        } else {
            return res.status(400).send("unauthorized access")
        }
    } else {
        return res.status(400).send('Send the requested parameters')
    }
}

// app.get('/login',getSignature,(req,res,next)=>{
//     console.log(req.signature)
//     if( req.signature == undefined)
//     {
//         return res.status(400).send("false Input")
//     }else{
//         return res.status(200).send("account created")
//     }
// })

app.get('/cities', cityRoute.show)

//City

// app.get('/cities/showToken',verifyAccount,(req,res,next)=>{
//     jwt.verify(req.token,'saltString',(err,authData)=>{
//         if(err)return res.status(401)
//         else return res.status(200).send(authData,"end of user token")
//     })
// })

// app.get("/cities", cityRoute.show)
//City get element by id/query nameque

app.get("/cities/:id", cityRoute.showByIdAndName)

//search a city name wise project

app.get("/cities/search", cityRoute.showByName)
//City post (add a new city To db)

app.post("/cities", cityRoute.insertCity)

//City put (update a city by id)
app.put("/cities/:id", cityRoute.update)

//Delete a city record
app.delete("/cities/:id", cityRoute.removeCity)


//Builders 
app.get("/builders", builderRoute.show)


app.get("/builders/:id", builderRoute.showByIdAndName)

//search namewise builder
app.get("/builders/search", builderRoute.showByName)
// post (add a new city To db)
app.post("/builders", builderRoute.insert)

//builder put (update a city by id)
app.put("/builders/:id", builderRoute.update)

//Delete a builder record
app.delete("/builders/:id", builderRoute.removeBuilder)

//Users
app.get("/users", usersRoute.show)




//search namewise users
app.get("users/search/", usersRoute.searchByName)

// post (add a new city To db)
app.post("/users", usersRoute.insert)

//builder put (update a city by id)
app.put("/users/:id", usersRoute.update)


//Delete a builder record
app.delete("/users/:id", usersRoute.removeUser)

//Projects

app.get("/projects", projectsRoute.show)

//search project name wise
app.get("/projects:id", projectsRoute.showByIdAndName)


//search namewise users
app.get("projects/search/", projectsRoute.showByName)

// post (add a new city To db)
app.post("/projects", projectsRoute.insert)

//builder put (update a city by id)
app.put("/projects/:id", projectsRoute.updateProject)

//Delete a builder record
app.delete("/projetcs/:id", projectsRoute.removeProject)


//Common search API  using populate 
// app.get("/searchall", (req, res, next) => {
//     if (req.query.cityName) cityNameToFind = cityName;
//     if (req.query.builderName) builderNameToFind = builderName;
//     if (req.query.projectName) projectNameToFind = projectName;

//     Cities.find({ name: cityNameToFind }).
//         populate(builders, projects).
//         exec(function (err, city) {
//             if (error) return next(error)
//             else {
//                 res.status.send(city)
//             }
//         })
// })

// Search all API using Aggregate and lookup
// app.get("/searchall",(req,res,next)=>{
//     var cityNameFlag=0,builderNameFlag=0,projectNameFlag=0;
//     if(req.query.cityName){ 
//         cityNameToFind=cityName
//     }
//     if(req.query.builderName) builderNameToFind=builderName 
//     if(req.query.projectName) projectNameToFind=projectName
// })

//Search all API using fuzzy search
app.get("/searchall",(req,res,next)=>{
    var cityNameFlag=0,builderNameFlag=0,projectNameFlag=0
    citiesArray=[]
    builderArray=[]
    usersArray=[]
    if(cityNameFlag==0 && builderNameFlag==0 && projectNameFlag==0) {
        Cities.find().limit(5).lean().exec(function(err,result){
            if(error){console.log("data not present in city")}
            citiesArray=result
        })
        Users.find().limit(5).lean().exec(function(err,result){
            if(error){console.log(error)}
            usersArray=result
        })
        Builders.find().limit(5).lean().exec(function(err,result){
            if(error){console.log(error)}
            builderArray=result
        })
    }
    else if(cityNameFlag==0 && builderNameFlag ==0 && projectNameFlag==1){
        search()
    }
})
//cities/?timestamp=1548841810327&&signature=81fda1a008d0c548e856255dbc0b6689


app.use(errorHandler())

app.listen(3000)

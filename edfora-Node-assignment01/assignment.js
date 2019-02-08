const mongodb = require('mongodb')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const express = require('express')

//Instantiation 
let app = express()
const url = "mongodb://localhost:27017/database"

app.use(bodyParser.json())

//Routes
mongodb.MongoClient.connect(url, (error, client) => {
    if (error) return process.exit(1)
    let database = client.db('database')


    //CITY
    //Get API
    app.get("/Cities", (req, res, next) => {
        database.collection("cities")
            .find({}, {},{ sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })


    //Get Api Specific City/id
    app.get("/Cities/:id", (req, res, next) => {
        database.collection("cities")
            .find({ _id: mongodb.ObjectID(req.params.id) },{},{sort: {name:-1}} )
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    app.get("/Cities", (req, res, next) => {
        var cityNameTOFind = req.query.name
        console.log(cityNameTOFind)
        database.collection("cities")
            .find({ name: cityNameTOFind },null ,{ sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    //Post api 
    app.post("/Cities", (req, res, next) => {
        var newCityData = req.body
        database.collection("cities").insert(newCityData, (error, cities) => {
            if (error) return next(error)
            res.send(cities)
        })
    })

    //Update a record using id
    app.put("/Cities/:id", (req, res, next) => {
        let updationContent = req.body
        database.collection("cities")
            .update({ _id: mongodb.ObjectID(req.params.id) }, { $set: updationContent }, (error, city) => {
                if (error) return next(error)
                res.send(city)
            })
    })

    //Delete a record using id
    app.delete("/Cities/:id", (req, res, next) => {
        let recordToDelete = req.params.id
        database.collection("cities")
            .deleteOne({ _id: mongodb.ObjectID(recordToDelete) }, (error, result) => {
                if (error) res.status(400).send()
                res.send(result)
            })
    })

    //User
    //Get API
    app.get("/User", (req, res, next) => {
        database.collection("users")
            .find({}, { sort: { _id: -1 } })
            .toArray((error, cities) => {              // TODO lean 
                if (error) return next(error)
                res.send(cities)
            })
    })

    //Get Api Specific user/id
    app.get("/User/:id", (req, res, next) => {
        database.collection("users")
            .find({ _id: mongodb.ObjectID(req.params.id) }, { sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    app.get("/User?:name", (req, res, next) => {
        var cityNameTOFind = req.body
        database.collection("users")
            .find({ cityName: cityNameTOFind }, { sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    //Post api 
    app.post("/User", (req, res, next) => {
        var newUserData = req.body
        database.collection("users").insert(newCityData, (error, cities) => {
            if (error) return next(error)
            res.send(cities)
        })
    })

    //Update a record using id
    app.put("/User/:id", (req, res, next) => {
        let updationContent = req.body
        database.collection("users")
            .update({ _id: mongodb.ObjectID(req.params.id) }, { $set: updationContent }, (error, city) => {
                if (error) return next(error)
                res.send(city)
            })
    })

    //Delete a record using id
    app.delete("/User/:id", (req, res, next) => {
        let recordToDelete = req.params.id
        database.collection("users")
            .deleteOne({ _id: mongodb.ObjectID(recordToDelete) }, (error, result) => {
                if (error) return next(error)
                res.send(result)
            })
    })

    //Builder

    //Get API
    app.get("/Builder", (req, res, next) => {
        database.collection("builders")
            .find({}, { sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    //Get Api Specific City/id
    app.get("/Builders/:id", (req, res, next) => {
        database.collection("builders")
            .find({ _id: mongodb.ObjectID(req.params.id) }, { sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    app.get("/Builders?:name", (req, res, next) => {
        var cityNameTOFind = req.body
        database.collection("builders")
            .find({ cityName: cityNameTOFind }, { sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    //Post api 
    app.post("/Builders", (req, res, next) => {
        var newCityData = req.body
        database.collection("builders").insert(newCityData, (error, cities) => {
            if (error) return next(error)
            res.send(cities)
        })


    })

    //Update a record using id
    app.put("/Builders/:id", (req, res, next) => {
        let updationContent = req.body
        database.collection("builders")
            .update({ _id: mongodb.ObjectID(req.params.id) }, { $set: updationContent }, (error, city) => {
                if (error) return next(error)
                res.send(city)
            })
    })

    //Delete a record using id
    app.delete("/Builders/:id", (req, res, next) => {
        let recordToDelete = req.params.id
        database.collection("builders")
            .deleteOne({ _id: mongodb.ObjectID(recordToDelete) }, (error, result) => {
                if (error) return next(error)
                res.send(result)
            })
    })

    //Projects
    //Get API
    app.get("/Projects", (req, res, next) => {
        database.collection("projects")
            .find({}, { sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    //Get Api Specific City/id
    app.get("/Projects/:id", (req, res, next) => {
        database.collection("projects")
            .find({ _id: mongodb.ObjectID(req.params.id) }, { sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    app.get("/Projects?:name", (req, res, next) => {
        const {
            cityNameTOFind
        } = req.body;
        database.collection("projects")
            .find({ projectName: cityNameTOFind },{}, { sort: { _id: -1 } })
            .toArray((error, cities) => {
                if (error) return next(error)
                res.send(cities)
            })
    })

    //Post api 
    app.post("/Projects", (req, res, next) => {
        var newProjectsData = req.body
        database.collection("projects").insert(newProjectsData, (error, cities) => {
            if (error) return next(error)
            res.send(cities)
        })


    })

    //Update a record using id
    app.put("/Projects/:id", (req, res, next) => {
        let updationContent = req.body
        database.collection("projects")
            .update({ _id: mongodb.ObjectID(req.params.id) }, { $set: updationContent }, (error, city) => {
                if (error) return next(error)
                res.send(city)
            })
    })

    //Delete a record using id
    app.delete("/Projects/:id", (req, res, next) => {
        let recordToDelete = req.params.id
        database.collection("projects")
            .deleteOne({ _id: mongodb.ObjectID(recordToDelete) }, (error, result) => {
                if (error) return next(error)
                res.send(result)
            })
    })
    // app.use(errorHandler())
    app.listen(3000)

})

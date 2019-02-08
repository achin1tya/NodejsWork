const Cities = require('./modals.js').Cities


var show = function (req, res) {
    
    Cities.find({}, null, { sort: { id: -1 } }).limit(5).lean().exec(function (error, result) {
    //Cities.find({}, null, { sort: {name: -1 } }, (error, result) => {
        if (error) return res.status(400).send("No Documnet Inside Db");
        return res.status(201).send(result)
    })
}

var showByIdAndName=function(req, res, next) {                    //To do check each query for id 
    if (req.query.name) {
        console.log("entering find by query", req.query)
        var nameOfCityToFind = req.query.name
        Cities.find({ name: nameOfCityToFind }, null, { sort: { id: -1 } }, (error, result) => {
            if (error) res.status(200).send(400)
            return res.status(201).send(result)
        })
    }
    else {
        console.log('Entering find by id')
        Cities.findById(req.params.id, (error, result) => {
            if (error) res.status(401).send(" the requested id not found")
            res.status(201).send(result)
        })
    }
}
var showByName = function (req, res, next) {
    if( req.query.name )
    var cityName = req.query.name
    console.log("Entering search by name",req.query.name)
    Cities.find({ name: cityName }, null, { sort: { id: -1 } }, (error, result) => {
        if (error) return res.status(400).send(" The sent city name is not found ")
        return res.status(201).send(result)
    })
}

var insertCity = function (req, res) {
    let newCity = new Cities(req.body)
    //newCity.id=Cities.length                    // customized id with every current element having length of cities as id 
    newCity.save((error, result) => {
        if (error) return res.status(400).send("Give city data in proper format")
        return res.status(201).send(result)
    })
}

var update = function (req, res, next) {
    Cities.findById(req.params.id, (error, city) => {
        if (error) return res.status(400).send("The city id is not present")
        if (req.body.name) city.name = req.body.name
        if (req.body.id) city.id = req.body.id
        city.save((error, result) => {
            res.send(result)
            return;
        })
        return;
    })
}

var removeCity = function (req, res, next) {
    Cities.findById(req.params.id, (error, city) => {
        if (error) res.status(400).send('Cannot find city by id')
        city.remove((error, result) => {
            if (error) return res.status(400).send("Cannot remove city")
            else {
                return res.status(204).send(result)
            }
        })
    })
}

module.exports = {
    show,
    showByName,
    showByIdAndName,
    insertCity,
    update,
    removeCity
}
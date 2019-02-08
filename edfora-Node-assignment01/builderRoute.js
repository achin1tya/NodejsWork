const Builders = require('./modals').Builders

var show = function (req, res, next) {
    Builders.find({}, null, { limit: 20, skip: 0 }).lean().exec(function (error, result) {
        if (error) res.status(400).send("No builder data")
        return res.status(200).send(result)
    })
}

var showByName = function (req, res, next) {
    if(req.query.name)
        var builderName = req.query.name;
        Builders.find({ name: builderName }, null, { sort: { id: -1 } }, (error, result) => {
            if (error) return res.status(400).send(next(error))
            return res.status(201).send(result)
    })
}

var showByIdAndName=function(req, res, next) {                    //To do check each query for id 
    if (req.query.name) {
        console.log("entering find by query", req.query)
        var nameOfBuilderToFind = req.query.name
        Builders.find({ name: nameOfBuilderToFind ,_id:req.params.id}, null, { sort: { id: -1 } }, (error, result) => {
            if (error) res.status(200).send(400)
            return res.status(201).send(result)
        })
    }
    else {
        console.log('Entering find by id')
        Builders.findById(req.params.id, (error, result) => {
            if (error) res.status(401).send(" the requested id not found")
            res.status(201).send(result)
        })
    }
}

var insert = function (req, res) {
    let newBuilder = new Builders(req.body)
    //newCity.id=Cities.length                    // customized id with every current element having length of cities as id 
    newBuilder.save((error, result) => {
        if (error) return res.status(400).send("Give city data in proper format")
        return res.status(201).send(result)
    })
}

var update = function (req, res, next) {
    Builders.findById(req.params.id, (error, builder) => {
        if (error) return res.status(400).send("The city id is not present")
        if (req.body.name) builder.name = req.body.name
        if (req.body.id) builder.id = req.body.id
        builder.save((error, result) => {
            res.send(result)
            return;
        })
        return;
    })
}

var removeBuilder = function (req, res, next) {
    Builders.findById(req.params.id, (error, builder) => {
        if (error) res.status(400).send('Cannot find city by id')
        builder.remove((error, result) => {
            if (error) return res.status(400).send("Cannot remove city")
            else {
                return res.status(204).send(result)
            }
        })
    })
    return;
}

module.exports = {
    show,
    showByName,
    showByIdAndName,
    insert,
    update,
    removeBuilder
}
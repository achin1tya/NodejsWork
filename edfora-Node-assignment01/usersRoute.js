const Users = require('./modals').Users

var show = function (req, res, next) {
    Users.find({}, null, { limit: 20, skip: 0 }).lean().exec(function (error, result) {
        if (error) res.status(400).send("No builder data")
        return res.status(200).send(result)
    })
}

var searchByName = function (req, res, next) {
    if(req.query.name)
    var userName = req.query.name;
    Users.find({ name: userName }, null, { sort: { id: -1 } }, (error, result) => {
        if (error) return res.status(400).send(next(error))
        return res.status(201).send(result)
    })
}

var insert = function (req, res) {
    let newUser = new Users(req.body)
    //newCity.id=Cities.length                    // customized id with every current element having length of cities as id 
    newUser.save((error, result) => {
        if (error) return res.status(400).send("Give city data in proper format")
        return res.status(201).send(result)
    })
}

var update = function (req, res, next) {
    Users.findById(req.params.id, (error, user) => {
        if (error) return res.status(400).send("The city id is not present")
        if (req.body.name) city.name = req.body.name
        if (req.body.id) city.id = req.body.id
        user.save((error, result) => {
            res.send(result)
            return;
        })
        return;
    })
}

var removeUser = function (req, res, next) {
    Users.findById(req.params.id, (error, user) => {
        if (error) res.status(400).send('Cannot find city by id')
        user.remove((error, result) => {
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
    searchByName,
    update,
    insert,
    removeUser
}
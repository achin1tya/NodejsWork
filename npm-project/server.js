const mongodb=require("mongodb")
const bodyParser=require("body-parser")
// const logger=require("mocha")
const errorHandler=require("errorhandler")
const express=require("express")

//instanstiation
let app = express()
const url="mongodb://localhost:27017/edx-course-db"

//app.use(logger('dev'))
app.use(bodyParser.json())

mongodb.MongoClient.connect(url, (error, client) => {
  if (error) return process.exit(1)
    let datab = client.db('edx-course-db')

    app.get('/accounts', (req, res,next) => {
        datab.collection('accounts')
        .find({}, {sort: {_id: -1}})
        .toArray((error, accounts) => {
            if (error) return next(error)
            res.send(accounts)
        })
    })

    app.get('/accounts/:id',(req,res,next)=>{
        datab.collection('accounts').
        find({_id:mongodb.ObjectID(req.params.id)})
        .toArray((error,account)=>{
            if(error) return next(error)
            res.send(account) 
        })
    })

    app.post('/accounts', (req, res,next) => {
        let newAccount = req.body
        datab.collection('accounts').insert(newAccount, (error, results) => {
        if (error) return next(error)
        res.send(results)
        })
    })

    app.put('/accounts/:id', (req, res,next) => {
    datab.collection('accounts')
        .update({_id: mongodb.ObjectID( req.params.id)}, {$set: req.body}, (error, results) => {
        if (error) return next(error)
        res.send(results)
    })  
    })

    app.delete('/accounts/:id', (req, res,next) => {
    datab.collection('accounts').remove({_id:mongodb.ObjectID( req.params.id)}, (error, results) => {
        if (error) return next(error)
        res.send(results)
    })
    })
    app.use(errorHandler())

    app.listen(3000)
})
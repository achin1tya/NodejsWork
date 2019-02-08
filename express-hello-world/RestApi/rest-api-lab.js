
// //require
// const express=require('express')
// const logger=require('morgan')
// const errorHandler=require('error-handler')
// const bodyParser=require('body-parser')

// //store
// let store={}
// store.accounts=[]

// //instantiation
// let app=express()
// app.use(bodyParser.json())
// app.use(logger('dev'))
// app.use(errorHandler())


// //routing
// app.get("/accounts",(req,res)=>{
//     res.status(200).send(store.accounts)
// })

// app.post("/accounts",(req,res)=>{
//     let newAccount=req.body
//     let id=store.accounts.length
//     store.accounts.push(newAccount)
//     res.status(201).send({id:id})
// })

// app.put("/accounts/:id",(req,res)=>{
//     store.accounts[req.param.id]=req.body;
//     res.status(201).send(store.accounts)
// })


// app.delete("/accounts/:id",(req,res)=>{
//     store.accounts.splice(req.params.id,1)
//     res.status(204).send()
// })

// app.listen(3000)

const express = require('express') 
const logger = require('morgan')
//const errorhandler = require('errorhandler')
let app = express()

let store = {}
store.accounts = []
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(logger('dev'))
//app.use(errorhandler())

app.get('/accounts', (req, res) => {
  res.status(200).send(store.accounts)
})

app.post('/accounts', (req, res) => {
  let newAccount = req.body
  let id = store.accounts.length
  store.accounts.push(newAccount)
  res.status(201).send({id: id})
})

app.put('/accounts/:id', (req, res) => {
  store.accounts[req.params.id] = req.body
  res.status(200).send(store.accounts[req.params.id])
})

app.delete('/accounts/:id', (req, res) => {
  store.accounts.splice(req.params.id, 1)
  res.status(204).send()
})

app.listen(3000)

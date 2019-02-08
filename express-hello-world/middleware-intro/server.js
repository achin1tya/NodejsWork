
//require
const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')
//instantiation
const app=express();

//database connect
URI=""


//middleware 


app.use(bodyParser.json())
app.use(morgan)

const middleware= (req,res,next)=>{
    console.log("hello i am a helper middleware");
    next();
}


app.use(middleware);
app.use((req,res,next)=>{
    console.log(`${req.method} : ${req.url}`);
    next();
})

// //Database is available in request
// app.use((req, res, next) => {
//     req.database.collection('apps').findOne({appId: req.query.appId}, (err, app) => {
//       // error handling
//       req.app = app
//       next()
//     })
//   })
  

//Database error middleware
// app.use(function (request, response, next) {  
//     DatabaseClient.connect(URI, (err, db) => {
//       // error handling
//       request.database = db    
//       next()
//     })
//   })

// Route 1
app.get('/',(req,res)=>{
    res.send("hello world");

})

//Route 2
app.post('/help',(req,res)=>{
    console.log(req.body); 
    res.send("hello have you come here for help");
})


app.put()
app.delete()
app.patch()

app.listen(3000)
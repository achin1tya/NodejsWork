const express=require('express')
const app=express()

const profile=[{
    username :"azat",
    email: "[reducted]",
    url: "htttp://azat.co"
}]

app.get('/profile',(req,res)=>{
    res.send(profile)
})

// app.get('/profile:id',(req,res)=>{
//     const userId=req.params.id
//     fetchUser(userId,(error,user)=>{
//         if(error) return res.status(500).send(error)
//         res.send(user)
//     })
// })

app.post('/profile',(req,res)=>{
    profile=req.body;
    res.sendStatus(201)
})

app.put('/profile:id',(req,res)=>{
    Object.assign(profile,req.body)
    req.send("204")
})

app.delete('/profile:id',(req,res)=>{
    profile={}
    res.sendStatus(204)
})

// app.get("/user:/id",(req,res)=>{

// })
app.listen(3000)
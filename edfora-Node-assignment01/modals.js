const mongoose=require('mongoose')

//Define Schema
    var Schema=mongoose.Schema;
    let citySchema=new Schema({
        name:String,
        id:Number,
        // builders:[{types: Schema.types.ObjectId , ref:"builders"}],
        // projects :[{types: Schema.types.ObjectId , ref:"projects"}],
    })
    let builderSchema=new Schema({
        name:String,
        id: Number

    })
    let userSchema=new Schema({
        name:String,
        id: Number
        
    })
    let projectSchema=new Schema({
        name:String,
        id:Number
    })

//Model from schema
    const Cities=mongoose.model("cities",citySchema)
    const Builders=mongoose.model("builders",builderSchema)
    const Users = mongoose.model("users",userSchema)
    const Projects=mongoose.model("projects",projectSchema)


module.exports={
    Cities,
    Builders,
    Users,
    Projects
}
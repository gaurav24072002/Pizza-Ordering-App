const mongoose = require('mongoose')

const pizzaschema = new mongoose.Schema({
    Name:{
        type:String
        
    },
    pizza:{
        type:String
        
    },
    location:{
        type:String
        
    }
    },{timestamps:true})

    const Pizza = mongoose.model("Pizza", pizzaschema)
    module.exports = Pizza
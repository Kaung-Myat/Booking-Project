const mongoose = require('mongoose')

const reqString = {
    type:String,
    require:true,
}

var schema = new mongoose.Schema({
    description_title:reqString,

    description:reqString,

    start_time:reqString,

    students:[
        {
    
                name:String,               
    
                mail:String,
    
                phNumber:Number,
    
                year:String,
                
            }
    ],

    limit:{
        type:Number,
        require:true
    },

    phNo:reqString
})

const Admindb = mongoose.model("adminDb",schema);

module.exports = Admindb;
const mongoose = require('mongoose');

const productShcema = new mongoose.Schema({
    name:{
        type : String,
        require:true
    },
    price:{
        type: Number,
        require:true,
        min:0
    },
    category : {
       type: String,
       require:true
    },
    userId:String,
    company:{
        type:String,
        require:true
    }, 
    description:{
        type:String,
        require:true,
        maxlength:500,
    }
})


module.exports = mongoose.model('products', productShcema);



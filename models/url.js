const mongoose=require('mongoose')
const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        unique:true,
    },
    redirctUrl:{
        type:String,
        require:true,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    visitHistory:[{timestamp:{
        type:Date,
        default:Date.now
    }}]
})

const URL=mongoose.model('url',urlSchema);
module.exports=URL;
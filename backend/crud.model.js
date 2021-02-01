const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 let Users  = new Schema({
     username:{
         type:String
     },
     name:{
         type:String
     },
     password:{
         type:String
     },
     address:{
         type:String
     },
     files:{
         type : String, 
         default : ""
     }
 });

 module.exports = mongoose.model('Users', Users)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    email:{
      type:String,
      required:true,
      trim:true,
      unique:true
    },
    password:{
      type:String,
      required:true,
    },
    city:{
      type:String,
      required:true,
      trim:true
    },
    typeOfUser:{
      type:String,
      required:true
    }

});


module.exports = mongoose.model("Data",DataSchema);

const mongoose = require("mongoose");
const express= require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const cors = require('cors');
const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = "mongodb://mnathl:mongodbuser15@ds155203.mlab.com:55203/users";

mongoose.connect(dbRoute,
  {useNewUrlParser:true}
);

//object for database connection
let db = mongoose.connection;


db.once("open",()=> console.log("connected to the database"));
db.on("error",console.error.bind(console,"ERROR!"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger("dev"));

//receive data
router.get("/getData",(req,res)=> {
  Data.find((err,data)=>{
    if(err){
      return res.json({success:false,error:err})
    }
    return res.json({success:true,data:data})
  });
});

//update method
router.post("/updateData",(req,res)=>{
  const{email,password,city,typeOfUser}=req.body;
  Data.findOneAndUpdate(id,update,err=>{
    if(err) return res.json({success:false,error:err});
    return res.json({success:true})

 });
});

//delete method
router.delete("/deleteData",(req,res)=>{
  const{id}=req.body;
  Data.findOneAndDelete(id,err=>{
    if(err) return res.send(err);
    return res.json({success:true});


  });

});

router.post("/putData",(req,res)=>{

  let data = new Data();
  const{email,password,city,typeOfUser} = req.body;

  data.email = email;
  data.password = password;
  data.city = city;
  data.typeOfUser = typeOfUser;

  data.save(err=>{
    if(err)return res.json({success:false,error:err});
    return res.json({success:true});

  });

});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});








app.use("/api",router);
app.listen(API_PORT,()=>console.log('LISTENING ON PORT ${API_PORT}'));

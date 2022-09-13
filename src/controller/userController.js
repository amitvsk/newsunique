const userModel=require('../models/userModel');
const Validator=require('../validator/valid');
const axios = require('axios').default;

const creteUser=async (req,res)=>{
    try{
        let data=req.body
       const {fname,lname,email,phone}=data
       let obj={};
       if (fname){
         if (!Validator.isValidString(fname)) return res.status(400).send({ status: false, message: "First name  must be alphabetic characters" });
         obj.fname=fname
        }
       if (lname) {
        if (!Validator.isValidString(lname)) return res.status(400).send({ status: false, message: "Invalid last name name : Should contain alphabetic characters only" });
        obj.lname=lname
        }
        if(email) {
       if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Invalid email address" });
       obj.email=email
        }
       if (phone){
       if (!Validator.isValidPhone(phone)) return res.status(400).send({ status: false, message: "Invalid phone number : must contain 10 digit and only number." });
        obj.phone=phone
      }
      let device= os.hostname();
        obj.device=device;
      let deviceIP=req.ip;

        obj.deviceIP=deviceIP;

        
      let user = await userModel.create(obj)
      return res.status(201).send({status:true,msg:user})


    }catch(err){
        return res.status(500).send({status:false,msg:err.message});
    }
}
const os=require('node:os');
var geolocation = require('geolocation');

const am = async (req,res)=>{
try{
   let option =await axios.get(`http://freegeoip.net/json/${req.ip}`);

  geolocation.getCurrentPosition(function (err, position) {
    if (err) throw err
    console.log(position)
  })
// console.log(option);
return res.send({msg:req.ip+', '+os.hostname()+', '+option})
}catch(err){
        return res.status(500).send({status:false,msg:err.message});
    }
}

module.exports={am}
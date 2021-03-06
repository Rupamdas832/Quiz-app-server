const express = require("express")
const router = express.Router()

const {User} = require("./user.model.js")

router.route("/")
  .post(async(req,res) => {
      const {email, password} = req.body;

    try{
        const findUser = await User.findOne({email: email})
        
        if(findUser){
          if(findUser.password == password){
            res.status(200).json({success: true, user: findUser})
          }
          else res.status(401).json({success: false, message: "Sorry! Password is wrong"})
        }else res.status(401).json({success: false, message: "Sorry! Email entered is not present in database"})
      }catch(error){
        res.status(401).json({success: false, message: "  Sorry! couldn't fetch user. Try again!"})
    }
  })
  

  module.exports = router
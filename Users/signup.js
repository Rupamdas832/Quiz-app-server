const express = require("express")
const router = express.Router()

const {User} = require("./user.model.js")

router.route("/")
  .post(async (req,res) => {
    const {name, email, password} = req.body;
    
    try{
          const newUser = new User({
            name: name, 
            email: email, 
            password: password,
            totalScore: 0,
            totalAccuracy: 0,
            quizCompleted: []
            })

        const findUser = await User.findOne({email: email})
        
        if(findUser){
            return res.status(401).json({success: false, message: "Email already present.Try with different email Id"})
          }else {
            const saveUser = await newUser.save()
            return res.status(201).json({success: true, user: saveUser})
          }
    }catch(error){
      res.status(500).json({success: false, message: "Sorry! couldn't signup. Retry...", error})
    }
  })
  

  module.exports = router
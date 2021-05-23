const express = require("express")
const router = express.Router()

const {User} = require("./user.model.js")

router.route("/")
  router.param("userId", async (req, res, next, userId) => {
    try{
      const findUser = await User.findById(userId)
      if(!findUser){
        return res.status(401).json({success: false, message: "User couldn't be found. Try again"})
      }
      req.user = findUser
      next();
    }catch(error){
      res.status(400).json({success: false, message: "Something went wrong"})
    }
  })

router.route("/:userId")
  .post(async(req,res) => {
    let {user} = req;
    const {score, accuracy, _id} = req.body

    try{
      user.totalScore = user.totalScore + score
      user.totalAccuracy = (user.totalAccuracy === 0 ? accuracy : (user.totalAccuracy + accuracy)/2) 
      user.quizCompleted.push({_id: _id, score: score})

      user = await user.save()
      res.status(201).json({success: true, user})
    }catch(error){
        res.status(400).json({success:false, message: "Couldn't be updated. Sorry!", error})
      }
  })

  module.exports = router
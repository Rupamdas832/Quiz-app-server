const express = require("express")
const router = express.Router()

const {Quiz} = require("./quiz.model.js")
const {User} = require("../Users/user.model.js")

router.route("/")
  router.param("quizId", async (req,res,next,quizId) => {
    try{
      const findQuiz = await Quiz.findById(quizId)
      if(!findQuiz){
        return res.status(400).json({success: false, message: "Couldn't find quiz! Please enter valid quizId"})
      }

      req.quiz = findQuiz;
      next();
    }catch(error){
      console.log(error)
      res.status(400).json({success: false, message: "Something went wrong"})
    }
  })
  router.param("userId", async (req,res,next,userId) => {
    try{
      const findUser = await User.findById(userId)
      if(!findUser){
        return res.status(400).json({success: false, message: "Couldn't find user! Please enter valid userId"})
      }

      req.user = findUser;
      next();
    }catch(error){
      console.log(error)
      res.status(400).json({success: false, message: "Something went wrong"})
    }
  })

router.route("/")
  .get(async (req,res) => {
    try{
      const quizzes = await Quiz.find({})
      res.status(200).json({success: true, quizzes})
    }catch(error){
      res.status(400).json({success: false, error})
    }
  })
  .post(async(req,res) => {
    const {title,img} = req.body;

    try{
      const quizzes = await Quiz.find({})
      
      const newQuiz = new Quiz({
        title: title,
        quizNo: 1,
        img: img,
        highestScore: 0,
        highScorerName: "",
        questions: []
      })

      const saveQuiz = await newQuiz.save()
      return res.status(201).json({success: true, user: saveQuiz})
    }catch(error){
      res.status(500).json({success: false, message: "Sorry! couldn't add quiz. Retry...", error})
    }
  })

  router.route("/:quizId")
    .post(async (req,res) => {
      const {question,points,negativePoints,value1,isCorrect1, value2,isCorrect2, value3, isCorrect3, value4, isCorrect4} = req.body;

      let {quiz} = req;
      try{
        let questionData = {}
        if(value4 === undefined){
            questionData = {
              question: question,
              points: points,
              negativePoints: negativePoints,
              options: [
                {
                  value: value1,
                  isCorrect: isCorrect1
                },
                {
                  value: value2,
                  isCorrect: isCorrect2
                },
                {
                  value: value3,
                  isCorrect: isCorrect3
                }
              ]
            }
        }else {
            questionData = {
            question: question,
            points: points,
            negativePoints: negativePoints,
            options: [
              {
                value: value1,
                isCorrect: isCorrect1
              },
              {
                value: value2,
                isCorrect: isCorrect2
              },
              {
                value: value3,
                isCorrect: isCorrect3
              },{
                value: value4,
                isCorrect: isCorrect4
              }
            ]
          }
        }
         
        quiz.questions.push(questionData)
        quiz = await quiz.save()
        res.status(201).json({success: true, quiz})
      }catch(error){
        res.status(400).json({success:false, message: "Couldn't be updated. Sorry!", error})
      }
    })
  
  router.route("/:quizId/:userId")
    .post(async (req,res) => {
      const {score} = req.body
      let {user, quiz} = req
      try{
        quiz.highestScore = score;
        quiz.highScorerName = user.name
        quiz = await quiz.save()
        res.status(201).json({success: true, quiz})
      }catch(error){
        res.status(400).json({success:false, message: "Couldn't be updated. Sorry!", error})
      }
    })

  

  module.exports = router;
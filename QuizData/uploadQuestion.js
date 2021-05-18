const express = require("express")
const router = express.Router()

const {Quiz} = require("./quiz.model.js")

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
      res.status(400).json({success: false, message: "Something went wrong"}
    }
  })

  router.route("/:quizId")
    .post(async (req,res) => {
      const {question,points,negativePoints,value1,isCorrect1, value2,isCorrect2, value3, isCorrect3} = req.body;

      let {quiz} = req;
      try{
        const questionData = {
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
            },
          ]
        } 
        quiz.questions.push(questionData)
        quiz = await quiz.save()
        res.status(201).json({success: true, quiz})
      }catch(error){
        res.status(400).json({success:false, message: "Couldn't be updated. Sorry!", error})
      }
    })

    module.exports = router
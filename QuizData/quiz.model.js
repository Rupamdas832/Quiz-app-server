const mongoose = require('mongoose')

const {Schema} = mongoose

const quizSchema = new Schema({
  quizNo: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  highestScore: {
    type: Number,
    required: true
  },
  highScorerName: {
    type: String
  },
  questions: [{
              question: {
                type: String,
              },
                points: {
                type: Number,
              },
                negativePoints: {
                type: Number,
              },
              options: [{value: String, isCorrect: Boolean}]
  }]
})

const Quiz = mongoose.model('Quiz',quizSchema)

module.exports = {Quiz}

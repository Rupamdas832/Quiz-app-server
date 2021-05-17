const mongoose = require('mongoose')

const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: [true, 'Email already present.']
    },
  password: {
    type: String,
    required: true
    },
  totalAccuracy: {
    type: Number,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  },
  quizCompleted: {
    type: [{quizId: Number, score: Number}]
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}
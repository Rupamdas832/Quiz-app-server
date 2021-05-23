const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const mySecret = process.env['Port']

const {initializeDBconnection} = require("./Database/DBconnect.js")
initializeDBconnection()

const loginUser = require("./Users/login.js")
app.use("/login", loginUser)


const signupUser = require("./Users/signup.js")
app.use("/signup", signupUser)

const updateUser = require("./Users/updateUser.js")
app.use("/user", updateUser)

const uploadQuiz = require("./QuizData/uploadQuiz.js")
app.use("/quiz", uploadQuiz)


app.listen(mySecret, () => {
  console.log("SERVER IS running")
})
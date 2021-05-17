const mongoose = require("mongoose")

const uri = `mongodb+srv://rupamdas832:9430112253@quiz-data-cluster.zmvyg.mongodb.net/quiz-inventory?retryWrites=true&w=majority`;

const initializeDBconnection = async () => {
  try{
    const response = await mongoose.connect(uri, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
    if(response){
      console.log("MONGOOSE Connected successfuly")
    }
  } catch(error){
    console.log("ERROR OCCURRED", error)
  }
}

module.exports = {initializeDBconnection}
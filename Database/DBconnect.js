const mongoose = require("mongoose")

const mySecret = process.env['MongoDBCredentials']

const uri = mySecret;

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
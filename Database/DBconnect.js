const mongoose = require("mongoose")

const uri = process.env['MongoDBCredentials'];

const initializeDBconnection = async () => {
  try{
    const response = await mongoose.connect(uri, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
    if(mongoose.connection.readyState === 1){
      console.log("MONGOOSE Connected successfuly")
    }
    
  } catch(error){
    console.log("ERROR OCCURRED", error)
  }
}

module.exports = {initializeDBconnection}
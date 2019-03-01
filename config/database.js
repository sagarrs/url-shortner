const mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/url-shortner",  {useNewUrlParser: true})
    .then(function(){
        console.log("connected to DB")
    })
    .catch(function(){
        console.log("oops something went wrong")
    })

module.exports = {
    mongoose
}
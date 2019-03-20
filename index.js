const express = require("express")
var useragent = require('express-useragent');
// mongoose imported using ES-6 concise prop
const { mongoose } = require("./config/database")
const {bookmarkRouter} = require("./app/controllers/bookmarksController")
const port = 3000
const app = express()

app.use(express.json())
app.use(useragent.express());
// app.get('/', function(req,res){
//     res.send("<h1>WELCOME TO CONTACT MANAGER</h1>")
// })

app.use('/', bookmarkRouter)

app.listen(port, function(){
    console.log(`listening on port ${port}`)
})


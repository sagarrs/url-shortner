const express = require("express")
var useragent = require('express-useragent');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
// mongoose imported using ES-6 concise prop
const { mongoose } = require("./config/database")
const {bookmarkRouter} = require("./app/controllers/bookmarksController")
const {userRouter} = require("./app/controllers/usersController")
const port = 3000
const app = express()

app.use(express.json())
app.use(useragent.express());
// app.get('/', function(req,res){
//     res.send("<h1>WELCOME TO CONTACT MANAGER</h1>")
// })

app.use(morgan('combined'))

app.use('/', bookmarkRouter)
app.use('/users', userRouter)

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke! ha ha')
  })

app.listen(port, function(){
    console.log(`listening on port ${port}`)
})


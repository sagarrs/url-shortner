const express = require("express")
// mongoose imported using ES-6 concise prop
const { mongoose } = require("./config/database")
const port = 3000
const app = express()

const {bookmarkRouter} = "./app/controllers/bookmarksController"

app.listen(port, function(){
    console.log(`listening on port ${port}`)
})


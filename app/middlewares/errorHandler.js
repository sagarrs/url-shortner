const express = require("express")
const app = express()
const {Bookmark} = require("../models/bookmark")

// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
//   })

app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).json({error: {msg: e.message, stack: e.stack}});
    }
});
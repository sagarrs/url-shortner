const express = require("express")
const router = express.Router()
const {Bookmark} = require("../models/bookmark")

router.get("/bookmarks", function(req, res){
    console.log("hello world")
    res.send("hello world")
})

router.post("/bookmarks", function(req, res){
    const body = req.body
    const bookmark = new Bookmark(body)
    
    bookmark.save()
        .then(function(bookmark){
            console.log("hashed url saved")
            res.send(bookmark)
        })
        .catch(function(err){
            console.log("error")
            res.send(err)
        })
})

module.exports = {
    bookmarkRouter : router
}
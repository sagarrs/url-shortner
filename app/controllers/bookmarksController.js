const express = require("express")
const router = express.Router()
const {Bookmark} = require("../models/bookmark")

// TO GET THE DATA
router.get("/bookmarks", function(req, res){
    Bookmark.find()
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

// TO POST THE DATA AND STORE HASHED URL
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

// TO GET ONE BOOKMARK
router.get("/bookmarks/:id", function(req, res){
    const id = req.params.id

    Bookmark.findById(id)
        .then(function(bookmark){
            if(bookmark){
                res.send(bookmark)  
            }else{
                res.send({})
            }
            
        })
        .catch(function(err){
            // gives CastError : Cast to ObjectId failed for value
            res.send(err)
        })
})

// TO UPDATE BOOKMARK BASED ON ID
router.put("/bookmarks/:id", function(req, res){
    const id = req.params.id
    const body = req.body

    Bookmark.findByIdAndUpdate(id, {$set : body}, { new: true, runValidators: true})
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            console.log(err)
        })
})

// TO DELETE A BOOKMARK     
router.delete("/bookmarks/:id", function(req, res){
    const id = req.params.id

    Bookmark.findByIdAndDelete(id)
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

// O-T-H-E-R A-P-I E-N-D P-O-I-N-T-S 


module.exports = {
    bookmarkRouter : router
}
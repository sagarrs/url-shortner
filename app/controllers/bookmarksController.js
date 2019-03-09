const express = require("express")
const router = express.Router()
const url = require('url');
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

// last url in the first version
router.get("/bookmarks/tagger", function(req, res){
    const tagger = req.query.names.split(",")

    // Bookmark.find({ tags: tagger[0]})
    //     .then(function(bookmark){
    //         console.log("fetch bookmark by tag")
    //         res.send(bookmark.originalUrl)
    //     })
    //     .catch(function(err){
    //         console.log("error")
    //         res.send(err)
    //     })

    Bookmark.find({tags: {"$in": [tagger[0], tagger[1]]}}, function (err, docs) {
        console.log("hurrah")
        res.send(docs)
    });

})

// TO POST THE DATA AND STORE HASHED URL
router.post("/bookmarks", function(req, res){
    const body = req.body
    const bookmark = new Bookmark(body)
    console.log(bookmark)

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

// This return the url by matching the hash
router.get("/:hash", function(req, res){
    const hash = req.params.hash
    console.log("getter")
    // a static methood is defined in the model
    Bookmark.findByHash(hash)
        .then(function(bookmark){
            res.send(bookmark.originalUrl)
        })
        .catch(function(err){
            console.log(err)
            res.send(err)
        })
})

// Find n return all the bookmarks that meets the specific tag
router.get("/bookmarks/tags/:name", function(req, res){
    const name = req.params.name
    console.log("setter")
    Bookmark.findByTag(name)
        .then(function(bookmark){
            res.send(bookmark.originalUrl)
        })
        .catch(function(err){
            res.send(err)
        })
})

// Find and return all the bookmarks that meets the provided tags
// /bookmarks/tags?names=tag1,tag2
// router.get("/bookmarks/tags?names=tag1,tag2", function(req, res){
//     const tags = req.query.names
//     console.log("------")
//     console.log(tags)
// })

module.exports = {
    bookmarkRouter : router
}
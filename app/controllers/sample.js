const express = require('express')
const router = express.Router()
const {Bookmark} = require('../model/bookmarks')
router.get('/',function(req,res){
    res.send("Welcome to Bookmark and shortened URL")
})
router.get('/bookmarks',function(req,res){
    Bookmark.find()
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})
router.post('/bookmarks',function(req,res){
    const body = req.body
    const bookmark = new Bookmark(body)
    bookmark.save()
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})
router.get('/bookmarks/tags',function(req,res){
    const tag = req.query.names
    const arr =tag.split(',')
    console.log(arr)
    Bookmark.find({tags: {"$in":[arr[0], arr[1]]}})
        .then(function(bookmark){
            if(bookmark.length!=0){
                res.send(bookmark)
            }else{
                err
            }
        })
        .catch(function(err){
            res.send(`<h2>Can't find bookmark with TAG :${tag},</br>  As the tag value provide doesn't exist.</h2>`)
        })
})
router.get('/:hash',function(req,res,next){
    const hash = req.params.hash
    const agent = req.useragent
    const ip =req.ip
    let devise
        if(agent.isMobile){
            devise= "mobile"
        }else {
            devise= "desktop"
        }
    const update={
        browser: agent.browser,
        os: agent.os,
        deviseType: devise,
        ipAddress:ip
    }
    Bookmark.findOneAndUpdate({'hashedUrl':hash},{$push:{clicks:update}},{new: true, runValidators:true} )
        .then(function(bookmark){
            if(bookmark.length!=0){
                res.send(bookmark)
            }else{
                let error=new Error(`Can't find Hashed Url as hash value provided doesn't exist`)
              
                next(error)
            }
        })
        .catch(function(err){
            let error=new Error(`Can't find Hashed Url as hash value provided doesn't exist`)
            next(error)
            // res.send(`<h2>Can't find Hashed Url with hash value :${err.value} as the hash value provided doesn't exist</h2>`)
        })
})
router.get('/bookmarks/:id',function(req,res){
    const id = req.params.id
    Bookmark.findById(id)
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(`<h2>Can't find bookmark with ID :${err.value}</h2>`)
        })
})
router.put('/bookmarks/:id',function(req,res){
    const id = req.params.id
    const body = req.body
    Bookmark.findByIdAndUpdate(id,{$set: body},{new: true, runValidators:true})
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(`<h2>Can't update bookmark with ID :${err.value} as this ID provided doesn't exist.</h2>`)
        })
})
router.delete('/bookmarks/:id',function(req,res){
    const id =req.params.id
    Bookmark.findByIdAndDelete(id)
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(`<h2>Can't delete bookmark with ID :${err.value} as the ID provided doesn't exist</h2>`)
        })
})
router.get('/bookmarks/tags/:name',function(req,res){
    const tag = req.params.name
    Bookmark.find({tags:tag})
        .then(function(bookmark){
            if(bookmark.length!=0){
                res.send(bookmark)
            }else{
                err
            }
        })
        .catch(function(err){
            res.send(`<h2>Can't find bookmark with TAG :${tag},</br>  As the tag value provide doesn't exist.</h2>`)
        })
})
module.exports = {
    bookmarksRouter: router
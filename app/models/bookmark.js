const mongoose = require("mongoose")
const sh = require("shorthash");
const Schema = mongoose.Schema

const bookmarkSchema = new Schema({
    title: {
        type: String,
    },
    originalUrl: {
        type: String,
    },
    tags: {
        type: [String],
    },
    hashedUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

bookmarkSchema.pre("save", function(next){
    console.log("control is in pre save")
    const bookmark = this

    const hashed = sh.unique(bookmark.originalUrl)
    bookmark.hashedUrl = hashed
    next()
})

// static method to find by hash 
bookmarkSchema.statics.findByHash = function(hash){
    const bookmark = this

    return Bookmark.findOne({
        hashedUrl: hash
    })
}

// static method to find by hash 
bookmarkSchema.statics.findByTag = function(tag){
    const bookmark = this

    return Bookmark.findOne({ 
        tags: tag
    })
}

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = {
    Bookmark
}
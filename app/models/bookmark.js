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
    const bookmark = this

    const hashed = sh.unique(bookmark.originalUrl)
    bookmark.hashedUrl = hashed
    next()
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = {
    Bookmark
}
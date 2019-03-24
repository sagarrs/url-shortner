const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate : {
            validator:(value) => {
                return (validator.isEmail(value))
            },
            message: () => {
                return "invalid email format"
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 128
    }
})

userSchema.pre("save", function(next){
    // since this is a instance op the this refers to user obj in controller
    const user = this
    bcryptjs.genSalt(10)
        .then((salt) => {
            bcryptjs.hash(user.password, salt) 
                .then((encryptedPwd) => {
                    user.password = encryptedPwd
                    next()
                })
        })
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}
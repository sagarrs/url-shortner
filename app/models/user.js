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
    },
    tokens: [
        {        
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
})

userSchema.pre("save", function(next){
    // since this is a instance op the this refers to user obj in controller
    const user = this
    // if(user.isNew){
        bcryptjs.genSalt(10)
        .then((salt) => {
            bcryptjs.hash(user.password, salt) 
                .then((encryptedPwd) => {
                    user.password = encryptedPwd
                    next()
                })
        })
    // }
    // else{
    //     next()
    // }
})

// static method
// it should be email: email but have user ES-6 concise property
userSchema.statics.findByCredentials = function(email, password){
    // D.O.U.B.T why "user" is caps here n abv its not
    // here this refers to user model
    const User = this

    return User.findOne({email})
            .then((user) => {
                if(!user){
                    return Promise.reject("invalid email")
                }
                 // D.O.U.B.T why does order of password n user.password matter
                 // if interchanged it gives invalid password
                return bcryptjs.compare(password, user.password)
                        .then((result) => {
                            if(result){
                                return Promise.resolve(user)
                            }else{
                                return Promise.reject("invalid Password")
                            }
                        })
            })
            .catch((err) => {
                return Promise.reject(err)
            })
}


const User = mongoose.model("User", userSchema)

module.exports = {
    User
}
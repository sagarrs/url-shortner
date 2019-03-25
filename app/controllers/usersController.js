const express = require("express")
const router = express.Router()
const bcryptjs = require("bcryptjs")
const {User} = require("../models/user")

router.post("/register", function(req, res){
    const body = req.body
    const user = new User(body)

    user.save()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post("/login", function(req, res){
    const body = req.body

    // D.O.U.B.T why should we call on User object / model
    User.findByCredentials(body.email, body.password)
            .then(function(user){
                res.send(user)
            })
            .catch(function(err){
                res.send(err)
            })
})


module.exports = {
    userRouter: router
}
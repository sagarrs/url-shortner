const bcryptjs = require("bcryptjs")

const pwd = "secret123"

bcryptjs.genSalt(10)
    .then((salt) => {
        bcryptjs.hash(pwd, salt)
            .then((encryptedPwd) => {
                console.log(encryptedPwd)
            })
            .catch((err) => {
                console.log(err)
            })
    })

const bcryptjs = require("bcryptjs")

const encryptedPwd = "$2a$10$WSyapCSojZHt4mEPvSncdOgQL9nD0YWiNlJlTImH6uN4B4C1sbPkm"
const pwd = "user3@12"

bcryptjs.compare(pwd, encryptedPwd)
    .then(function(result){
        console.log(result)
    })
// const express = require("express")
// const Users = require("./usersModel")
// const bcrypt = require("bcryptjs")

// const router = express.Router()

// // router.post('/register', (req,res) => {
// //     const user = req.body
// //     console.log(user.username, user.password)

//     //when 
//     const hashPassword = bcrypt.hashSync(user.password, 10)
//     user.password = hashPassword
//     console.log(user.username, user.password)
    
// })


// router.get('/login', (req, res) =>
// {
//     Users.find()
//     .then(users =>
//     {
//         res.status(200).json(users);
//     })
//     .catch(error =>
//     {
//         res.status(500).json({error: 'Unable to connect to the database'});
//     })
// })


// // 
// module.exports = router
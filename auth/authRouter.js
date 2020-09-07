const express = require("express")
const bcrypt = require("bcryptjs")
const usersModel = require("../users/usersModel")
const router = express.Router()

router.post('/register', (req,res) => {
    const {username,password} = req.body

    if(!username || !password) {
        return res.status(400).json({
            message: "Incorrect values"
        })
    } else {//hashing password
        const hashPassword = bcrypt.hashSync(password, 8)
        usersModel.addUser({//adding hashed password to table
            username,hashPassword
        }) 
        .then(newUser =>{
            res.session.loggedIn = true;
            res.status(201).json(newUser);
        })
        .catch( err => {
            res.status(500).json({error: 'Unable to save user'})
        })
    }
})

router.post('/login', (req,res) => {
    const {username, password} = req.body;
   
    usersModel.findById({username}).first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password))
        {
            req.session.loggedIn = true;
            req.session.username = user.username;
            res.status(200).json({message: `Welcome ${user.username}`});
        }
        else
        {
            res.status(401).json({message: 'Access denied'});
        }
    })
    .catch(error =>
        {
            res.status(500).json({error: 'Unable to connect to the database'});
        })
})




module.exports = router
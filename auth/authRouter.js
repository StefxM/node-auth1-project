const express = require("express")
const bcrypt = require("bcryptjs")
const usersModel = require("../users/usersModel")
const usersMiddleware = require("../users/restrict")
const router = express.Router()

router.post('/register', (req,res) => {
    const user = req.body

    if(!user.username || !user.password) {
        return res.status(400).json({
            message: "Incorrect values"
        })
    } else {//hashing password
        const hashPassword = bcrypt.hashSync(user.password, 8);
        user.password = hashPassword
        usersModel.addUser(user)
        .then(newUser =>{
            
            res.status(201).json(newUser);
        })
        .catch( err => {
            res.status(500).json({error: 'Unable to save user'})
        })
    }
})

router.post('/login', (req,res) => {
    const {username, password} = req.body;
   // console.log("hello")
    usersModel.find({username})
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password))
        {
            // req.session.loggedIn = true;
            // req.session.username = user.username;
            console.log("hello")
            req.session.user = {id:user.id, username:user.username}
            res.status(200).json({message: `Welcome ${user.username}, heres you're ${user.id}`});
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

router.get('/users', usersMiddleware.restrict(), async (req,res, next) => {
   try {
       res.json(await usersModel.find())
   } catch (err){
       next(err)
   }
})


module.exports = router
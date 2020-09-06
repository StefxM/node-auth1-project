const express = require("express")
//const Users = require("./usersModel")


const router = express.Router()

/*router.get("/users", async (req, res, next) => {
	try {
		res.json(await Users.findUser())
	} catch(err) {
		next(err)
	}
})

router.post("/users", async (req, res, next) => {
	try {
		const { username, password } = req.body
	

		const newUser = await Users.add({
			username,
			password,
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})*/

module.exports = router
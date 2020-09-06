/*const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const usersRouter = require("./users/usersRouter")
const authRouter = require("./auth/authRouter")
const session = require("express-session")
const dotenv = require("dotenv")
const db = require("./config")
//connecting sessiong from express session
const knexStore = require("connect-session-knex")(session)

dotenv.config({path:"./config.env"})

const server = express()
const sessionConfig = {
    
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new knexStore({
        knex: db,
        createtable: true,
    })
    
}
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session(sessionConfig))
server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)





server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})*/

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const usersRouter = require("./users/usersRouter")
const db = require("./config")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
	resave: false, // avoid recreating sessions that have not changed
	saveUninitialized: false, // to comply with GDPR laws
	secret: "keep it secret, keep it safe", // cryptographically sign the cookie
	store: new KnexSessionStore({
		knex: db, // configured instance of knex
		createtable: true, // if the sessions table doesn't exist, create it automatically
	}),
}))

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
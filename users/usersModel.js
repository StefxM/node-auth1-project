const db = require('../config.js')

/*const add = (user) => {
	const [id] = db("users").insert(user)
	return db(id)
}

const findUser = id => {
	return db("users").select("id", "username").where({id}).first()
};
/*
function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}*/

const createNewUser = user => {
    return db('users').insert(user);
}

const findUser = () => {
    const user = db('users').select('*').where({id})
    return user
}
module.exports = {
	//add,
	findUser,
	createNewUser,
}
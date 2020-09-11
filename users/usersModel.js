const db = require("../config")

const find = () => {
    return db('users').select("id", "username", "password")
}

const findById = (id) => {
    return db('users')
        .where({id}).select("id", "username", "password")
        .first()
}

const addUser = async (user) => {
    const [id] = await db('users').insert(user)
    return findById(id)
}


module.exports = {
    find,
    findById,
    addUser,
}
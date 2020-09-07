const db = require("../config")

const find = () => {
    return db('users')
}

const findById = (id) => {
    return db('users')
        .where({id})
        .first()
}

const addUser = (user) => {
    return db('users')
        .insert(user, "id")
        .then(ids => {
            const [id] = ids
            return findById(id)
        });
}


module.exports = {
    find,
    findById,
    addUser,
}
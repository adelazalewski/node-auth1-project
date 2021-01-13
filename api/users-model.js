const db = require("../data/config")

function getUsers() {
    return db("users")
}
async function addUser(user) {
    const [id] = await db("users").insert(user)
    return findByID(id)
}
function findByID(id) {
    return db("users").select("id", "username").where("id", id).first()
}
function find() {
    return db("users").select("id", "username")
}
function findBy(filter) {
    return db("users").select("id", "username", "password").where(filter)
}

module.exports = {
addUser,
getUsers,
findByID,
findBy,
find
}
const express = require("express")
const server = express()
const bcrypt = require("bcryptjs")
const db = require("../data/config")
const session = require("express-session")
const knexSessionConnect = require("connect-session-knex")(session)
const usersRouter = require("./users-router")
const welcomeRouter = require("./welcome-router")

server.use(express.json())
server.use(session({
    resave: false, //avoid creating sessions that have not changed
    saveUninitialized: false, //GDPR lawas against setting cookies automatically
    secret: "adela's apiS are awesome", //cryptographically sign the cookies
    store: new knexSessionConnect({
        knex: db, //configure instance of knex
        createtable: true, //create a sessions tbl in the db if it doesn not exist
    })
}))

server.use(usersRouter)
server.use(welcomeRouter)


module.exports = server

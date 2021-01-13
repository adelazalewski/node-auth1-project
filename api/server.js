const express = require("express")
const server = express()
const bcrypt = require("bcryptjs")
const db = require("../data/config")
const session = require("express-session")
const knexSessionConnect = require("connect-session-knex")(session)
const usersRouter = require("./users-router")
const welcomeRouter = require("./welcome-router")

server.use(express.json())

server.use(welcomeRouter)
server.use(usersRouter)

module.exports = server

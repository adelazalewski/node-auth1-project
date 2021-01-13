const express = require("express")
const server = require("./api/server")
const port = process.env.PORT || 5000

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})
server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})
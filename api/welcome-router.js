const express = require("express")
const router = express.Router()

router.use("/", (req, res, next) => {
    res.json({
        message: "adela's authentication and authorization practice api. all welcome! :)"
    })
})

module.exports = router
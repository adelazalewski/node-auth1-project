const express = require("express")
const users = require("./users-model")
const bcrypt = require("bcryptjs")
const {restrict} = require("./users-middlware")
const router = express.Router()

router.get("/users",restrict(), async (req,res,next) => {
try{
const usersList = await users.find()
res.json(usersList)
}catch(err){
    next(err)
}
})
router.post("/register", async(req, res, next) => {
    try{
        const {username, password} = req.body
        //check to see if user exists
        const user = await users.findBy({username}).first()
        if(user) {
            return res.status(409).json({
                message: "username is already taken"
            })
        }

        const newUser = await users.addUser({
            username,
            //gonna hash the password before saving to the db with a time complexity of 13
            password: await bcrypt.hash(password, 13) 
        })
        res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
})
router.post("/login", async (req, res, next) => {
    try{
const {username, password} = req.body

 //check to see if user exists
 const user = await users.findBy({username}).first()

 //check the password to be correct
 //we dont have to know the original ppassword to check the user we juts rehash it and compare the hushes
 const passwordValidation = await bcrypt.compare(password, user.password)
//if the user doesnt exists or the password doesnt match
 if(!user || !passwordValidation) {
     return res.status(401).json({
         message: "invalid credentials"
     })
 }

 //generate a new session and send it back to the client
 req.session.user = user

 res.json({
    message: `Welcome ${user.username}!`,
})

    }catch(err){
        next(err)
    }
})
router.get("/logout", async(req, res, next) => {
	//deletes the session so the session id is invalid 
	try{
req.session.destroy((err) => {
	if(err) {
		next(err)
	}else{
		res.status(204).end()
	}
})
	}catch(err){
		next(err)
	}
})


module.exports = router
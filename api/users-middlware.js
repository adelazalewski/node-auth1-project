const users = require("./users-model")
const bcrypt = require("bcryptjs")

function restrict() {
    return async (req, res, next) => {
        const authError = {
			message: "invalide credentials"
        }
        
        try{
            //if no session is in place check that the values from req.headers arent empty
            //then check that user is in the db findBy({username}).first()
            //then check that passwords match
            
//no more having a lot of validation to make we just have to verify the sessions exsits
if(!req.session || !req.session.user){
    return res.status(401).json(authError)
}
//we're authorized by this point so call:
next()
        }catch(err) {next(err)}
    }
}

module.exports = {
    restrict
}
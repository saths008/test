const express = require("express")
const router = express.Router()
//Router is like another app that lives inside the main app
router.use(logger) //This calls the middleware logger on every request.
/**
 * Routes are pattern matched from top to bottom
 */

router.get("/dashboard", (req, res) => {
    res.send("Welcome To Your Dashboard!")
})

router.get("/profile", (req,res) => {
    res.send("This is your profile!")
})
/**
 * This is a dynamic url which is specific to a user's id
 * id is the name of the parameter
 * 
 * Your dynamic routes must always come after static routes,
 * userId is a variable for ANYTHING after / in the requested
 *URL. 
 */
// router.get('/users/:userId', (req,res) => {
//     res.send(`Hi User: ${req.params.userId}`)
// })

// router.put('/users/:userId', (req,res) => {
//     res.send(`Update User: ${req.params.userId}`)
// })

// router.delete('/users/:userId', (req,res) => {
//     res.send(`Delete User: ${req.params.userId}`)
// })

/***
 * As this is a very common pattern, refactoring of lines 24 to 34 can look like:
 */

router.route("/users/:userId")
.get(signedUp,(req,res) => { //signedUp middleware taken in 
    res.send(`Hi User: ${req.params.userId}`)})
.put( (req,res) => {
    res.send(`Update User: ${req.params.userId}`)
})
.delete( (req,res) => {
    res.send(`Delete User: ${req.params.userId}`)
})


//Will run anytime anytime it find a parameter of the name provided
router.param("userId", (req,res,next,id) => {
    console.log(id)
    next()//If called, then run the next thing inline
})

/**
 * middleware
 */
function logger(request, response, next){
    console.log(request.originalUrl)
    next()
}

function signedUp(request, response, next){
    console.log("User Signed Up!")
    next()
}
module.exports = router
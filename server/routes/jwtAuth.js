const express = require("express")
const router = express.Router()
const pool = require("../db")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
router.post("/register",validInfo, async(req,res) => {
    try{
        //1. break down req.body into fields
        const{name, email, password} = req.body;
        //2. check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]); //$1 is a variable, which has the value email which is the 2nd part

        const userExists = user.rows.length !== 0 ; 
        if(userExists){
            return res.status(401).send("User Already Exists!")
        }
        //3. Bcrypt password
        const bcrypt = require("bcrypt")
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword =await bcrypt.hash(password,salt);
        console.log(`bcryptPassword: ${bcryptPassword}`)
        //4. Enter user into database
        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",[name,email,bcryptPassword]);
        
        // res.json(newUser.rows)
        //5. Generate jwt token 

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
})


//login route

router.post("/login",validInfo, async(req,res) => {
try{
//1. destructure the body
const{email, password} = req.body;
console.log(`Email: ${email} Password: ${password}`);
//2. check if user exists, if the user does not then throw error
const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]); //$1 is a variable, which has the value email which is the 2nd part

const userExists = user.rows.length !== 0 ; 
if(!userExists){
    return res.status(401).send("Email not associated with an account!");
}

//3. check if incoming password == database password
const bcrypt = require("bcrypt")
const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

if(!validPassword){
    return res.status(401).json("Email or Password is incorrect!");
}

//4. give them jwt token
const token = jwtGenerator(user.rows[0].user_id);
res.json({token});

}
catch(err){
    console.error(err.message);
    res.status(500).send("Server Error!");
}

}
)

module.exports = router;
//which bits of code to export from a given file
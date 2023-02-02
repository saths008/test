/**
 * Connects server to database using the 
 * pg library
 */

const Pool = require("pg").Pool //configure connection

//How and where to connect database
const pool = new Pool({
    host:"localhost",
    user:"postgres",
    password:"Saathveekan23",
    port:5432,
    database:"jwttutorial" 
}
);

module.exports = pool;
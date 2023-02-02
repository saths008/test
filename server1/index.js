/**
 * Entry point of our API, this is where 
 * the api will be started. API setup and 
 * database setup should be done here.
 */
//import { createClient } from '@supabase/supabase-js'
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());//Every time a request is called to the server, this is called
const myDatabase = require("@supabase/supabase-js");
const supabase = myDatabase.createClient('https://lnittdgflsxwbofnrpul.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuaXR0ZGdmbHN4d2JvZm5ycHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwOTQ5NzMsImV4cCI6MTk5MDY3MDk3M30.3XFoAVUDDzaoDq7AqkZ3D1lGcnTsIOpzuPQ8fk0J6w0')

// async function getAllData() {
//     //const {data} = await myDatabase.from('users').select();
//    // const {users} = await myDatabase.from('users').select('user_password').eq('user_name',"Saath").single();
//    // console.log(`data: ${data}, data.length = ${data.length}, users: ${users}`)

//     const { data, error } = await myDatabase
//     .from('users')
//     .insert({user_email:"denmark@gmail.com",user_password:"Password123",  })
//     .select('*')
//     console.log(`data: ${data}, data.length = ${data.length}`)
//   }

async function usersTable(){
    let {data, error} = await supabase.from('users').select('*');
    if (error) console.error(error)
    else console.log({data})
}
async function addToUser(){
const { data, error } = await supabase.from('User').select('*');
if (error) console.error(error)
else console.log({data})
}
//   getAllData();
   
    //usersTable()
async function hello_world(){
        const {data,error} = await supabase.rpc('hello');
       
    if (error) console.error(error)
    else console.log({data})
    }
//     addToUser();
//   hello_world();
/**
 * This starts the api by listening on a 
 * port.
 */
app.get('/', async(req, res) =>{
    console.log("Route / reached")
    const {data, error} = await supabase.from('User').select('email');
    if (error) {
        res.json(error);
        console.error(error);
    }
    else {
        res.json(data);
        console.log({data});
    }
}
)

app.post('/createUser', async(req, res) => {

    const {data,error}= await supabase.from('User').insert({firstName:"Microsoft",lastName:"Computer",email:"Microsoft@gmail.com", password:"Password123",age:78});
    if (error) {
        res.json(error);
        console.error(error);
    }
    else {
        res.json(data);
        console.log({data});
    }

}
)

app.listen(3001, () => {
console.log("Server running!")
})
const express = require("express")
const app = express()
const mysql = require("mysql")

// This is used so that we can access our API
const cors = require("cors")
app.use(cors());

// create the connection with database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: 'root',
    database: 'crud_react'
})

// need to use express.json to avoid any errors and get the body from the front-end
app.use(express.json());

// Now use app and call the necessary methods
app.post("/createUser", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const age = req.body.age;
    const designation = req.body.designation;
    const salary = req.body.salary;

    // VALUES (?,?,?,?,?,?) we can use but we have to define the defined sequence in []
    // semicolon is necessary..
    db.query(`INSERT INTO datatable (name, address, phone, age, designation, salary) VALUES (?,?,?,?,?,?)`, 
    [name, address, phone, age, designation, salary], (err, result) => { // Change "res" to "result"
        if(err){
            console.log(err);
        } else {
            res.send("User is registered");
        }
    });
})

app.get("/getUsers", (req, res) => {
    db.query("SELECT * FROM datatable", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
})



app.listen(3001, () => {
    console.log("Yey,, I am working here...")
})
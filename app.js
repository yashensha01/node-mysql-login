const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')



dotenv.config({path: './.env'})
const app = express()

// DB CONNECTION

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
  })

//   PATH
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs')


  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


// ROOUTE
app.get('/',(req,res)=>{
   res.render('index')
})

// SERVER CONNECTION
app.listen('5000',() =>{
    console.log('Server started on port 5000');
})
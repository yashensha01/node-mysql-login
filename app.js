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

// parsing URL encoded bodies (as send by HTML forms)
app.use(express.urlencoded({extended:false}))
// parse JSON bodies (as sent by API clients)
app.use(express.json())

app.set('view engine', 'hbs')


  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// Define routes
app.use('/',require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

// SERVER CONNECTION
app.listen('5000',() =>{
    console.log('Server started on port 5000');
})
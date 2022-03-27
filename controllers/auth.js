const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, pass, passConfirm } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.render("register", {
          message: "This email already in use.",
        });
      } else if (pass !== passConfirm) {
        return res.render("register", {
          message: "Passwords do not match.",
        });
      }
      let hashedpassword = await bcrypt.hash(pass, 8);
      console.log(hashedpassword);
      db.query('INSERT INTO users SET ? ',{name:name,email:email,password:hashedpassword},(err,results)=>{
        if(err) throw err

        else{

            console.log(results);
            return res.render('register',{

                message:'User registered'
            })
        }
    })
    })

}



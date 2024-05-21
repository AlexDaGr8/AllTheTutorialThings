const express = require('express')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt')
const saltRounds = 10;

const sqlCmds = require('./SQLCommands');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sqlCmds.path = './server/database/database.db';


let isEmpty = str => !str || 0 === str.length;
let getDb = () => new sqlite3.Database('./server/database/database.db');



app.post('/register', (req, res) => {
    // check to make sure none of the fields are empty
    if( isEmpty(req.body.name)  || isEmpty(req.body.email) || isEmpty(req.body.company_name) || isEmpty(req.body.password) ){
        return res.json({
            'status' : false,
            'message' : 'All fields are required'
        });
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let db = getDb();
        let sql = `INSERT INTO users(name,email,company_name,password) VALUES('${req.body.name}','${req.body.email}','${req.body.company_name}','${hash}')`;
        db.run(sql, function(err) {
            if (err) { throw err; }
            else {
                return res.json({
                    status: true,
                    message: 'User created'
                });
            }
        });
        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
          });
    })
});

app.post('/login', (req, res) => {
    let db = getDb();
    let sql = `SELECT * from users where email='${req.body.email}'`;
    db.all(sql, [], (err, rows) => {
        if (err) throw err;
        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
          });
        if (rows.length == 0) {
            return res.json({
                status: false,
                message: 'Sorry, wrong email'
            })
        }

        let user = rows[0];
        let authencticated = bcrypt.compareSync(req.body.password, user.password);
        delete user.password;
        if (authencticated) {
            return res.json({
                status: true,
                user: user
            })
        }
        return res.json({
            status: false,
            message: "Wrong password, try again fool..."
        })
    })
})

app.get('/users', (req, res) => {
    let db = getDb();
    let sql = `select * from users`;
    db.all(sql, function(err, rows) {
        if (err) console.log(err);
        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
          })
        res.send({
            status: true,
            rows: rows
        })
    })
})


app.get('/', (req,res) => res.send(`You're on thin ice my petty gracion...`));

app.listen(PORT,() => console.log(`Listening on on port ${PORT}`));
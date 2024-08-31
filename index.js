const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const port = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Student',
    password: 'pheonix4151'
});

app.get('/', (req, res) => {
    res.render('join.ejs');
});

app.get('/user', (req, res) => {
    res.render('login.ejs');
});

app.post('/user', (req, res) => {
    const { username: newusername, password: newpassword } = req.body;

    console.log('Received username:', newusername);
    console.log('Received password:', newpassword);

    
   console.log("result");

    // connection.query(query, values, (err, result) => {
    //     if (err) {
    //         console.error('Error executing query:', err);
    //         return res.status(500).send('Database error');
    //     }
    //     console.log('Insert result:', result);
    //     res.redirect('/user/signin');
    // });
});

app.get('/user/signin', (req, res) => {
    res.send("Hi there");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

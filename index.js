const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
const port = 3000;


// Middleware setup
app.use(session({
    secret: 'pheonix4151',
    resave: false,
    saveUninitialized: true
}));


// Middleware setup
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "function")));
app.use('/..uploads', express.static('uploads'));

// app.use('../uploads', express.static(path.join(__dirname, 'uploads')));
// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'SkillSphere',
    password: 'pheonix4151'
});

// Routes
app.get('/', (req, res) => {
    res.render('usage.ejs'); // This is the first page where the user selects their role
});

// GET request to render the student login/signup page
app.get('/user/student/login', (req, res) => {
    res.render('loginstudent.ejs');
});

app.get('/user/teacher/login', (req, res) => {
    res.render('loginteacher.ejs');
});



// POST Sign up route for teacher and students
app.post('/user/student/signup', (req, res) => {
    const { username, email, password } = req.body;
    let id = uuid();
    const query = `INSERT INTO student (id, username, email, password) VALUES (?, ?, ?, ?)`;
    connection.query(query, [id, username, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting user data: ', err);
            res.status(500).send('Error saving user data. Please try again.');
        } else {
            res.render('shome.ejs');
            console.log(username);
            console.log(id);
            console.log(password);
            console.log(email);
        }
    });
});

app.post('/user/teacher/signup', (req, res) => {
    const { username, email, password } = req.body;
    let id = uuid();
    const query = `INSERT INTO teacher (id, username, email, password) VALUES (?, ?, ?, ?)`;
    connection.query(query, [id, username, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting user data: ', err);
            res.status(500).send('Error saving user data. Please try again.');
        } else {
            res.send('User registered successfully!');
            console.log(username);
            console.log(id);
            console.log(password);
            console.log(email);
        }
    });
});



// POST Sign in route for teacher and students

app.post('/user/student/signin', (req, res) => {
    const { username, password } = req.body;
    let q = `SELECT * FROM student WHERE username = ?`;
    connection.query(q, [username], (err, result) => {
        if (err) {
            console.error('Error retrieving user data: ', err);
            res.status(500).send('An error occurred.');
        } else if (result.length === 0) {
            res.send("User not found");
        } else {
            let user = result[0];
            if (password !== user.password) {
                res.render('loginstudent.ejs');
            } else {
                res.render('home.ejs',{user});
            }
        }
    });
});



app.post('/user/teacher/signin', (req, res) => {
    const { username, password } = req.body;
    let q = `SELECT * FROM teacher WHERE username = ?`;
    connection.query(q, [username], (err, result) => {
        if (err) {
            console.error('Error retrieving user data: ', err);
            res.status(500).send('An error occurred.');
        } else if (result.length === 0) {
            res.send("User not found");
        } else {
            let user = result[0];
            if (password !== user.password) {
                incorrect();
            } else {
                let id=user.id;
                res.render('dashboard.ejs',{ id });
            }
        }
    });
});


app.post('/user/student/signin/:id/:destination', (req, res) => {
    let { id, destination } = req.params;
    console.log(`User ID: ${id}, Destination: ${destination}`);

    let q = `SELECT * FROM student WHERE id = ?`;
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.error('Error retrieving user data: ', err);
        } else {
            let user = result[0];
            console.log(user);

            // Check if the destination corresponds to a valid page
            const validDestinations = ['dashboard', 'home', 'courses', 'mylearning', 'profile', 'settings', 'logout','analysis'];

            if (validDestinations.includes(destination)) {
                if (destination === 'logout') {
                    // Handle logout logic here (e.g., destroying the session)
                    res.redirect('http://127.0.0.1:5500/index.html');
                }else {
                    // Render the appropriate EJS template
                    res.render(`${destination}.ejs`, { user });
                }
            } else {
                res.status(404).send('Page not found');
            }
        }
    });
});


// app.get('/user/student/signin/:id/profile/update',(req,res)=>{
//     let { id }=req.params;
//     res.redirect(`'http://localhost:3000/user/student/signin/${ id }/profile'`);
// })


app.patch('/user/student/signin/:id/profile', (req, res) => {
    const { id } = req.params;
    const {
        FirstName,
        LastName,
        PhoneNumber,
        Email,
        Age,
        Gender,
        courseStudy,
        yearofStudy,
        college
    } = req.body;
    console.log(req.body);
    const updateQuery = `UPDATE student SET 
        FirstName = ?, 
        LastName = ?, 
        PhoneNumber = ?, 
        Email = ?, 
        Age = ?, 
        Gender = ?, 
        courseStudy = ?, 
        yearofStudy = ?, 
        college = ?
        WHERE id = ?`;

    connection.query(updateQuery, [
        FirstName, 
        LastName, 
        PhoneNumber, 
        Email, 
        Age, 
        Gender, 
        courseStudy, 
        yearofStudy, 
        college, 
        id
    ], (err, result) => {
        if (err) {
            console.error('Error updating user data:', err);
            res.status(500).send('Error updating user data.');
        } else {
            const selectQuery = `SELECT * FROM student WHERE id = ?`;
            connection.query(selectQuery, [id], (err, updatedUser) => {
                if (err) {
                    console.error('Error fetching updated user data:', err);
                    res.status(500).send('Error fetching updated user data.');
                } else {
                    res.render('profile.ejs', { user: updatedUser[0] });
                }
            });
        }
    });
});




// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

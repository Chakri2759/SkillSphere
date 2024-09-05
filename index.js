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
app.use(express.static(path.join(__dirname, "images")));
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
    res.render('landing.ejs'); // This is the first page where the user selects their role
});

app.get('/user',(req,res)=>{
    res.render('usage.ejs');
})

app.post('/user',(req,res)=>{
    res.render('usage.ejs');
})

// GET request to render the student login/signup page
app.get('/user/student/login', (req, res) => {
    res.render('loginstudent.ejs');
});

app.get('/user/teacher/login', (req, res) => {
    res.render('loginteacher.ejs');
});


app.get('/home', (req, res) => {
    const user = { id: 1 }; // Replace this with your actual user data fetching logic
    res.render('home', { user: user });
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
            const { username, password } = req.body;
            let q = `SELECT * FROM student WHERE username = ?`;
            connection.query(q, [username], (err, result) => {
                if (err) {
                    console.error('Error retrieving user data: ', err);
                    res.status(500).send('An error occurred.');
                }else{
                    let user = result[0];
                    res.render('home.ejs',{user});
                }
            });
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
                    const { username, password } = req.body;
                    let q = `SELECT * FROM teacher WHERE username = ?`;
                    connection.query(q, [username], (err, result) => {
                        if (err) {
                            console.error('Error retrieving user data: ', err);
                            res.status(500).send('An error occurred.');
                        }else {
                            let user = result[0];
                            {
                                let id=user.id;
                                res.render('thome.ejs',{ user });
                            }
                        }
                    });
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
        }else{
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
        }else {
            let user = result[0];
            if (password !== user.password) {
                res.render('loginteacher.ejs');
            } else {
                let id=user.id;
                res.render('thome.ejs',{ user });
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
                    res.redirect('http://localhost:3000/');
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



app.post('/user/teacher/signin/:id/:destination', (req, res) => {
    let { id, destination } = req.params;
    console.log(`Teacher ID: ${id}, Destination: ${destination}`);

    let q = `SELECT * FROM teacher WHERE id = ?`;
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.error('Error retrieving teacher data: ', err);
        } else {
            let user = result[0];
            console.log(`Teacher Found: `, user);

            // Check if the destination corresponds to a valid page
            const validDestinations = ['dashboard', 'home', 'resources', 'myteachings', 'profile', 'logout'];

            if (validDestinations.includes(destination)) {
                if (destination === 'logout') {
                    // Handle logout logic here (e.g., destroying the session)
                    console.log("Logging out...");
                    res.redirect('http://localhost:3000/');
                } else {
                    // Render the appropriate EJS template
                    console.log(`Rendering teacher page: t${destination}.ejs`);
                    res.render(`t${destination}.ejs`, { user });
                }
            } else {
                console.error('Invalid destination:', destination);
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
        dob,
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
        dob = ?, 
        Gender = ?, 
        courseStudy = ?, 
        yearofStudy = ?, 
        college = ?
        WHERE id = ?`;

    connection.query(updateQuery, [
        FirstName, 
        LastName, 
        PhoneNumber,  
        dob, 
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


app.patch('/user/teacher/signin/:id/profile', (req, res) => {
    const { id } = req.params;
    const {
        FirstName,
        LastName,
        PhoneNumber,
        dob,
        Gender,
        qualification,
        experiences,
        area,
        languages,
        topics
    } = req.body;
    console.log(req.body);
    const updateQuery = `UPDATE teacher SET 
        FirstName = ?, 
        LastName = ?, 
        PhoneNumber = ?, 
        dob = ?, 
        Gender = ?, 
        qualification = ?, 
        experiences = ?, 
        area = ?,
        languages= ?,
        topics = ?
        WHERE id = ?`;

    connection.query(updateQuery, [
        FirstName, 
        LastName, 
        PhoneNumber, 
        dob, 
        Gender, 
        qualification,
        experiences,
        area,
        languages,
        topics, 
        id
    ], (err, result) => {
        if (err) {
            console.error('Error updating user data:', err);
            res.status(500).send('Error updating user data.');
        } else {
            const selectQuery = `SELECT * FROM teacher WHERE id = ?`;
            connection.query(selectQuery, [id], (err, updatedUser) => {
                if (err) {
                    console.error('Error fetching updated user data:', err);
                    res.status(500).send('Error fetching updated user data.');
                } else {
                    console.log(result);
                    res.render('tprofile.ejs', { user: updatedUser[0] });
                }
            });
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

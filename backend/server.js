const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'timetable_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (username, password) VALUES (?,?)', [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('User Registered!');
    });
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) res.send('Login Successful!');
        else res.send('Invalid Credentials');
    });
});

// Create Time Table
app.post('/create-timetable', (req, res) => {
    const { classname, days, periods, startTime, duration, breaks } = req.body;
    db.query('INSERT INTO timetables (classname, days, periods, startTime, duration, breaks) VALUES (?,?,?,?,?,?)', 
        [classname, days, periods, startTime, duration, breaks],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send('Timetable Created!');
        }
    );
});

// Fetch Time Table
app.get('/get-timetable/:classId', (req, res) => {
    const classId = req.params.classId;
    db.query('SELECT * FROM timetable_details WHERE class_id = ?', [classId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// Save period assignment (subject + teacher)
app.post('/assign-subject-teacher', (req, res) => {
    const { class_id, weekday, period_no, subject_name, teacher_name } = req.body;
    db.query('INSERT INTO timetable_details (class_id, weekday, period_no, subject_name, teacher_name) VALUES (?,?,?,?,?)',
        [class_id, weekday, period_no, subject_name, teacher_name],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send('Assigned Successfully');
        }
    );
});

app.listen(5000, () => console.log('Server running on port 5000'));

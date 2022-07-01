const express = require('express');
const app = express();
const mysql = require('mysql')
const port = process.env.PORT || 4000;
const cors = require("cors");
const mysql2 = require('mysql2')
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db0 = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

app.post('/create', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;  

  const query = 'INSERT INTO employees (name, age, country) VALUES (?, ?, ?)';
  db.query(query, 
            [name, age, country], 
            (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send(result);
                }
            }
  );
});

app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

app.get('/employee/:id', (req, res) => {
  const {id} = req.params;

  const query = 'SELECT * FROM employees where id = ?';
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id

  const name = req.body.name
  const age = req.body.age
  const country = req.body.country

  const query = 'UPDATE employees SET name = ?, age = ?, country = ? WHERE id = ?'
  db.query(query, [name, age, country, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id

  const query = "DELETE FROM employees where id = ?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);}
);
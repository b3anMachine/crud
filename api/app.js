const express = require('express');
const app = express();
const mysql = require('mysql')
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.post('/create', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;

  db.query('INSERT INTO employees (name, age, country) VALUES (?, ?, ?)', 
            [name, age, country], 
            (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("Values Inserted");
                }
            }
  );
});

app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});


app.put('/update', (req, res) => {
  const id = req.body.id
  const age = req.body.age
  db.query('UPDATE employees SET age = ? WHERE id = ?', [age, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query("DELETE FROM employees where id = ?", id, (err, result) => {
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
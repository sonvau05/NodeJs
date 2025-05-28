const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'student_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Kết nối MySQL thành công!');
});

app.post('/api/students', (req, res) => {
  const { name, age, major } = req.body;
  const query = 'INSERT INTO students (name, age, major) VALUES (?, ?, ?)';
  db.query(query, [name, age, major], (err) => {
    if (err) return res.status(500).send('Lỗi server!');
    res.status(200).send('Lưu thành công!');
  });
});

app.listen(5000, () => console.log('Server chạy tại http://localhost:5000'));
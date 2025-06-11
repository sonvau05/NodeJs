const express = require('express');
   const mysql = require('mysql2');
   const app = express();
   app.use(express.json());

   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'product_db'
   });

   db.connect(err => {
     if (err) throw err;
     console.log('MySQL Connected');
   });

   db.query(`
     CREATE TABLE IF NOT EXISTS products (
       Id INT AUTO_INCREMENT PRIMARY KEY,
       Title VARCHAR(255) NOT NULL,
       Price DECIMAL(10,2) NOT NULL,
       IDate DATE NOT NULL,
       Quantity INT NOT NULL
     )
   `);

   app.get('/products', (req, res) => {
     db.query('SELECT * FROM products', (err, results) => {
       if (err) throw err;
       res.json(results);
     });
   });

   app.post('/products', (req, res) => {
     const { Title, Price, IDate, Quantity } = req.body;
     if (!Title || !Price || !IDate || !Quantity) {
       return res.status(400).json({ error: 'Tất cả các trường Title, Price, IDate, Quantity đều bắt buộc và không được null' });
     }
     db.query(
       'INSERT INTO products (Title, Price, IDate, Quantity) VALUES (?, ?, ?, ?)',
       [Title, Price, IDate, Quantity],
       (err, result) => {
         if (err) throw err;
         res.json({ Id: result.insertId, ...req.body });
       }
     );
   });

   app.put('/products/:id', (req, res) => {
     const { Title, Price, IDate, Quantity } = req.body;
     if (!Title || !Price || !IDate || !Quantity) {
       return res.status(400).json({ error: 'Tất cả các trường Title, Price, IDate, Quantity đều bắt buộc và không được null' });
     }
     db.query(
       'UPDATE products SET Title = ?, Price = ?, IDate = ?, Quantity = ? WHERE Id = ?',
       [Title, Price, IDate, Quantity, req.params.id],
       (err) => {
         if (err) throw err;
         res.json({ Id: req.params.id, ...req.body });
       }
     );
   });

   app.delete('/products/:id', (req, res) => {
     db.query('DELETE FROM products WHERE Id = ?', [req.params.id], (err) => {
       if (err) throw err;
       res.json({ message: 'Product deleted' });
     });
   });

   app.listen(3000, () => console.log('Server running on port 3000'));
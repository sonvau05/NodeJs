const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/sum', (req, res) => {
    const { num1, num2 } = req.body;
    const sum = num1 + num2;
    res.json({ result: sum });
});

app.post('/subtract', (req, res) => {
    const { num1, num2 } = req.body;
    const difference = num1 - num2;
    res.json({ result: difference });
});

app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;
    if (num2 === 0) {
        res.json({ result: 'Không chia được cho 0' });
    } else {
        const quotient = num1 / num2;
        res.json({ result: quotient });
    }
});

app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    const product = num1 * num2;
    res.json({ result: product });
});

app.listen(PORT, () => {
    console.log('Server chạy tại http://localhost:3000');
});